import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Pricing', description: 'Wedding invitation card pricing starting from ₹10/card. Volume discounts available.' }

const TIERS = [
  { qty: '50–100', perCard: '₹20–₹35', popular: false },
  { qty: '100–300', perCard: '₹15–₹22', popular: true },
  { qty: '300–500', perCard: '₹12–₹18', popular: false },
  { qty: '500+', perCard: '₹10–₹15', popular: false },
]

const PRODUCTS = [
  { name: 'Temple Theme Cards', from: 18, type: 'Traditional' },
  { name: 'Kalamkari Heritage', from: 22, type: 'Traditional' },
  { name: 'Royal Gold Foil', from: 35, type: 'Premium' },
  { name: 'Muhurtham Patrika', from: 16, type: 'Ceremony' },
  { name: 'Laser Cut Jali', from: 45, type: 'Premium' },
  { name: 'Digital E-Invite (Image)', from: 1500, type: 'Digital', fixed: true },
  { name: 'Digital E-Invite (Video)', from: 2500, type: 'Digital', fixed: true },
]

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Transparent Pricing</h1>
        <p className="font-noto text-sm mt-2" style={{color:'#D4AF37'}}>Quality invitations at every budget</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Volume Discounts */}
        <h2 className="font-playfair text-2xl font-bold mb-6 text-center" style={{color:'#800000'}}>Volume Pricing</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {TIERS.map(t => (
            <div key={t.qty} className="text-center p-5 rounded-lg border-2 relative" style={{borderColor: t.popular?'#D4AF37':'rgba(212,175,55,0.3)', background:'white'}}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-cinzel px-3 py-0.5 rounded-full shimmer-gold" style={{color:'#800000'}}>MOST POPULAR</div>}
              <div className="font-cinzel text-xs tracking-wide mb-2" style={{color:'#888'}}>QUANTITY</div>
              <div className="font-playfair text-xl font-bold mb-1" style={{color:'#800000'}}>{t.qty}</div>
              <div className="font-cinzel text-xs tracking-wide mb-2" style={{color:'#888'}}>PRICE/CARD</div>
              <div className="font-playfair text-lg font-bold" style={{color:'#D4AF37'}}>{t.perCard}</div>
            </div>
          ))}
        </div>

        {/* Product Pricing */}
        <h2 className="font-playfair text-2xl font-bold mb-6 text-center" style={{color:'#800000'}}>By Design Type</h2>
        <div className="bg-white rounded-lg border overflow-hidden mb-8" style={{borderColor:'rgba(212,175,55,0.3)'}}>
          <table className="w-full font-noto text-sm">
            <thead style={{background:'#EFE6D2'}}>
              <tr>
                {['Design', 'Type', 'Starting From', ''].map(h => <th key={h} className="text-left px-5 py-3 font-cinzel text-xs" style={{color:'#800000'}}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(p => (
                <tr key={p.name} className="border-t" style={{borderColor:'rgba(212,175,55,0.1)'}}>
                  <td className="px-5 py-3 font-medium" style={{color:'#800000'}}>{p.name}</td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{background:'rgba(212,175,55,0.15)', color:'#800000'}}>{p.type}</span></td>
                  <td className="px-5 py-3 font-playfair font-bold" style={{color:'#800000'}}>₹{p.from.toLocaleString('en-IN')}{!p.fixed ? '/card' : ''}</td>
                  <td className="px-5 py-3"><Link href="/shop" className="text-xs" style={{color:'#D4AF37'}}>Order →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-lg text-center" style={{background:'#EFE6D2', border:'1px solid rgba(212,175,55,0.3)'}}>
          <h3 className="font-playfair text-xl font-bold mb-2" style={{color:'#800000'}}>All Prices Include</h3>
          <p className="font-noto text-sm" style={{color:'#444'}}>✓ Digital proof &nbsp;|&nbsp; ✓ One free revision &nbsp;|&nbsp; ✓ GST &nbsp;|&nbsp; ✓ Quality inspection</p>
          <p className="font-noto text-sm mt-1" style={{color:'#444'}}>Free shipping on orders above ₹5,000 &nbsp;|&nbsp; Express delivery available</p>
          <Link href="/shop" className="btn-primary mt-4 inline-block">Start Your Order</Link>
        </div>
      </div>
    </MainLayout>
  )
}
