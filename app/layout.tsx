import type { Metadata } from 'next'
import { Playfair_Display, Noto_Serif, Cinzel, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import CartHydration from '@/components/providers/CartHydration'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const notoSerif = Noto_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ashok9cards.com'),
  title: {
    default: 'Ashok 9 Cards Subhamasthu — Premium South Indian Wedding Invitations',
    template: '%s | Ashok 9 Cards Subhamasthu',
  },
  description:
    'Premium traditional South Indian wedding invitation cards since 1985. Telugu, Tamil, Kannada, Malayalam cards with temple motifs, Gold Foil, Kalamkari artistry and digital e-invites. Crafted with devotion in Secunderabad.',
  keywords: [
    'south indian wedding cards',
    'telugu wedding invitations',
    'tamil wedding cards',
    'traditional invitation printing',
    'Secunderabad wedding cards',
    'custom wedding invitations India',
    'ashok 9 cards',
    'subhamasthu',
    'gold foil wedding cards',
    'kalamkari wedding invitations',
  ],
  openGraph: {
    title: 'Ashok 9 Cards Subhamasthu — Premium South Indian Wedding Invitations',
    description: 'Traditional South Indian Wedding Invitations — Crafted with Devotion since 1985.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ashok9cards.com',
    siteName: 'Ashok 9 Cards Subhamasthu',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashok 9 Cards Subhamasthu',
    description: 'Premium Traditional South Indian Wedding Invitations — Crafted with Devotion.',
    site: '@ashok9cards',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://ashok9cards.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${notoSerif.variable} ${cinzel.variable} ${inter.variable} font-noto bg-sandalwood min-h-screen`}
      >
        <CartHydration />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'Noto Serif, serif',
              background: '#EFE6D2',
              color: '#800000',
              border: '1px solid #D4AF37',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
