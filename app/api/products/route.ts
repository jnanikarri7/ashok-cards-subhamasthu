import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = { inStock: true }
    if (category) where.category = { slug: category }
    if (featured === 'true') where.featured = true
    if (search) where.name = { contains: search, mode: 'insensitive' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({ where, include: { category: true }, skip, take: limit, orderBy: { featured: 'desc' } }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({ products, total, pages: Math.ceil(total / limit), page })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        minQuantity: body.minQuantity || 50,
        images: body.images || [],
        categoryId: body.categoryId,
        motifs: body.motifs || [],
        languages: body.languages || [],
        paperType: body.paperType,
        finish: body.finish,
        featured: body.featured || false,
        tags: body.tags || [],
        sampleText: body.sampleText,
      },
      include: { category: true },
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
