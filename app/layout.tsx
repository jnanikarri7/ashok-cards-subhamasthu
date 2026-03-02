import type { Metadata } from 'next'
import { Playfair_Display, Noto_Serif, Cinzel } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const notoSerif = Noto_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const metadata: Metadata = {
  title: { default: 'Ashok Cards Subhamasthu — Traditional South Indian Wedding Invitations', template: '%s | Ashok Cards Subhamasthu' },
  description: 'Premium traditional South Indian wedding invitation cards. Telugu, Tamil, Kannada, Malayalam cards with custom designs. Temple motifs, Gold Foil, Kalamkari, and digital e-invites.',
  keywords: ['south indian wedding cards', 'telugu wedding invitations', 'tamil wedding cards', 'traditional invitation printing', 'Secunderabad wedding cards', 'custom wedding invitations India'],
  openGraph: {
    title: 'Ashok Cards Subhamasthu',
    description: 'Traditional South Indian Wedding Invitations — Crafted with Elegance.',
    url: 'https://ashokcards.com',
    siteName: 'Ashok Cards Subhamasthu',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${notoSerif.variable} ${cinzel.variable} font-noto bg-sandalwood min-h-screen`}>
        <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Noto Serif, serif', background: '#EFE6D2', color: '#800000', border: '1px solid #D4AF37' } }} />
        {children}
      </body>
    </html>
  )
}
