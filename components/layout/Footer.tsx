import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#800000', color: '#EFE6D2' }}>
      {/* Ornamental top border */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #F4C430, #D4AF37, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="font-cinzel text-2xl tracking-wide mb-0.5" style={{ color: '#D4AF37' }}>
            Ashok 9 Cards
          </div>
          <div className="font-noto text-sm italic mb-4" style={{ color: '#EFE6D2' }}>
            Subhamasthu
          </div>
          <p className="font-noto text-xs leading-relaxed opacity-75 mb-5">
            Premium traditional South Indian wedding invitations crafted with devotion since 1985.
            Serving families across Telangana, Andhra Pradesh, Tamil Nadu, Karnataka, Kerala &
            all of India.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: '#', label: 'Instagram' },
              { Icon: Facebook, href: '#', label: 'Facebook' },
              { Icon: Youtube, href: '#', label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: '1px solid rgba(212,175,55,0.5)' }}
              >
                <Icon size={14} style={{ color: '#D4AF37' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-cinzel text-xs tracking-widest mb-5" style={{ color: '#D4AF37' }}>
            QUICK LINKS
          </h4>
          <ul className="space-y-2.5 text-xs font-noto">
            {[
              ['/', 'Home'],
              ['/shop', 'Shop All Cards'],
              ['/shop?category=traditional', 'Traditional Cards'],
              ['/shop?category=modern-digital', 'Digital E-Invites'],
              ['/gallery', 'Gallery'],
              ['/how-it-works', 'How It Works'],
              ['/contact', 'Contact Us'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: '#EFE6D2' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-cinzel text-xs tracking-widest mb-5" style={{ color: '#D4AF37' }}>
            POLICIES
          </h4>
          <ul className="space-y-2.5 text-xs font-noto">
            {[
              ['/policies/shipping', 'Shipping Policy'],
              ['/policies/refund', 'Refund & Cancellation'],
              ['/policies/terms', 'Terms & Conditions'],
              ['/policies/privacy', 'Privacy Policy'],
              ['/faq', 'FAQ'],
              ['/order-track', 'Track Your Order'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  style={{ color: '#EFE6D2' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-cinzel text-xs tracking-widest mb-5" style={{ color: '#D4AF37' }}>
            CONTACT US
          </h4>
          <div className="space-y-3 text-xs font-noto">
            <div className="flex gap-2 items-start opacity-75">
              <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
              <span>
                #3-3-832, Bazar Road, near Dargah,
                <br />
                General Bazaar, Secunderabad,
                <br />
                Telangana 500003
              </span>
            </div>
            <div className="flex gap-2 items-center opacity-75">
              <Phone size={14} style={{ color: '#D4AF37' }} />
              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91XXXXXXXXXX'}`}
                className="hover:opacity-100 transition-opacity"
                style={{ color: '#EFE6D2' }}
              >
                {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91-XXXXXXXXXX'}
              </a>
            </div>
            <div className="flex gap-2 items-center opacity-75">
              <Mail size={14} style={{ color: '#D4AF37' }} />
              <a
                href="mailto:info@ashok9cards.com"
                className="hover:opacity-100 transition-opacity"
                style={{ color: '#EFE6D2' }}
              >
                info@ashok9cards.com
              </a>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-cinzel text-xs tracking-widest mb-2" style={{ color: '#D4AF37' }}>
              CARD LANGUAGES
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English'].map((lang) => (
                <span
                  key={lang}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ border: '1px solid rgba(212,175,55,0.4)', color: '#EFE6D2' }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-noto"
        style={{ borderColor: 'rgba(212,175,55,0.2)', opacity: 0.65 }}
      >
        <p>© {new Date().getFullYear()} Ashok 9 Cards Subhamasthu. All rights reserved.</p>
        <p>Traditional South Indian Wedding Invitations — Crafted with Devotion.</p>
      </div>
    </footer>
  )
}
