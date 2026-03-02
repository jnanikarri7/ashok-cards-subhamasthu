import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Ashok Cards Subhamasthu for wedding invitation queries. Visit our Secunderabad store or reach us via phone, email, or WhatsApp.',
}

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Contact Us</h1>
        <p className="font-noto text-sm mt-2" style={{color:'#D4AF37'}}>We're here to help craft your perfect invitation</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-6" style={{color:'#800000'}}>Get In Touch</h2>
          <div className="space-y-4">
            {[
              { icon: MapPin, title: 'Our Store', content: '#3-3-832, Bazar Road, near Dargah,\nGeneral Bazaar, Secunderabad,\nTelangana 500003' },
              { icon: Phone, title: 'Phone & WhatsApp', content: '+91-XXXXXXXXXX' },
              { icon: Mail, title: 'Email', content: 'info@ashokcards.com' },
              { icon: Clock, title: 'Business Hours', content: 'Monday – Saturday: 9 AM – 8 PM\nSunday: 10 AM – 5 PM' },
            ].map(({ icon: Icon, title, content }) => (
              <div key={title} className="flex gap-4 p-4 rounded-lg bg-white border" style={{borderColor:'rgba(212,175,55,0.3)'}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{background:'#800000'}}>
                  <Icon size={18} color="#D4AF37" />
                </div>
                <div>
                  <p className="font-cinzel text-xs tracking-wide mb-1" style={{color:'#D4AF37'}}>{title}</p>
                  <p className="font-noto text-sm whitespace-pre-line" style={{color:'#444'}}>{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Form */}
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-6" style={{color:'#800000'}}>Send an Enquiry</h2>
          <form className="bg-white p-6 rounded-lg border space-y-4" style={{borderColor:'rgba(212,175,55,0.3)'}}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Your Name</label>
                <input className="input-field" placeholder="Sri Ramesh Kumar" />
              </div>
              <div>
                <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Phone</label>
                <input className="input-field" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div>
              <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Email</label>
              <input className="input-field" placeholder="your@email.com" type="email" />
            </div>
            <div>
              <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Wedding Date</label>
              <input className="input-field" type="date" />
            </div>
            <div>
              <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Message</label>
              <textarea rows={4} className="input-field" placeholder="Tell us about your card requirements — design style, quantity, language, etc." />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">Send Enquiry</button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
