import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { prisma } from '@/lib/prisma'
import CustomizationForm from '@/components/customize/CustomizationForm'
import { Check, Zap, Users, Clock } from 'lucide-react'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ashok9cards.com'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await prisma.product
    .findUnique({ where: { slug: params.slug }, include: { category: true } })
    .catch(() => null)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} | South Indian Wedding Cards`,
    description: product.description,
    keywords: [
      product.name,
      product.category?.name ?? '',
      'south indian wedding cards',
      'telugu wedding invitations',
      'tamil wedding cards',
      ...product.tags,
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      url: `${BASE_URL}/shop/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product
    .findUnique({ where: { slug: params.slug }, include: { category: true } })
    .catch(() => null)

  if (!product) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: 'Ashok 9 Cards Subhamasthu' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Ashok 9 Cards Subhamasthu' },
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  }

  return (
    <MainLayout>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 py-10 pb-24 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div
              className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 border-2"
              style={{ borderColor: '#D4AF37' }}
            >
              <Image
                src={
                  product.images[0] ||
                  'https://placehold.co/600x450/EFE6D2/800000?text=Card+Preview'
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.slice(0, 4).map((img: string, i: number) => (
                  <div
                    key={i}
                    className="relative w-20 h-16 rounded border cursor-pointer"
                    style={{ borderColor: '#D4AF37' }}
                  >
                    <Image src={img} alt="" fill className="object-cover rounded" sizes="80px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="font-cinzel text-xs tracking-widest mb-2" style={{ color: '#D4AF37' }}>
              {product.category?.name}
            </p>
            <h1 className="font-playfair text-3xl font-bold mb-2" style={{ color: '#800000' }}>
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-playfair text-3xl font-bold" style={{ color: '#800000' }}>
                ₹{product.price}
              </span>
              <span className="font-noto text-sm" style={{ color: '#888' }}>
                /card (Min. {product.minQuantity} cards)
              </span>
            </div>

            {/* Urgency + Trust signals */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wide"
                style={{ background: '#fff3cd', color: '#856404', border: '1px solid #ffc107' }}
              >
                <Zap size={11} /> Only 8 slots left this week
              </span>
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wide"
                style={{ background: '#d4edda', color: '#155724', border: '1px solid #28a745' }}
              >
                <Users size={11} /> 1,000+ weddings served
              </span>
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel tracking-wide"
                style={{ background: '#cce5ff', color: '#004085', border: '1px solid #007bff' }}
              >
                <Clock size={11} /> Proof in 24–48 hrs
              </span>
            </div>

            <p className="font-noto text-sm leading-relaxed mb-4" style={{ color: '#444' }}>
              {product.description}
            </p>

            {/* Specs */}
            <div
              className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-lg"
              style={{ background: '#EFE6D2' }}
            >
              {product.paperType && (
                <div>
                  <span
                    className="font-cinzel text-xs tracking-wide block"
                    style={{ color: '#D4AF37' }}
                  >
                    PAPER TYPE
                  </span>
                  <span className="font-noto text-sm" style={{ color: '#800000' }}>
                    {product.paperType}
                  </span>
                </div>
              )}
              {product.finish && (
                <div>
                  <span
                    className="font-cinzel text-xs tracking-wide block"
                    style={{ color: '#D4AF37' }}
                  >
                    FINISH
                  </span>
                  <span className="font-noto text-sm" style={{ color: '#800000' }}>
                    {product.finish}
                  </span>
                </div>
              )}
              <div>
                <span
                  className="font-cinzel text-xs tracking-wide block"
                  style={{ color: '#D4AF37' }}
                >
                  LANGUAGES
                </span>
                <span className="font-noto text-sm" style={{ color: '#800000' }}>
                  {product.languages.join(', ')}
                </span>
              </div>
              <div>
                <span
                  className="font-cinzel text-xs tracking-wide block"
                  style={{ color: '#D4AF37' }}
                >
                  MOTIFS
                </span>
                <span className="font-noto text-sm" style={{ color: '#800000' }}>
                  {product.motifs.slice(0, 3).join(', ')}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              {[
                'Digital proof in 24–48 hrs',
                'Free one revision',
                'All India shipping',
                'GST invoice included',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-1">
                  <Check size={14} color="#0A5B4F" />
                  <span className="font-noto text-xs" style={{ color: '#555' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* Sample Text */}
            {product.sampleText && (
              <div
                className="mb-6 p-4 rounded border text-center"
                style={{ background: '#EFE6D2', borderColor: 'rgba(212,175,55,0.5)' }}
              >
                <p
                  className="font-cinzel text-xs tracking-wider mb-2"
                  style={{ color: '#D4AF37' }}
                >
                  SAMPLE TEXT
                </p>
                <pre className="font-noto text-xs whitespace-pre-wrap" style={{ color: '#555' }}>
                  {product.sampleText}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Customization Form */}
        <div
          id="customize"
          className="mt-12 p-6 rounded-lg border-2"
          style={{ borderColor: '#D4AF37', background: 'white' }}
        >
          <h2
            className="font-playfair text-2xl font-bold mb-2 text-center"
            style={{ color: '#800000' }}
          >
            Customize Your Invitation
          </h2>
          <p className="font-noto text-sm text-center mb-6" style={{ color: '#888' }}>
            Fill in your wedding details below — we&apos;ll create a personalized proof for your
            approval.
          </p>
          <CustomizationForm
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              minQuantity: product.minQuantity,
              images: product.images,
            }}
          />
        </div>
      </div>

      {/* Sticky CTA — mobile only */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 lg:hidden z-50"
        style={{
          background: 'linear-gradient(to top, white 70%, transparent)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
      >
        <a
          href="#customize"
          className="block w-full text-center py-3.5 rounded-xl font-cinzel text-sm tracking-wider transition-all"
          style={{ background: '#800000', color: '#D4AF37' }}
        >
          ✏️ Customize This Card →
        </a>
      </div>
    </MainLayout>
  )
}
