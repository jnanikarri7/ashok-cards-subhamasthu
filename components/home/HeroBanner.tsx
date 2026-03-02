'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{
      background: 'linear-gradient(135deg, #800000 0%, #4a0000 40%, #2b0000 100%)',
    }}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Gold ornamental circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 opacity-20" style={{borderColor:'#D4AF37'}} />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border opacity-15" style={{borderColor:'#D4AF37'}} />
      <div className="absolute top-1/2 right-20 w-20 h-20 rounded-full border opacity-20" style={{borderColor:'#F4C430'}} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-10" style={{background:'#D4AF37'}} />
            <span className="font-cinzel text-xs tracking-widest" style={{color:'#D4AF37'}}>SINCE 1985 • SECUNDERABAD</span>
            <div className="h-px w-10" style={{background:'#D4AF37'}} />
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{color:'#EFE6D2'}}>
            Where Every<br />
            <span style={{color:'#D4AF37'}}>Wedding Story</span><br />
            Begins
          </h1>

          <p className="font-noto text-lg mb-2 italic" style={{color:'#F4C430'}}>
            — Subhamasthu —
          </p>

          <p className="font-noto text-sm leading-relaxed mb-8 opacity-80 max-w-md" style={{color:'#EFE6D2'}}>
            Traditional South Indian wedding invitations crafted with devotion. 
            Telugu, Tamil, Kannada, Malayalam & English cards with authentic 
            motifs — from temple gopurams to kalamkari artistry.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/shop" className="btn-primary flex items-center gap-2">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className="btn-gold">
              How It Works
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 text-xs font-cinzel tracking-wide" style={{color:'#D4AF37'}}>
            <span className="flex items-center gap-1"><Star size={12} fill="#D4AF37" /> 4.9★ Rating</span>
            <span className="flex items-center gap-1">✦ 25,000+ Orders</span>
            <span className="flex items-center gap-1">✦ All India Shipping</span>
          </div>
        </motion.div>

        {/* Right Side — Card Preview */}
        <motion.div
          className="hidden lg:flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-80">
            {/* Background card */}
            <div className="absolute top-6 left-6 w-full h-full rounded-lg shadow-xl opacity-60" style={{background:'linear-gradient(135deg, #D4AF37, #F4C430)'}} />
            {/* Main card */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4" style={{borderColor:'#D4AF37', background:'#fff'}}>
              <div className="p-6 text-center" style={{background:'linear-gradient(135deg, #800000, #6b0000)'}}>
                <div className="font-cinzel text-xs tracking-widest mb-2" style={{color:'#D4AF37'}}>॥ श्री गणेशाय नमः ॥</div>
                <div className="font-playfair text-2xl font-bold mb-1" style={{color:'#D4AF37'}}>Subhamasthu</div>
                <div className="h-px w-20 mx-auto mb-3" style={{background:'#D4AF37'}} />
              </div>
              <div className="p-6 text-center" style={{background:'#EFE6D2'}}>
                <p className="font-noto text-sm mb-2" style={{color:'#800000'}}>With the blessings of God,</p>
                <p className="font-playfair text-lg font-bold mb-1" style={{color:'#800000'}}>Arjun weds Priya</p>
                <div className="font-cinzel text-xs tracking-wide mb-3" style={{color:'#D4AF37'}}>✦ ✦ ✦</div>
                <p className="font-noto text-xs" style={{color:'#666'}}>Muhurtham: 12th March 2025</p>
                <p className="font-noto text-xs" style={{color:'#666'}}>Sri Venkateswara Kalyana Mandapam</p>
                <p className="font-noto text-xs" style={{color:'#666'}}>Secunderabad, Telangana</p>
              </div>
              <div className="py-3 text-center" style={{background:'#800000'}}>
                <span className="font-cinzel text-xs tracking-widest" style={{color:'#D4AF37'}}>ASHOK CARDS SUBHAMASTHU</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#EFE6D2" />
        </svg>
      </div>
    </section>
  )
}
