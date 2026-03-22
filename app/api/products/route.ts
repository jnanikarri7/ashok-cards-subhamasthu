import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createProductSchema } from '@/lib/validations/product.schema'
import { requireAdmin } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '12'))
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = { inStock: true }
    if (category) where.category = { slug: category }
    if (featured === 'true') where.featured = true
    if (search) where.name = { contains: search, mode: 'insensitive' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        skip,
        take: limit,
        orderBy: { featured: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({ products, total, pages: Math.ceil(total / limit), page })
  } catch (error) {
    console.error('[Products GET]', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
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
    return NextResponse.json(product)
  } catch (error) {
    console.error('[Products POST]', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
