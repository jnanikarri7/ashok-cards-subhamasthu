'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, Phone } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About Us' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Top announcement bar */}
      <div style={{ background: '#800000' }} className="text-center py-2 px-4">
        <p className="text-xs font-cinzel tracking-widest" style={{ color: '#D4AF37' }}>
          ✦ FREE SHIPPING ABOVE ₹5,000 ✦ ALL INDIA DELIVERY ✦ CALL{' '}
          {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91-XXXXXXXXXX'} ✦
        </p>
      </div>

      <nav
        className="sticky top-0 z-40 border-b-2 transition-shadow duration-300"
        style={{
          borderColor: '#D4AF37',
          backgroundColor: '#EFE6D2',
          boxShadow: scrolled ? '0 4px 24px rgba(128,0,0,0.12)' : '0 2px 8px rgba(128,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <span
                className="font-cinzel text-lg sm:text-xl font-semibold leading-tight tracking-wide transition-colors group-hover:opacity-80"
                style={{ color: '#800000' }}
              >
                Ashok 9 Cards
              </span>
              <span className="font-noto text-xs italic" style={{ color: '#D4AF37' }}>
                Subhamasthu
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-noto text-sm transition-colors hover:opacity-70 relative group"
                  style={{ color: '#800000' }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: '#D4AF37' }}
                  />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {searchOpen ? (
                <div
                  className="flex items-center border rounded px-2"
                  style={{ borderColor: '#D4AF37', background: 'white' }}
                >
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      window.location.assign(`/shop?search=${searchQuery}`)
                    }
                    placeholder="Search cards..."
                    className="outline-none py-1 px-1 text-sm w-36 font-noto"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <X size={14} color="#800000" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)} aria-label="Search">
                  <Search size={18} color="#800000" />
                </button>
              )}

              <Link href="/cart" className="relative" aria-label="Cart">
                <ShoppingCart size={20} color="#800000" />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-xs w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: '#800000' }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>

              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91XXXXXXXXXX'}`}
                className="hidden sm:flex items-center gap-1 text-xs font-cinzel"
                style={{ color: '#800000' }}
              >
                <Phone size={14} />
                {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91-XXXXXXXXXX'}
              </a>

              <button
                className="md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X size={22} color="#800000" /> : <Menu size={22} color="#800000" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="md:hidden border-t"
            style={{ borderColor: '#D4AF37', backgroundColor: '#EFE6D2' }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-2.5 font-noto text-sm border-b"
                  style={{ color: '#800000', borderColor: 'rgba(212,175,55,0.3)' }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91XXXXXXXXXX'}`}
                className="flex items-center gap-2 py-2.5 font-cinzel text-xs"
                style={{ color: '#800000' }}
              >
                <Phone size={14} />
                {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91-XXXXXXXXXX'}
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
