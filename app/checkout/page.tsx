'use client'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/store'
import MainLayout from '@/components/layout/MainLayout'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: 'Telangana',
  })

  const subtotal = total()
  const shipping = subtotal > 5000 ? 0 : 149
  const tax = subtotal * 0.05
  const grandTotal = subtotal + shipping + tax

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Please fill all required fields')
      return
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error('Enter a valid 10-digit mobile number')
      return
    }
    if (!/^\d{6}$/.test(form.pincode) && form.pincode) {
      toast.error('Enter a valid 6-digit pincode')
      return
    }

    setLoading(true)
    try {
      // Create order in DB
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          shippingAddress: {
            name: form.name,
            address: form.address,
            city: form.city,
            pincode: form.pincode || '500000',
            state: form.state,
            email: form.email,
            phone: form.phone,
          },
          items: items.map((i) => ({
            productId: i.productId,
            quantity: (i.customization?.quantity as number) || i.quantity,
            pricePerCard: i.price,
            customization: i.customization,
          })),
        }),
      })

      const order = await orderRes.json()
      if (!orderRes.ok) throw new Error(order.error || 'Failed to create order')

      // Create Razorpay order
      const payRes = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal, receipt: order.orderNumber }),
      })
      const payOrder = await payRes.json()
      if (!payRes.ok) throw new Error(payOrder.error || 'Payment initiation failed')

      // Load Razorpay script dynamically
      await new Promise<void>((resolve, reject) => {
        if (document.querySelector('script[src*="razorpay"]')) { resolve(); return }
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load payment gateway'))
        document.body.appendChild(script)
      })

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: payOrder.amount,
        currency: payOrder.currency,
        name: 'Ashok 9 Cards Subhamasthu',
        description: 'Wedding Invitation Cards',
        order_id: payOrder.id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#800000' },
        handler: async (response: Record<string, string>) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, orderId: order.id }),
          })
          if (verifyRes.ok) {
            clearCart()
            router.push(`/order/${order.orderNumber}?success=true`)
          } else {
            toast.error('Payment verification failed. Contact support.')
          }
        },
      })
      rzp.open()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const field = (label: string, key: keyof typeof form, type = 'text', required = false) => (
    <div>
      <label className="block font-noto text-xs font-medium mb-1" style={{ color: '#800000' }}>
        {label}
        {required && ' *'}
      </label>
      <input
        type={type}
        required={required}
        className="input-field"
        value={form[key]}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
      />
    </div>
  )

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, router])

  if (items.length === 0) {
    return null
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-playfair text-3xl font-bold mb-8" style={{ color: '#800000' }}>
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <h2 className="font-playfair text-xl mb-4" style={{ color: '#800000' }}>
              Delivery Details
            </h2>
            <div
              className="space-y-4 bg-white p-6 rounded-lg border"
              style={{ borderColor: 'rgba(212,175,55,0.3)' }}
            >
              {field('Full Name', 'name', 'text', true)}
              {field('Email Address', 'email', 'email', true)}
              {field('Phone Number', 'phone', 'tel', true)}
              {field('Address', 'address', 'text', true)}
              <div className="grid grid-cols-2 gap-3">
                {field('City', 'city')}
                {field('Pincode', 'pincode')}
              </div>
              {field('State', 'state')}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-playfair text-xl mb-4" style={{ color: '#800000' }}>
              Order Summary
            </h2>
            <div
              className="bg-white p-6 rounded-lg border"
              style={{ borderColor: 'rgba(212,175,55,0.3)' }}
            >
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between py-2 border-b font-noto text-sm"
                  style={{ borderColor: 'rgba(212,175,55,0.2)' }}
                >
                  <span style={{ color: '#555' }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={{ color: '#800000' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="pt-3 space-y-1 font-noto text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#555' }}>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#555' }}>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#555' }}>GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between font-bold font-playfair text-lg pt-2 border-t"
                  style={{ borderColor: '#D4AF37' }}
                >
                  <span style={{ color: '#800000' }}>Total</span>
                  <span style={{ color: '#800000' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="btn-primary w-full justify-center mt-4"
              >
                {loading ? 'Processing...' : `Pay ₹${grandTotal.toLocaleString('en-IN')} →`}
              </button>
              <p className="font-noto text-xs text-center mt-2" style={{ color: '#888' }}>
                Secured by Razorpay • UPI • Cards • Net Banking
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
