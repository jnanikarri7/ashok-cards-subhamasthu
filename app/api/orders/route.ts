import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createOrderSchema } from '@/lib/validations/order.schema'
import { createOrder } from '@/lib/services/order.service'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}
  if (status) where.status = status

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: { include: { product: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where }),
  ])

  return NextResponse.json({ orders, total, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 orders per minute per IP
  const ip = getClientIp(req)
  const { allowed } = rateLimit(`order:${ip}`, 5, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = createOrderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const order = await createOrder(parsed.data)
    return NextResponse.json(order)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create order'
    console.error('[Orders POST]', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
