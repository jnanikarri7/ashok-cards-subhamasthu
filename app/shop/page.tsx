import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop All Wedding Cards',
  description: 'Browse our full collection of traditional South Indian wedding invitation cards. Temple designs, Kalamkari, Gold Foil, Digital E-Invites and more.',
}

const CATEGORY_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Ceremony', value: 'ceremony-specific' },
  { label: 'Modern / Digital', value: 'modern-digital' },
]

export default async function ShopPage({ searchParams }: { searchParams: { category?: string; search?: string; page?: string } }) {
  const where: Record<string, unknown> = { inStock: true }
  if (searchParams.category) where.category = { slug: searchParams.category }
  if (searchParams.search) where.name = { contains: searchParams.search, mode: 'insensitive' }

  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  let products: {id:string;name:string;slug:string;price:number;minQuantity:number;images:string[];motifs:string[];featured:boolean;finish?:string|null;rating:number;category?:{name:string}}[] = []
  let total = 0
  try {
    ;[products, total] = await Promise.all([
      prisma.product.findMany({ where, include: { category: true }, skip, take: limit, orderBy: { featured: 'desc' } }) as any,
      prisma.product.count({ where }),
    ])
  } catch {}

  const totalPages = Math.ceil(total / limit)

  return (
    <MainLayout>
      {/* Header */}
      <div className="py-12 px-6 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <p className="font-cinzel text-xs tracking-widest mb-2" style={{color:'#D4AF37'}}>OUR COLLECTION</p>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>
          {searchParams.search ? `Search: "${searchParams.search}"` : 'All Wedding Cards'}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORY_FILTERS.map(f => (
            <Link key={f.value} href={`/shop${f.value ? `?category=${f.value}` : ''}`}
              className="px-4 py-2 rounded-full text-xs font-cinzel tracking-wide border transition-all"
              style={{
                background: searchParams.category === f.value || (!searchParams.category && !f.value) ? '#800000' : 'white',
                color: searchParams.category === f.value || (!searchParams.category && !f.value) ? '#D4AF37' : '#800000',
                borderColor: '#D4AF37',
              }}>
              {f.label}
            </Link>
          ))}
          <span className="ml-auto font-noto text-sm" style={{color:'#888'}}>{total} designs found</span>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p as any} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-playfair text-2xl mb-2" style={{color:'#800000'}}>No cards found</p>
            <p className="font-noto text-sm mb-4" style={{color:'#888'}}>Try a different search or browse all collections</p>
            <Link href="/shop" className="btn-primary">View All Cards</Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link key={i} href={`/shop?${searchParams.category ? `category=${searchParams.category}&` : ''}page=${i + 1}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-cinzel border"
                style={{
                  background: page === i + 1 ? '#800000' : 'white',
                  color: page === i + 1 ? '#D4AF37' : '#800000',
                  borderColor: '#D4AF37',
                }}>
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
