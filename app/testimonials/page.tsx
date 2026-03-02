import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = { title: 'Testimonials', description: 'Read what families across India say about Ashok Cards Subhamasthu.' }

const TESTIMONIALS = [
  { name: 'Kavya & Rajan Reddy', location: 'Hyderabad', rating: 5, wedding: 'Telugu Wedding', text: 'Absolutely stunning! The gold foil cards we ordered were beyond our expectations. Every detail was perfect — from the Ganesha motif to the Playfair typography. Our guests were amazed!' },
  { name: 'Meenakshi & Arjun Iyer', location: 'Chennai', rating: 5, wedding: 'Tamil Brahmin Wedding', text: 'Got our Lagna Patrika printed in Tamil and English. The Sanskrit shlokas were reproduced perfectly, and the ivory paper with bronze foil finish was exquisite. Will order again!' },
  { name: 'Deepa & Sriram Nair', location: 'Bangalore', rating: 5, wedding: 'Kerala Wedding', text: 'The digital e-invite video was beautiful! The team incorporated our couple photo with traditional Kerala motifs seamlessly. Delivered well within timeline. Highly recommend!' },
  { name: 'Padma & Venkat Rao', location: 'Vijayawada', rating: 5, wedding: 'Telugu Wedding', text: 'Ordered 500 temple theme cards for our son\'s wedding. The quality was consistent across all cards. Free shipping on our bulk order was a bonus. Thank you, Ashok Cards!' },
  { name: 'Lakshmi & Suresh Kumar', location: 'Coimbatore', rating: 5, wedding: 'Tamil Wedding', text: 'The Kalamkari design we chose was hand-drawn art quality. Everyone at the wedding asked where we got such unique cards. Proud to have chosen Ashok Cards Subhamasthu.' },
  { name: 'Anitha & Mohan Das', location: 'Kochi', rating: 4, wedding: 'Kerala Wedding', text: 'Beautiful Malayalam wedding cards with lotus border. Minor delay in shipping but the quality made up for it. Customer service was responsive throughout. Would recommend.' },
]

export default function TestimonialsPage() {
  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Customer Stories</h1>
        <p className="font-noto text-sm mt-2" style={{color:'#D4AF37'}}>25,000+ happy families across India</p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border" style={{borderColor:'rgba(212,175,55,0.3)'}}>
            <div className="flex gap-1 mb-3">
              {Array.from({length: 5}).map((_, j) => (
                <svg key={j} className="w-4 h-4" fill={j < t.rating ? '#D4AF37' : '#ddd'} viewBox="0 0 20 20">
                  <path d="M10 1l2.39 4.84L18 6.91l-4 3.89.94 5.5L10 13.77l-4.94 2.53.94-5.5-4-3.89 5.61-.16z"/>
                </svg>
              ))}
            </div>
            <p className="font-noto text-sm italic mb-4 leading-relaxed" style={{color:'#444'}}>"{t.text}"</p>
            <div className="border-t pt-3" style={{borderColor:'rgba(212,175,55,0.2)'}}>
              <p className="font-playfair font-semibold text-sm" style={{color:'#800000'}}>{t.name}</p>
              <p className="font-noto text-xs" style={{color:'#888'}}>{t.location}</p>
              <p className="font-cinzel text-xs mt-1" style={{color:'#D4AF37'}}>{t.wedding}</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}
