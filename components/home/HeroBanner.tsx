'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Shield, Truck } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #800000 0%, #4a0000 45%, #2b0000 100%)',
      }}
    >
      {/* Silk texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gold rings */}
      <div
        className="absolute top-12 left-8 w-36 h-36 rounded-full border opacity-15"
        style={{ borderColor: '#D4AF37' }}
      />
      <div
        className="absolute top-16 left-12 w-28 h-28 rounded-full border opacity-10"
        style={{ borderColor: '#F4C430' }}
      />
      <div
        className="absolute bottom-16 right-8 w-52 h-52 rounded-full border opacity-10"
        style={{ borderColor: '#D4AF37' }}
      />
      <div
        className="absolute bottom-20 right-12 w-40 h-40 rounded-full border opacity-08"
        style={{ borderColor: '#F4C430' }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full border opacity-15"
        style={{ borderColor: '#D4AF37' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Heritage badge */}
          <motion.div
            className="flex items-center gap-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="h-px w-10" style={{ background: '#D4AF37' }} />
            <span
              className="font-cinzel text-xs tracking-widest"
              style={{ color: '#D4AF37' }}
            >
              SINCE 1985 • SECUNDERABAD
            </span>
            <div className="h-px w-10" style={{ background: '#D4AF37' }} />
          </motion.div>

          <h1
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            style={{ color: '#EFE6D2' }}
          >
            Where Every
            <br />
            <span style={{ color: '#D4AF37' }}>Wedding Story</span>
            <br />
            Begins
          </h1>

          <p className="font-noto text-lg mb-2 italic" style={{ color: '#F4C430' }}>
            — Subhamasthu —
          </p>

          <p
            className="font-noto text-sm leading-relaxed mb-8 opacity-80 max-w-md"
            style={{ color: '#EFE6D2' }}
          >
            Premium traditional South Indian wedding invitations crafted with devotion.
            Telugu, Tamil, Kannada, Malayalam & English cards with authentic motifs —
            from temple gopurams to kalamkari artistry.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/shop" className="btn-primary flex items-center gap-2">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className="btn-gold">
              How It Works
            </Link>
          </div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap gap-4 text-xs font-cinzel tracking-wide"
            style={{ color: '#D4AF37' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="flex items-center gap-1.5">
              <Star size={12} fill="#D4AF37" /> 4.9★ Rating
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={12} /> 25,000+ Orders
            </span>
            <span className="flex items-center gap-1.5">
              <Truck size={12} /> All India Shipping
            </span>
          </motion.div>
        </motion.div>

        {/* Right — Premium card mockup */}
        <motion.div
          className="hidden lg:flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative w-80">
            {/* Shadow card */}
            <div
              className="absolute top-6 left-6 w-full h-full rounded-xl shadow-2xl opacity-50"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F4C430)' }}
            />
            {/* Main card */}
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl border-4"
              style={{ borderColor: '#D4AF37', background: '#fff' }}
            >
              {/* Card header */}
              <div
                className="p-6 text-center"
                style={{ background: 'linear-gradient(135deg, #800000, #5c0000)' }}
              >
                <div
                  className="font-cinzel text-xs tracking-widest mb-2"
                  style={{ color: '#D4AF37' }}
                >
                  ॥ श्री गणेशाय नमः ॥
                </div>
                <div
                  className="font-playfair text-2xl font-bold mb-1"
                  style={{ color: '#D4AF37' }}
                >
                  Subhamasthu
                </div>
                <div className="h-px w-20 mx-auto mb-1" style={{ background: '#D4AF37' }} />
              </div>
              {/* Card body */}
              <div className="p-6 text-center" style={{ background: '#EFE6D2' }}>
                <p className="font-noto text-sm mb-2" style={{ color: '#800000' }}>
                  With the blessings of God,
                </p>
                <p
                  className="font-playfair text-xl font-bold mb-1"
                  style={{ color: '#800000' }}
                >
                  Arjun weds Priya
                </p>
                <div
                  className="font-cinzel text-xs tracking-wide mb-3"
                  style={{ color: '#D4AF37' }}
                >
                  ✦ ✦ ✦
                </div>
                <p className="font-noto text-xs" style={{ color: '#666' }}>
                  Muhurtham: 12th March 2025
                </p>
                <p className="font-noto text-xs" style={{ color: '#666' }}>
                  Sri Venkateswara Kalyana Mandapam
                </p>
                <p className="font-noto text-xs" style={{ color: '#666' }}>
                  Secunderabad, Telangana
                </p>
              </div>
              {/* Card footer */}
              <div className="py-3 text-center" style={{ background: '#800000' }}>
                <span
                  className="font-cinzel text-xs tracking-widest"
                  style={{ color: '#D4AF37' }}
                >
                  ASHOK 9 CARDS SUBHAMASTHU
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#EFE6D2" />
        </svg>
      </div>
    </section>
  )
}
