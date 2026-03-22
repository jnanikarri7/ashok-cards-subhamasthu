import { Metadata } from 'next'
import { Suspense } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/shop/ProductCard'
import ProductGridSkeleton from '@/components/skeletons/ProductGridSkeleton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop All Wedding Cards | South Indian Wedding Invitations',
  description:
    'Browse our full collection of traditional South Indian wedding invitation cards. Temple designs, Kalamkari, Gold Foil, Digital E-Invites and more.',
  keywords: [
    'south indian wedding cards',
    'telugu wedding invitations',
    'tamil wedding cards',
    'kalamkari wedding cards',
    'gold foil wedding invitations',
  ],
}

const CATEGORY_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Ceremony', value: 'ceremony-specific' },
  { label: 'Modern / Digital', value: 'modern-digital' },
]

async function ProductGrid({
  where,
  page,
  limit,
}: {
  where: Record<string, unknown>
  page: number
  limit: number
}) {
  const skip = (page - 1) * limit
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

  const totalPages = Math.ceil(total / limit)

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-playfair text-2xl mb-2" style={{ color: '#800000' }}>
          No cards found
        </p>
        <p className="font-noto text-sm mb-4" style={{ color: '#888' }}>
          Try a different search or browse all collections
        </p>
        <Link href="/shop" className="btn-primary">
          View All Cards
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="font-noto text-sm mb-6 text-right" style={{ color: '#888' }}>
        {total} designs found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <ProductCard key={p.id} product={p as any} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/shop?page=${i + 1}`}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-cinzel border transition-all"
              style={{
                background: page === i + 1 ? '#800000' : 'white',
                color: page === i + 1 ? '#D4AF37' : '#800000',
                borderColor: '#D4AF37',
              }}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string }
}) {
  const where: Record<string, unknown> = { inStock: true }
  if (searchParams.category) where.category = { slug: searchParams.category }
  if (searchParams.search) where.name = { contains: searchParams.search, mode: 'insensitive' }

  const page = Math.max(1, parseInt(searchParams.page || '1'))
  const limit = 12

  return (
    <MainLayout>
      {/* Header */}
      <div
        className="py-12 px-6 text-center"
        style={{ background: 'linear-gradient(135deg,#800000,#4a0000)' }}
      >
        <p
          className="font-cinzel text-xs tracking-widest mb-2"
          style={{ color: '#D4AF37' }}
        >
          OUR COLLECTION
        </p>
        <h1 className="font-playfair text-4xl font-bold" style={{ color: '#EFE6D2' }}>
          {searchParams.search ? `Search: "${searchParams.search}"` : 'All Wedding Cards'}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORY_FILTERS.map((f) => (
            <Link
              key={f.value}
              href={`/shop${f.value ? `?category=${f.value}` : ''}`}
              className="px-4 py-2 rounded-full text-xs font-cinzel tracking-wide border transition-all"
              style={{
                background:
                  searchParams.category === f.value ||
                  (!searchParams.category && !f.value)
                    ? '#800000'
                    : 'white',
                color:
                  searchParams.category === f.value ||
                  (!searchParams.category && !f.value)
                    ? '#D4AF37'
                    : '#800000',
                borderColor: '#D4AF37',
              }}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Grid with Suspense skeleton */}
        <Suspense fallback={<ProductGridSkeleton count={limit} />}>
          <ProductGrid where={where} page={page} limit={limit} />
        </Suspense>
      </div>
    </MainLayout>
  )
}
