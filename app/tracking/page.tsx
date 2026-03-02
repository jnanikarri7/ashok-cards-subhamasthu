'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const STATUS_STEPS = [
  { key: 'PENDING', label: 'Order Placed', icon: '📋', desc: 'Order received and payment confirmed' },
  { key: 'PROOF_SENT', label: 'Proof Sent', icon: '🎨', desc: 'Digital proof sent to your email' },
  { key: 'PROOF_APPROVED', label: 'Proof Approved', icon: '✅', desc: 'You approved the design' },
  { key: 'PRINTING', label: 'Printing', icon: '🖨️', desc: 'Your invitations are being printed' },
  { key: 'SHIPPED', label: 'Shipped', icon: '🚚', desc: 'On the way to your address' },
  { key: 'DELIVERED', label: 'Delivered', icon: '🎉', desc: 'Delivered successfully' },
]

function getStepIndex(status: string) {
  return STATUS_STEPS.findIndex((s) => s.key === status)
}

export default function TrackingPage() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') || '')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleTrack() {
    if (!orderNumber.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/tracking?order=${orderNumber.trim()}`)
      if (!res.ok) throw new Error('Order not found')
      const data = await res.json()
      setOrder(data.order)
    } catch {
      setError('Order not found. Please check the order number and try again.')
    } finally {
      setLoading(false)
    }
  }

  const currentStepIndex = order ? getStepIndex(order.status) : -1

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <p className="font-cinzel text-gold-600 tracking-widest text-sm mb-2">REAL-TIME</p>
        <h1 className="font-playfair text-maroon-800 text-4xl font-bold">Track Your Order</h1>
        <p className="font-noto text-gray-600 mt-3">
          Enter your order number to see the live status of your wedding invitations.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-10">
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
          placeholder="e.g. AC24010512345"
          className="flex-1 border-2 border-gold-500/30 rounded-xl px-4 py-3 font-cinzel tracking-wider text-maroon-800 focus:outline-none focus:border-gold-500 text-lg bg-white"
          onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
        />
        <button
          onClick={handleTrack}
          disabled={loading}
          className="px-8 py-3 bg-maroon-800 text-gold-500 font-cinzel tracking-wider rounded-xl hover:bg-maroon-900 transition-colors disabled:opacity-60"
        >
          {loading ? '...' : 'Track'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 font-noto text-center">
          {error}
        </div>
      )}

      {order && (
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-cinzel text-maroon-800 text-xl font-bold">#{order.orderNumber}</h2>
                <p className="font-noto text-gray-600 text-sm mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                </p>
              </div>
              <span className="bg-maroon-800 text-gold-500 px-4 py-1.5 rounded-full text-sm font-cinzel tracking-wider">
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="font-noto text-gray-700">For: <strong>{order.customerName}</strong></p>
            {order.trackingNumber && (
              <p className="font-noto text-gray-700 mt-1">
                Courier Tracking: <strong className="text-peacock-600">{order.trackingNumber}</strong>
              </p>
            )}
          </div>

          {/* Progress Stepper */}
          <div className="bg-white border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
            <h3 className="font-cinzel text-maroon-800 text-sm tracking-wider mb-6">ORDER PROGRESS</h3>
            <div className="space-y-0">
              {STATUS_STEPS.map((step, i) => {
                const isDone = i <= currentStepIndex
                const isCurrent = i === currentStepIndex
                return (
                  <div key={step.key} className="flex gap-4">
                    {/* Line + Circle */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 border-2 transition-colors ${
                          isDone
                            ? 'bg-maroon-800 border-maroon-800 text-gold-500'
                            : 'bg-white border-gray-200 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-maroon-800/20' : ''}`}
                      >
                        {step.icon}
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-1 ${
                            i < currentStepIndex ? 'bg-maroon-800' : 'bg-gray-100'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6 flex-1">
                      <p className={`font-playfair font-semibold ${isDone ? 'text-maroon-800' : 'text-gray-400'}`}>
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 bg-gold-500/20 text-gold-700 text-xs px-2 py-0.5 rounded-full font-cinzel">
                            CURRENT
                          </span>
                        )}
                      </p>
                      <p className={`font-noto text-sm mt-0.5 ${isDone ? 'text-gray-600' : 'text-gray-300'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Items */}
          {order.items && (
            <div className="bg-white border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
              <h3 className="font-cinzel text-maroon-800 text-sm tracking-wider mb-4">ORDER ITEMS</h3>
              <div className="space-y-3">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-12 h-16 bg-cream-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images[0] && (
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-playfair text-maroon-800 font-semibold text-sm">{item.product.name}</p>
                      <p className="font-noto text-gray-600 text-xs">{item.quantity} cards</p>
                      {item.customization?.brideName && (
                        <p className="font-noto text-gray-500 text-xs">
                          {item.customization.brideName} ♥ {item.customization.groomName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Help */}
      <div className="mt-10 text-center text-sm font-noto text-gray-500">
        <p>Can't find your order? Contact us at{' '}
          <a href="mailto:info@ashokcards.com" className="text-gold-600 hover:underline">info@ashokcards.com</a>
          {' '}or WhatsApp us.
        </p>
      </div>
    </div>
  )
}
