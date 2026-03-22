import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Ashok 9 Cards Subhamasthu',
  description: 'Contact Ashok 9 Cards Subhamasthu for wedding invitation queries. Visit our Secunderabad store or reach us via phone, email, or WhatsApp.',
}

const INFO_CARDS = [
  { icon: MapPin, label: 'VISIT US', content: '#3-3-832, Bazar Road, near Dargah,\nGeneral Bazaar, Secunderabad,\nTelangana 500003' },
  { icon: Phone, label: 'PHONE & WHATSAPP', content: '+91-XXXXXXXXXX' },
  { icon: Mail, label: 'EMAIL', content: 'info@ashok9cards.com' },
  { icon: Clock, label: 'BUSINESS HOURS', content: 'Monday to Saturday: 9 AM to 8 PM\nSunday: 10 AM to 5 PM' },
]

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #f0f0f0', padding: '64px 24px', textAlign: 'center' }}>
        <p className="font-cinzel" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#800000', marginBottom: '16px' }}>
          ASHOK 9 CARDS SUBHAMASTHU
        </p>
        <h1 className="font-playfair" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.2 }}>
          Get in Touch
        </h1>
        <p className="font-noto" style={{ fontSize: '1rem', color: '#6b6b6b', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
          We&apos;re here to help craft your perfect invitation. Reach out and we&apos;ll respond within one business day.
        </p>
      </div>

      {/* Body */}
      <div style={{ background: '#fafaf9', minHeight: '100vh', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* LEFT */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>
                Contact Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {INFO_CARDS.map(({ icon: Icon, label, content }) => (
                  <div key={label} className="contact-info-card">
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(128,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="#800000" />
                    </div>
                    <div>
                      <p className="font-cinzel" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#6b6b6b', marginBottom: '6px' }}>
                        {label}
                      </p>
                      <p className="font-noto" style={{ fontSize: '0.875rem', color: '#1a1a1a', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                        {content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <p className="font-noto" style={{ fontSize: '0.75rem', color: '#6b6b6b', lineHeight: 1.7 }}>
                  Prefer a quick chat? Message us on WhatsApp — our design team typically responds within a few hours.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:flex justify-center">
              <div style={{ width: '1px', background: '#efefef', height: '100%' }} />
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>
                Send an Enquiry
              </h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid grid-cols-2 gap-4">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label className="font-cinzel" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#6b6b6b' }}>YOUR NAME</label>
                    <input type="text" placeholder="Sri Ramesh Kumar" className="contact-input" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label className="font-cinzel" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#6b6b6b' }}>PHONE</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" className="contact-input" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label className="font-cinzel" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#6b6b6b' }}>EMAIL ADDRESS</label>
                  <input type="email" placeholder="your@email.com" className="contact-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label className="font-cinzel" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#6b6b6b' }}>WEDDING DATE</label>
                  <input type="date" className="contact-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label className="font-cinzel" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#6b6b6b' }}>MESSAGE</label>
                  <textarea rows={5} placeholder="Tell us about your card requirements — design style, quantity, language, etc." className="contact-textarea" />
                </div>
                <button type="submit" className="contact-btn">Send Enquiry</button>
                <p className="font-noto" style={{ fontSize: '0.75rem', color: '#6b6b6b', textAlign: 'center' }}>
                  We typically respond within one business day.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  )
}