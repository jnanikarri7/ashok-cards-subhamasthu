'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ORDER_STATUS_LABELS } from '@/lib/utils'

const ALL_STATUSES = ['PENDING', 'PROOF_SENT', 'PROOF_APPROVED', 'PRINTING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  const load = async () => {
    const res = await fetch(`/api/orders${filter ? `?status=${filter}` : ''}`)
    const data = await res.json()
    setOrders(data.orders || [])
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId)
    await fetch(`/api/orders/${orderId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    await load()
    setUpdating(null)
  }

  return (
    <div className="min-h-screen" style={{background:'#f8f4ee'}}>
      <div className="flex">
        <aside className="w-56 min-h-screen" style={{background:'#800000'}}>
          <div className="p-6"><div className="font-cinzel text-sm" style={{color:'#D4AF37'}}>Ashok Cards Admin</div></div>
          <nav className="p-4 space-y-1">
            {[['/admin/dashboard','📊 Dashboard'],['/admin/orders','📦 Orders'],['/admin/products','🃏 Products']].map(([h, l]) => (
              <Link key={h} href={h} className="block px-3 py-2 rounded text-sm font-noto" style={{color:'#EFE6D2', background: h==='/admin/orders'?'rgba(212,175,55,0.2)':undefined}}>{l}</Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="font-playfair text-2xl font-bold mb-6" style={{color:'#800000'}}>Manage Orders</h1>
          <div className="flex gap-2 mb-6 flex-wrap">
            {['', ...ALL_STATUSES].map(s => (
              <button key={s} onClick={() => setFilter(s)} className="px-3 py-1.5 text-xs font-cinzel rounded border" style={{ background: filter===s?'#800000':'white', color: filter===s?'#D4AF37':'#800000', borderColor:'#D4AF37' }}>
                {s || 'All'}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-lg border overflow-hidden" style={{borderColor:'rgba(212,175,55,0.2)'}}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-noto">
                <thead style={{background:'#EFE6D2'}}>
                  <tr>{['Order #', 'Customer', 'Email', 'Total', 'Items', 'Status', 'Update Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-cinzel text-xs tracking-wide" style={{color:'#800000'}}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-t" style={{borderColor:'rgba(212,175,55,0.1)'}}>
                      <td className="px-4 py-3 font-medium" style={{color:'#800000'}}>#{o.orderNumber}</td>
                      <td className="px-4 py-3">{o.guestName || '—'}</td>
                      <td className="px-4 py-3 text-xs" style={{color:'#888'}}>{o.guestEmail || '—'}</td>
                      <td className="px-4 py-3">₹{o.total?.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">{o.items?.length || 0}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs" style={{background:'rgba(128,0,0,0.1)', color:'#800000'}}>{ORDER_STATUS_LABELS[o.status]}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          disabled={updating === o.id}
                          onChange={e => updateStatus(o.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1" style={{borderColor:'#D4AF37'}}
                        >
                          {ALL_STATUSES.map(s => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No orders found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
