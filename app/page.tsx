import MainLayout from '@/components/layout/MainLayout'
import HeroBanner from '@/components/home/HeroBanner'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getFeatured() {
  try {
    return await prisma.product.findMany({ where: { featured: true, inStock: true }, include: { category: true }, take: 6 })
  } catch { return [] }
}

const CATEGORIES = [
  { name: 'Temple Theme', slug: 'temple-theme', icon: '🛕', desc: 'Gopuram & deity artwork' },
  { name: 'Kalamkari', slug: 'kalamkari', icon: '🎨', desc: 'Folk art heritage' },
  { name: 'Gold Foil', slug: 'gold-foil', icon: '✨', desc: '24K gold stamped luxury' },
  { name: 'Muhurtham', slug: 'ceremony-specific', icon: '🪔', desc: 'Ceremony-specific cards' },
  { name: 'Laser Cut', slug: 'modern-digital', icon: '💎', desc: 'Premium intricate designs' },
  { name: 'E-Invites', slug: 'modern-digital', icon: '📱', desc: 'Digital & video invites' },
]

const TESTIMONIALS = [
  { name: 'Kavya & Rajan', location: 'Hyderabad', rating: 5, text: 'Absolutely stunning! The gold foil cards we ordered for our Telugu wedding were beyond our expectations. Everyone complimented the quality!' },
  { name: 'Meenakshi & Arjun', location: 'Chennai', rating: 5, text: 'Got our Tamil Brahmin wedding cards from Ashok Cards. The panchanga details and Sanskrit shlokas were printed perfectly. Highly recommend!' },
  { name: 'Deepa & Sriram', location: 'Bangalore', rating: 5, text: 'The digital e-invite video was just beautiful! Shared on WhatsApp and everyone loved it. Great value for money and quick delivery.' },
]

export default async function HomePage() {
  const featured = await getFeatured()

  return (
    <MainLayout>
      <HeroBanner />

      {/* Category Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <p className="section-subtitle">WHAT WE OFFER</p>
        <h2 className="section-title mb-2">Our Collections</h2>
        <div className="ornament mb-10"><span className="font-cinzel text-xs tracking-widest px-3" style={{color:'#D4AF37'}}>✦</span></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug + cat.name} href={`/shop?category=${cat.slug}`}
              className="card-hover flex flex-col items-center text-center p-4 rounded-lg border bg-white group"
              style={{borderColor:'rgba(212,175,55,0.3)'}}>
              <span className="text-3xl mb-2">{cat.icon}</span>
              <h3 className="font-playfair text-sm font-semibold mb-1 group-hover:text-red-800 transition-colors" style={{color:'#800000'}}>{cat.name}</h3>
              <p className="font-noto text-xs" style={{color:'#888'}}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-16 px-6" style={{background:'#fff'}}>
          <div className="max-w-7xl mx-auto">
            <p className="section-subtitle">HANDPICKED FOR YOU</p>
            <h2 className="section-title mb-2">Featured Designs</h2>
            <div className="ornament mb-10"><span className="font-cinzel text-xs tracking-widest px-3" style={{color:'#D4AF37'}}>✦</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(p => (
                <Link key={p.id} href={`/shop/${p.slug}`} className="card-hover group bg-sandalwood rounded-lg overflow-hidden border" style={{borderColor:'rgba(212,175,55,0.3)'}}>
                  <div className="relative aspect-[4/3]">
                    <Image src={p.images[0] || 'https://placehold.co/400x300/EFE6D2/800000?text=Card'} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <span className="font-cinzel text-xs tracking-wide" style={{color:'#D4AF37'}}>{p.category?.name}</span>
                    <h3 className="font-playfair font-semibold text-base mt-1 mb-2" style={{color:'#800000'}}>{p.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-playfair font-bold" style={{color:'#800000'}}>₹{p.price}/card</span>
                      <span className="btn-primary text-xs py-1.5 px-3">View & Customize</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/shop" className="btn-primary">View All Designs →</Link>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 px-6" style={{background:'#EFE6D2'}}>
        <div className="max-w-5xl mx-auto">
          <p className="section-subtitle">SIMPLE PROCESS</p>
          <h2 className="section-title mb-2">How It Works</h2>
          <div className="ornament mb-10"><span className="font-cinzel text-xs px-3" style={{color:'#D4AF37'}}>✦</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose Design', desc: 'Browse our collection and select a design that resonates with your vision.' },
              { step: '02', title: 'Customize Details', desc: 'Fill in all wedding details — names, date, venue, language, and motifs.' },
              { step: '03', title: 'Review Proof', desc: 'We send a digital proof within 24–48 hours. Request revisions freely.' },
              { step: '04', title: 'Print & Deliver', desc: 'After approval, we print with precision and ship across India within 5–7 days.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-cinzel font-bold text-xl" style={{background:'#800000', color:'#D4AF37'}}>{s.step}</div>
                <h3 className="font-playfair font-semibold mb-2" style={{color:'#800000'}}>{s.title}</h3>
                <p className="font-noto text-sm" style={{color:'#555'}}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works" className="btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6" style={{background:'#fff'}}>
        <div className="max-w-6xl mx-auto">
          <p className="section-subtitle">HAPPY FAMILIES</p>
          <h2 className="section-title mb-2">Customer Stories</h2>
          <div className="ornament mb-10"><span className="font-cinzel text-xs px-3" style={{color:'#D4AF37'}}>✦</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-lg border" style={{background:'#EFE6D2', borderColor:'rgba(212,175,55,0.3)'}}>
                <div className="flex gap-1 mb-3">
                  {Array.from({length: t.rating}).map((_, j) => (
                    <svg key={j} className="w-4 h-4" fill="#D4AF37" viewBox="0 0 20 20"><path d="M10 1l2.39 4.84L18 6.91l-4 3.89.94 5.5L10 13.77l-4.94 2.53.94-5.5-4-3.89 5.61-.16z"/></svg>
                  ))}
                </div>
                <p className="font-noto text-sm italic mb-4" style={{color:'#444'}}>"{t.text}"</p>
                <div>
                  <p className="font-playfair font-semibold text-sm" style={{color:'#800000'}}>{t.name}</p>
                  <p className="font-noto text-xs" style={{color:'#888'}}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <div className="max-w-2xl mx-auto">
          <p className="font-cinzel text-sm tracking-widest mb-3" style={{color:'#D4AF37'}}>START YOUR JOURNEY</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4" style={{color:'#EFE6D2'}}>Ready to Create Your Dream Invitation?</h2>
          <p className="font-noto text-sm mb-6 opacity-80" style={{color:'#EFE6D2'}}>Let us craft the perfect beginning to your forever story. Traditional. Elegant. Yours.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/shop" className="btn-gold">Browse Collection</Link>
            <Link href="/contact" className="font-cinzel text-sm px-6 py-3 border rounded-sm transition-colors" style={{color:'#D4AF37', borderColor:'#D4AF37'}}>Contact Us</Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
