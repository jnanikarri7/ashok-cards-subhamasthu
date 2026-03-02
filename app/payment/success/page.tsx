import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Order Confirmed! — Ashok Cards' }

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-peacock-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🎊</span>
        </div>

        <h1 className="font-playfair text-maroon-800 text-4xl font-bold mb-3">
          Shubhamastu! 🪔
        </h1>
        <p className="font-playfair text-maroon-800 text-xl mb-2">
          Order Confirmed!
        </p>
        {searchParams.order && (
          <div className="bg-maroon-800 text-gold-500 rounded-lg px-4 py-2 inline-block mb-6 font-cinzel tracking-wider">
            Order #{searchParams.order}
          </div>
        )}

        <div className="bg-white border border-gold-500/20 rounded-2xl p-8 shadow-luxury mb-8 text-left">
          <h3 className="font-cinzel text-maroon-800 text-sm tracking-wider mb-4">WHAT HAPPENS NEXT?</h3>
          <div className="space-y-4">
            {[
              { icon: '📧', title: 'Confirmation Email', desc: 'You\'ll receive an email with your order details shortly.' },
              { icon: '🎨', title: 'Digital Proof (within 2 days)', desc: 'Our design team will prepare your personalized proof and email it for approval.' },
              { icon: '✅', title: 'Your Approval', desc: 'Review and approve the proof (or request changes). Printing begins only after approval.' },
              { icon: '🖨️', title: 'Premium Printing', desc: 'Your invitations are printed with the finest quality materials.' },
              { icon: '🚚', title: 'Delivery (5-7 business days)', desc: 'Delivered to your doorstep with love and care.' },
            ].map((step) => (
              <div key={step.title} className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{step.icon}</span>
                <div>
                  <p className="font-playfair text-maroon-800 font-semibold text-sm">{step.title}</p>
                  <p className="font-noto text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {searchParams.order && (
            <Link
              href={`/tracking?order=${searchParams.order}`}
              className="px-6 py-3 bg-maroon-800 text-gold-500 font-cinzel tracking-wider rounded-lg hover:bg-maroon-900 transition-colors"
            >
              Track Order →
            </Link>
          )}
          <Link
            href="/shop"
            className="px-6 py-3 border border-maroon-800 text-maroon-800 font-cinzel tracking-wider rounded-lg hover:bg-maroon-800 hover:text-gold-500 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-8 font-noto text-gray-500 text-sm">
          Questions? Email us at{' '}
          <a href="mailto:info@ashokcards.com" className="text-gold-600 hover:underline">
            info@ashokcards.com
          </a>{' '}
          or WhatsApp us.
        </p>
      </div>
    </div>
  )
}
