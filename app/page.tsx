import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import HeroBanner from '@/components/home/HeroBanner'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Check, MessageCircle, Award, Clock, Truck, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ashok 9 Cards Subhamasthu — Premium South Indian Wedding Invitations',
  description:
    'Premium traditional South Indian wedding invitation cards since 1985. Telugu, Tamil, Kannada, Malayalam cards with temple motifs, Gold Foil, Kalamkari artistry. Crafted with devotion in Secunderabad.',
}

async function getFeatured() {
  try {
    return await prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true },
      take: 6,
    })
  } catch {
    return []
  }
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
  {
    name: 'Kavya & Rajan',
    location: 'Hyderabad',
    rating: 5,
    text: 'Absolutely stunning! The gold foil cards we ordered for our Telugu wedding were beyond our expectations. Everyone complimented the quality!',
  },
  {
    name: 'Meenakshi & Arjun',
    location: 'Chennai',
    rating: 5,
    text: 'Got our Tamil Brahmin wedding cards from Ashok 9 Cards. The panchanga details and Sanskrit shlokas were printed perfectly. Highly recommend!',
  },
  {
    name: 'Deepa & Sriram',
    location: 'Bangalore',
    rating: 5,
    text: 'The digital e-invite video was just beautiful! Shared on WhatsApp and everyone loved it. Great value for money and quick delivery.',
  },
]

const WHY_US = [
  { icon: Award, title: '38+ Years of Craft', desc: 'Trusted by families since 1985 across South India.' },
  { icon: Check, title: 'Free Digital Proof', desc: 'Review your design before a single card is printed.' },
  { icon: Clock, title: 'Proof in 24–48 hrs', desc: 'Fast turnaround without compromising quality.' },
  { icon: Truck, title: 'All India Shipping', desc: 'Delivered safely to your doorstep anywhere in India.' },
  { icon: RefreshCw, title: 'Free Revisions', desc: 'We refine until you are completely satisfied.' },
  { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Direct support from our design team, always.' },
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
        <div className="ornament mb-10">
          <span className="font-cinzel text-xs tracking-widest px-3" style={{ color: '#D4AF37' }}>
            ✦
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug + cat.name}
              href={`/shop?category=${cat.slug}`}
              className="card-hover flex flex-col items-center text-center p-4 rounded-xl border bg-white group"
              style={{ borderColor: 'rgba(212,175,55,0.3)' }}
            >
              <span className="text-3xl mb-2">{cat.icon}</span>
              <h3
                className="font-playfair text-sm font-semibold mb-1 group-hover:text-red-800 transition-colors"
                style={{ color: '#800000' }}
              >
                {cat.name}
              </h3>
              <p className="font-noto text-xs" style={{ color: '#888' }}>
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-16 px-6" style={{ background: '#fff' }}>
          <div className="max-w-7xl mx-auto">
            <p className="section-subtitle">HANDPICKED FOR YOU</p>
            <h2 className="section-title mb-2">Featured Designs</h2>
            <div className="ornament mb-10">
              <span
                className="font-cinzel text-xs tracking-widest px-3"
                style={{ color: '#D4AF37' }}
              >
                ✦
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p: (typeof featured)[number]) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="card-hover group bg-sandalwood rounded-xl overflow-hidden border"
                  style={{ borderColor: 'rgba(212,175,55,0.3)' }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={
                        p.images[0] ||
                        'https://placehold.co/400x300/EFE6D2/800000?text=Card'
                      }
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className="font-cinzel text-xs tracking-wide" style={{ color: '#D4AF37' }}>
                      {p.category?.name}
                    </span>
                    <h3
                      className="font-playfair font-semibold text-base mt-1 mb-2"
                      style={{ color: '#800000' }}
                    >
                      {p.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="font-playfair font-bold" style={{ color: '#800000' }}>
                        ₹{p.price}/card
                      </span>
                      <span className="btn-primary text-xs py-1.5 px-3">View & Customize</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/shop" className="btn-primary">
                View All Designs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 px-6" style={{ background: '#EFE6D2' }}>
        <div className="max-w-6xl mx-auto">
          <p className="section-subtitle">OUR PROMISE</p>
          <h2 className="section-title mb-2">Why Families Choose Us</h2>
          <div className="ornament mb-10">
            <span
              className="font-cinzel text-xs tracking-widest px-3"
              style={{ color: '#D4AF37' }}
            >
              ✦
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5 bg-white rounded-xl border"
                style={{ borderColor: 'rgba(212,175,55,0.25)' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#800000' }}
                >
                  <Icon size={18} color="#D4AF37" />
                </div>
                <div>
                  <h3
                    className="font-playfair font-semibold text-sm mb-1"
                    style={{ color: '#800000' }}
                  >
                    {title}
                  </h3>
                  <p className="font-noto text-xs leading-relaxed" style={{ color: '#666' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-subtitle">SIMPLE PROCESS</p>
          <h2 className="section-title mb-2">How It Works</h2>
          <div className="ornament mb-10">
            <span className="font-cinzel text-xs px-3" style={{ color: '#D4AF37' }}>
              ✦
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Choose Design',
                desc: 'Browse our collection and select a design that resonates with your vision.',
              },
              {
                step: '02',
                title: 'Customize Details',
                desc: 'Fill in all wedding details — names, date, venue, language, and motifs.',
              },
              {
                step: '03',
                title: 'Review Proof',
                desc: 'We send a digital proof within 24–48 hours. Request revisions freely.',
              },
              {
                step: '04',
                title: 'Print & Deliver',
                desc: 'After approval, we print with precision and ship across India within 5–7 days.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-cinzel font-bold text-xl"
                  style={{ background: '#800000', color: '#D4AF37' }}
                >
                  {s.step}
                </div>
                <h3
                  className="font-playfair font-semibold mb-2"
                  style={{ color: '#800000' }}
                >
                  {s.title}
                </h3>
                <p className="font-noto text-sm" style={{ color: '#555' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6" style={{ background: '#EFE6D2' }}>
        <div className="max-w-6xl mx-auto">
          <p className="section-subtitle">HAPPY FAMILIES</p>
          <h2 className="section-title mb-2">Customer Stories</h2>
          <div className="ornament mb-10">
            <span className="font-cinzel text-xs px-3" style={{ color: '#D4AF37' }}>
              ✦
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border bg-white"
                style={{ borderColor: 'rgba(212,175,55,0.3)' }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4" fill="#D4AF37" viewBox="0 0 20 20">
                      <path d="M10 1l2.39 4.84L18 6.91l-4 3.89.94 5.5L10 13.77l-4.94 2.53.94-5.5-4-3.89 5.61-.16z" />
                    </svg>
                  ))}
                </div>
                <p className="font-noto text-sm italic mb-4" style={{ color: '#444' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-playfair font-semibold text-sm" style={{ color: '#800000' }}>
                    {t.name}
                  </p>
                  <p className="font-noto text-xs" style={{ color: '#888' }}>
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section
        className="py-12 px-6"
        style={{ background: 'linear-gradient(135deg, #075E54, #128C7E)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-cinzel text-xs tracking-widest mb-3" style={{ color: '#25D366' }}>
            QUICK CONSULTATION
          </p>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3 text-white">
            Not Sure Which Card to Choose?
          </h2>
          <p className="font-noto text-sm mb-6 opacity-80 text-white">
            Chat with our design team on WhatsApp. We&apos;ll help you pick the perfect invitation
            for your wedding.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '91XXXXXXXXXX'}?text=${encodeURIComponent('Namaskaram! I need help choosing a wedding invitation card.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-cinzel text-sm tracking-wider transition-all hover:scale-105"
            style={{ background: '#25D366', color: 'white' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg,#800000,#4a0000)' }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-cinzel text-sm tracking-widest mb-3" style={{ color: '#D4AF37' }}>
            START YOUR JOURNEY
          </p>
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#EFE6D2' }}
          >
            Ready to Create Your Dream Invitation?
          </h2>
          <p className="font-noto text-sm mb-6 opacity-80" style={{ color: '#EFE6D2' }}>
            Let us craft the perfect beginning to your forever story. Traditional. Elegant. Yours.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/shop" className="btn-gold">
              Browse Collection
            </Link>
            <Link
              href="/contact"
              className="font-cinzel text-sm px-6 py-3 border rounded-sm transition-colors"
              style={{ color: '#D4AF37', borderColor: '#D4AF37' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
