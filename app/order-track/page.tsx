'use client'
import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { useRouter } from 'next/navigation'

export default function TrackOrderPage() {
  const [orderNum, setOrderNum] = useState('')
  const router = useRouter()

  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Track Your Order</h1>
      </div>
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white p-8 rounded-lg border" style={{borderColor:'rgba(212,175,55,0.3)'}}>
          <label className="block font-noto text-sm mb-2" style={{color:'#800000'}}>Enter Your Order Number</label>
          <input className="input-field mb-4" placeholder="e.g. AC250301xxxx" value={orderNum} onChange={e => setOrderNum(e.target.value)} />
          <button className="btn-primary w-full justify-center" onClick={() => orderNum && router.push(`/order/${orderNum}`)}>
            Track Order →
          </button>
          <p className="font-noto text-xs text-center mt-4" style={{color:'#888'}}>Your order number is in your confirmation email.</p>
        </div>
      </div>
    </MainLayout>
  )
}
