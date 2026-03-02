import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ordering wedding invitation cards from Ashok Cards Subhamasthu.',
}

const FAQS = [
  { q: 'What is the minimum order quantity?', a: 'Most designs have a minimum order of 50–100 cards. Laser-cut and special designs may require a minimum of 25 cards. Digital e-invites have a minimum order of 1.' },
  { q: 'How long does delivery take?', a: 'After proof approval and payment, printing takes 3–5 business days. Shipping takes an additional 2–5 days depending on your location. Total turnaround is typically 7–10 days.' },
  { q: 'Do you provide digital proofs?', a: 'Yes! We provide a detailed digital proof within 24–48 hours of receiving your customization details. Proofs are sent via email and WhatsApp. Revisions are free.' },
  { q: 'In which languages can you print?', a: 'We print in Telugu, Tamil, Kannada, Malayalam, English, and Sanskrit. Multiple languages can be used on the same card (e.g., Telugu + English bilingual).' },
  { q: 'Can I visit your store to see samples?', a: 'Absolutely! Our store at #3-3-832, Bazar Road, Secunderabad is open Monday–Saturday (9 AM – 8 PM) and Sunday (10 AM – 5 PM). We have 200+ sample albums to browse.' },
  { q: 'What payment methods do you accept?', a: 'We accept Razorpay (all major cards), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Bank Transfer. 50% advance and 50% before shipping (for orders above ₹10,000).' },
  { q: 'Do you ship outside India?', a: 'Yes! We ship internationally via DHL/FedEx. International shipping charges are calculated at checkout based on destination and weight.' },
  { q: 'Can I customise motifs and colors?', a: 'Yes! You can select from our 200+ motif library and specify color preferences. Our designers will incorporate your choices into the proof.' },
  { q: 'What if I\'m not happy with my order?', a: 'We stand by our quality. If cards are damaged in transit or there\'s a printing error on our part, we\'ll reprint at no charge. Please see our Refund Policy for details.' },
  { q: 'Are digital e-invites available?', a: 'Yes! We offer animated video e-invites (MP4, 30–60 sec) and static digital invites (JPEG/PDF). These are perfect for sharing on WhatsApp, Instagram, and social media.' },
]

export default function FAQPage() {
  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Frequently Asked Questions</h1>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
        {FAQS.map((faq, i) => (
          <details key={i} className="group bg-white rounded-lg border overflow-hidden" style={{borderColor:'rgba(212,175,55,0.3)'}}>
            <summary className="flex justify-between items-center p-4 cursor-pointer font-playfair font-semibold" style={{color:'#800000'}}>
              {faq.q}
              <span className="ml-2 text-gold-400 font-cinzel">+</span>
            </summary>
            <div className="px-4 pb-4 font-noto text-sm leading-relaxed" style={{color:'#444'}}>{faq.a}</div>
          </details>
        ))}
      </div>
    </MainLayout>
  )
}
