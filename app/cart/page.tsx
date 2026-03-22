'use client'
import { useCartStore } from '@/lib/store'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()

  if (items.length === 0) return (
    <MainLayout>
      <div className="min-h-96 flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="font-playfair text-2xl mb-2" style={{color:'#800000'}}>Your cart is empty</h2>
        <p className="font-noto text-sm mb-6" style={{color:'#888'}}>Browse our collection to find the perfect wedding invitation</p>
        <Link href="/shop" className="btn-primary">Browse Cards</Link>
      </div>
    </MainLayout>
  )

  const subtotal = total()
  const shipping = subtotal > 5000 ? 0 : 149
  const tax = subtotal * 0.05
  const grandTotal = subtotal + shipping + tax

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-playfair text-3xl font-bold mb-8" style={{color:'#800000'}}>Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.productId} className="flex gap-4 p-4 bg-white rounded-lg border" style={{borderColor:'rgba(212,175,55,0.3)'}}>
                <div className="relative w-24 h-20 shrink-0 rounded overflow-hidden">
                  <Image src={item.image || 'https://placehold.co/100x80/EFE6D2/800000?text=Card'} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair font-semibold text-sm" style={{color:'#800000'}}>{item.name}</h3>
                  {item.customization?.groomName && (
                    <p className="font-noto text-xs mt-1" style={{color:'#888'}}>
                      {item.customization.groomName} weds {item.customization.brideName} • {item.quantity} cards
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="w-6 h-6 rounded border flex items-center justify-center" style={{borderColor:'#D4AF37'}}>
                      <Minus size={12} color="#800000" />
                    </button>
                    <span className="font-noto text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-6 h-6 rounded border flex items-center justify-center" style={{borderColor:'#D4AF37'}}>
                      <Plus size={12} color="#800000" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.productId)}><Trash2 size={16} color="#999" /></button>
                  <span className="font-playfair font-bold" style={{color:'#800000'}}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="p-6 bg-white rounded-lg border sticky top-20" style={{borderColor:'rgba(212,175,55,0.3)'}}>
              <h2 className="font-playfair text-xl font-bold mb-4" style={{color:'#800000'}}>Order Summary</h2>
              <div className="space-y-2 font-noto text-sm mb-4">
                <div className="flex justify-between"><span style={{color:'#555'}}>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span style={{color:'#555'}}>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span style={{color:'#555'}}>GST (5%)</span><span>₹{tax.toFixed(2)}</span></div>
                <div className="border-t pt-2 flex justify-between font-bold" style={{borderColor:'#D4AF37'}}>
                  <span style={{color:'#800000'}}>Total</span>
                  <span className="font-playfair text-xl" style={{color:'#800000'}}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              {shipping > 0 && <p className="font-noto text-xs mb-4" style={{color:'#888'}}>Add ₹{(5000-subtotal).toFixed(0)} more for FREE shipping</p>}
              <Link href="/checkout" className="btn-primary w-full justify-center block text-center mb-2">Proceed to Checkout →</Link>
              <Link href="/shop" className="font-noto text-xs block text-center" style={{color:'#800000'}}>← Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
