import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { createProductSchema } from '@/lib/validations/product.schema'
import { slugify } from '@/lib/utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ products })
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Auto-generate slug if not provided
  if (body && typeof body === 'object' && !('slug' in body)) {
    (body as Record<string, unknown>).slug = slugify((body as Record<string, unknown>).name as string ?? '')
  }

  const parsed = createProductSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const product = await prisma.product.create({
      data: parsed.data,
      include: { category: true },
    })
    return NextResponse.json({ product }, { status: 201 })
  } catch (err) {
    console.error('[Admin products POST]', err)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
