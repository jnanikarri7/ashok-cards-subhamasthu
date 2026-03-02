import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, description, price, minPrice, maxPrice, categoryId, images, motifs, languages, paperType, size, finish, minQty, maxQty, tags, featured } = body

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const product = await prisma.product.create({
    data: {
      name, slug, description, price, minPrice, maxPrice,
      categoryId, images: images || [], motifs: motifs || [],
      languages: languages || [], paperType, size, finish: finish || [],
      minQty: minQty || 50, maxQty: maxQty || 5000, tags: tags || [], featured: featured || false,
    },
    include: { category: true },
  })

  return NextResponse.json({ product }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ products })
}
