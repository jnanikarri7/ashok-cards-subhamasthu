import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{background:'#800000', color:'#EFE6D2'}}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="font-cinzel text-2xl mb-1" style={{color:'#D4AF37'}}>Ashok Cards</div>
          <div className="font-noto text-sm italic mb-3" style={{color:'#EFE6D2'}}>Subhamasthu</div>
          <p className="font-noto text-xs leading-relaxed opacity-80 mb-4">
            Traditional South Indian Wedding Invitations — Crafted with Elegance. Serving families across Telangana, Andhra Pradesh, Tamil Nadu, Karnataka, Kerala & All India.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:border-gold-400" style={{border:'1px solid rgba(212,175,55,0.5)'}}>
              <Instagram size={14} style={{color:'#D4AF37'}} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors" style={{border:'1px solid rgba(212,175,55,0.5)'}}>
              <Facebook size={14} style={{color:'#D4AF37'}} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border" style={{border:'1px solid rgba(212,175,55,0.5)'}}>
              <Youtube size={14} style={{color:'#D4AF37'}} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest mb-4" style={{color:'#D4AF37'}}>QUICK LINKS</h4>
          <ul className="space-y-2 text-xs font-noto opacity-80">
            {[['/', 'Home'], ['/shop', 'Shop All Cards'], ['/shop?category=traditional', 'Traditional Cards'], ['/shop?category=modern-digital', 'Digital E-Invites'], ['/gallery', 'Gallery'], ['/how-it-works', 'How It Works'], ['/contact', 'Contact Us']].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-gold-400 transition-colors" style={{color:'#EFE6D2'}}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest mb-4" style={{color:'#D4AF37'}}>POLICIES</h4>
          <ul className="space-y-2 text-xs font-noto opacity-80">
            {[['/policies/shipping', 'Shipping Policy'], ['/policies/refund', 'Refund & Cancellation'], ['/policies/terms', 'Terms & Conditions'], ['/policies/privacy', 'Privacy Policy'], ['/faq', 'FAQ'], ['/order-track', 'Track Your Order']].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-gold-400 transition-colors" style={{color:'#EFE6D2'}}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest mb-4" style={{color:'#D4AF37'}}>CONTACT US</h4>
          <div className="space-y-3 text-xs font-noto opacity-80">
            <div className="flex gap-2 items-start">
              <MapPin size={14} className="shrink-0 mt-0.5" style={{color:'#D4AF37'}} />
              <span>#3-3-832, Bazar Road, near Dargah,<br />General Bazaar, Secunderabad,<br />Telangana 500003</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone size={14} style={{color:'#D4AF37'}} />
              <a href="tel:+91XXXXXXXXXX" className="hover:text-gold-400">+91-XXXXXXXXXX</a>
            </div>
            <div className="flex gap-2 items-center">
              <Mail size={14} style={{color:'#D4AF37'}} />
              <a href="mailto:info@ashokcards.com" className="hover:text-gold-400">info@ashokcards.com</a>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-cinzel text-xs tracking-widest mb-2" style={{color:'#D4AF37'}}>LANGUAGES ON CARDS</p>
            <div className="flex flex-wrap gap-1">
              {['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English'].map(lang => (
                <span key={lang} className="text-xs px-2 py-0.5 rounded-full border" style={{border:'1px solid rgba(212,175,55,0.4)', color:'#EFE6D2'}}>{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-noto opacity-60" style={{borderColor:'rgba(212,175,55,0.2)'}}>
        <p>© {new Date().getFullYear()} Ashok Cards Subhamasthu. All rights reserved.</p>
        <p>Traditional South Indian Wedding Invitations — Crafted with Elegance.</p>
      </div>
    </footer>
  )
}
