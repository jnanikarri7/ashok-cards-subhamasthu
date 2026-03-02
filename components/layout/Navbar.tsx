'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, Phone } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const itemCount = useCartStore(s => s.itemCount())

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
      {/* Top Banner */}
      <div className="bg-maroon-500 text-center py-2 px-4" style={{background:'#800000'}}>
        <p className="text-xs font-cinzel tracking-widest" style={{color:'#D4AF37'}}>
          ✦ FREE SHIPPING ON ORDERS ABOVE ₹5,000 ✦ ALL INDIA DELIVERY ✦ CALL +91-XXXXXXXXXX ✦
        </p>
      </div>

      <nav className="bg-sandalwood border-b-2 sticky top-0 z-40 shadow-md" style={{borderColor:'#D4AF37', backgroundColor:'#EFE6D2'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start">
              <span className="font-cinzel text-xl font-semibold leading-tight" style={{color:'#800000'}}>Ashok Cards</span>
              <span className="font-noto text-xs italic" style={{color:'#D4AF37'}}>Subhamasthu</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="font-noto text-sm hover:text-gold-400 transition-colors" style={{color:'#800000'}}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {searchOpen ? (
                <div className="flex items-center border rounded px-2" style={{borderColor:'#D4AF37', background:'white'}}>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && window.location.assign(`/shop?search=${searchQuery}`)}
                    placeholder="Search cards..."
                    className="outline-none py-1 px-1 text-sm w-36 font-noto"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)}><X size={14} color="#800000" /></button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)}><Search size={18} color="#800000" /></button>
              )}
              <Link href="/cart" className="relative">
                <ShoppingCart size={20} color="#800000" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs w-4 h-4 rounded-full flex items-center justify-center text-white font-bold" style={{background:'#800000'}}>
                    {itemCount}
                  </span>
                )}
              </Link>
              <a href="tel:+91XXXXXXXXXX" className="hidden sm:flex items-center gap-1 text-xs font-cinzel" style={{color:'#800000'}}>
                <Phone size={14} /> +91-XXXXXXXXXX
              </a>
              <button className="md:hidden" onClick={() => setOpen(!open)}>
                {open ? <X size={22} color="#800000" /> : <Menu size={22} color="#800000" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t" style={{borderColor:'#D4AF37', backgroundColor:'#EFE6D2'}}>
            <div className="px-4 py-3 space-y-2">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="block py-2 font-noto text-sm border-b" style={{color:'#800000', borderColor:'rgba(212,175,55,0.3)'}} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
