import MainLayout from '@/components/layout/MainLayout'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = ['PENDING', 'PROOF_SENT', 'PROOF_APPROVED', 'PRINTING', 'SHIPPED', 'DELIVERED']

export default async function OrderPage({ params, searchParams }: { params: { id: string }; searchParams: { success?: string } }) {
  const order = await prisma.order.findFirst({
    where: { OR: [{ id: params.id }, { orderNumber: params.id }] },
    include: { items: { include: { product: true } } },
  }).catch(() => null)

  if (!order) notFound()

  const currentStep = STEPS.indexOf(order.status)

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        {searchParams.success && (
          <div className="mb-6 p-4 rounded-lg text-center" style={{background:'#f0fdf4', border:'1px solid #86efac'}}>
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="font-playfair text-xl font-bold" style={{color:'#15803d'}}>Order Placed Successfully!</h2>
            <p className="font-noto text-sm mt-1" style={{color:'#166534'}}>Thank you! A confirmation email has been sent to {order.guestEmail}</p>
          </div>
        )}

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="font-playfair text-2xl font-bold" style={{color:'#800000'}}>Order #{order.orderNumber}</h1>
            <p className="font-noto text-sm" style={{color:'#888'}}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <span className={`text-xs font-cinzel tracking-wide px-3 py-1 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>
            {ORDER_STATUS_LABELS[order.status]}
          </span>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-lg border mb-6" style={{borderColor:'rgba(212,175,55,0.3)'}}>
          <h2 className="font-playfair text-lg font-semibold mb-4" style={{color:'#800000'}}>Order Progress</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-4 h-px" style={{background:'#e5e7eb', zIndex:0}} />
            <div className="absolute left-0 top-4 h-px transition-all duration-500" style={{background:'#D4AF37', width:`${Math.max(0, (currentStep / (STEPS.length - 1)) * 100)}%`, zIndex:1}} />
            {STEPS.map((step, i) => (
              <div key={step} className="relative z-10 flex flex-col items-center" style={{flex: '1'}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2" style={{
                  background: i <= currentStep ? '#800000' : '#fff',
                  borderColor: i <= currentStep ? '#800000' : '#ddd',
                }}>
                  {i < currentStep ? <Check size={14} color="#D4AF37" /> : <span className="font-cinzel text-xs" style={{color: i <= currentStep ? '#D4AF37' : '#ddd'}}>{i+1}</span>}
                </div>
                <span className="font-noto text-xs text-center leading-tight hidden sm:block" style={{color: i <= currentStep ? '#800000' : '#aaa', maxWidth:'70px'}}>
                  {ORDER_STATUS_LABELS[step]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-lg border mb-6" style={{borderColor:'rgba(212,175,55,0.3)'}}>
          <h2 className="font-playfair text-lg font-semibold mb-4" style={{color:'#800000'}}>Order Items</h2>
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between py-3 border-b font-noto text-sm" style={{borderColor:'rgba(212,175,55,0.2)'}}>
              <div>
                <p className="font-medium" style={{color:'#800000'}}>{item.product.name}</p>
                <p className="text-xs" style={{color:'#888'}}>Qty: {item.quantity} cards × ₹{item.pricePerCard}/card</p>
              </div>
              <span className="font-bold" style={{color:'#800000'}}>₹{item.totalPrice.toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="pt-3 space-y-1 font-noto text-sm">
            <div className="flex justify-between"><span style={{color:'#555'}}>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span style={{color:'#555'}}>Shipping</span><span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span></div>
            <div className="flex justify-between font-playfair font-bold text-lg"><span style={{color:'#800000'}}>Total</span><span style={{color:'#800000'}}>₹{order.total.toLocaleString('en-IN')}</span></div>
          </div>
        </div>

        <p className="font-noto text-sm text-center" style={{color:'#888'}}>
          Questions? WhatsApp us at <strong>+91-XXXXXXXXXX</strong> with your order number.
        </p>
      </div>
    </MainLayout>
  )
}
