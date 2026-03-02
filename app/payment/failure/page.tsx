import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Payment Failed — Ashok Cards' }

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">😔</div>
        <h1 className="font-playfair text-maroon-800 text-3xl font-bold mb-3">Payment Unsuccessful</h1>
        <p className="font-noto text-gray-600 mb-8">
          Your payment could not be processed. Don't worry — no money has been deducted.
          Please try again or contact us for assistance.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/checkout" className="px-6 py-3 bg-maroon-800 text-gold-500 font-cinzel tracking-wider rounded-lg">
            Try Again →
          </Link>
          <a
            href={`https://wa.me/?text=${encodeURIComponent('Hi! I had a payment issue while ordering from Ashok Cards. Can you help?')}`}
            className="px-6 py-3 bg-[#25D366] text-white font-cinzel tracking-wider rounded-lg"
          >
            💬 Contact via WhatsApp
          </a>
          <Link href="/shop" className="text-gray-600 font-noto text-sm hover:text-maroon-800">
            ← Return to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
