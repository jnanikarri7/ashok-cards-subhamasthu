import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Refund \& Cancellation Policy' }

export default function Page() {
  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Refund \& Cancellation Policy</h1>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex gap-3 flex-wrap mb-8">
          {[['shipping','Shipping'],['refund','Refund'],['terms','Terms'],['privacy','Privacy']].map(([s, l]) => (
            <Link key={s} href={"/policies/"+s} className="px-4 py-2 text-xs font-cinzel rounded border" style={{background: s==='refund'?'#800000':'white', color: s==='refund'?'#D4AF37':'#800000', borderColor:'#D4AF37'}}>{l}</Link>
          ))}
        </div>
        <div className="font-noto text-sm leading-relaxed space-y-4" style={{color:'#444'}}>
          <p>Please contact us at info@ashokcards.com for policy details. This page is being updated with full policy content.</p>
        </div>
      </div>
    </MainLayout>
  )
}
