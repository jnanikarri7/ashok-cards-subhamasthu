import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how to order custom South Indian wedding invitation cards from Ashok Cards Subhamasthu in 4 easy steps.',
}

const STEPS = [
  { num: '01', title: 'Browse & Choose', desc: 'Explore our collection of 100+ traditional and modern designs. Filter by style, language, motif, and price. Each design comes with a detailed description and sample text.' },
  { num: '02', title: 'Customize Your Details', desc: 'Fill in your wedding details — bride and groom names, parents\' names, muhurtham date and time, venue, preferred language, motifs, quantity, and any special instructions.' },
  { num: '03', title: 'Receive Your Proof', desc: 'Our design team creates a personalized digital proof within 24–48 hours. We\'ll send it via email and WhatsApp. Request unlimited revisions until you\'re 100% satisfied.' },
  { num: '04', title: 'Approve & Pay', desc: 'Once you approve the proof, complete payment via Razorpay, UPI, or bank transfer. We begin printing immediately after payment confirmation.' },
  { num: '05', title: 'Quality Check', desc: 'Every batch goes through our 10-point quality inspection. We check print quality, color accuracy, paper quality, and finish before packing.' },
  { num: '06', title: 'Print & Deliver', desc: 'Cards are carefully packed and shipped via courier within 5–7 business days. Express delivery available. Track your order in real-time through our website.' },
]

export default function HowItWorksPage() {
  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>How It Works</h1>
        <p className="font-noto text-sm mt-2" style={{color:'#D4AF37'}}>From selection to delivery — a seamless experience</p>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-cinzel font-bold text-lg" style={{background:'#800000', color:'#D4AF37'}}>
                {s.num}
              </div>
              <div className="flex-1 pb-6 border-b" style={{borderColor:'rgba(212,175,55,0.3)'}}>
                <h3 className="font-playfair text-xl font-bold mb-2" style={{color:'#800000'}}>{s.title}</h3>
                <p className="font-noto text-sm leading-relaxed" style={{color:'#444'}}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-lg text-center" style={{background:'#EFE6D2', border:'1px solid rgba(212,175,55,0.3)'}}>
          <h3 className="font-playfair text-xl font-bold mb-2" style={{color:'#800000'}}>Typical Delivery Timeline</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[['24–48 hrs', 'Digital Proof'], ['3–5 days', 'Printing'], ['5–7 days', 'Delivery']].map(([time, label]) => (
              <div key={label}>
                <div className="font-playfair text-2xl font-bold" style={{color:'#800000'}}>{time}</div>
                <div className="font-cinzel text-xs tracking-wide" style={{color:'#D4AF37'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/shop" className="btn-primary">Start Browsing →</Link>
        </div>
      </div>
    </MainLayout>
  )
}
