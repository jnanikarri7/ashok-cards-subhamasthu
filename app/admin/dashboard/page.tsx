'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Package, Clock, TrendingUp, LogOut } from 'lucide-react'

interface Stats { totalOrders: number; totalProducts: number; pendingOrders: number; totalRevenue: number }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats)
    fetch('/api/orders').then(r => r.json()).then(d => setOrders(d.orders?.slice(0, 10) || []))
  }, [])

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin'
  }

  const STATUS_COLORS: Record<string, string> = {
    PENDING: '#f59e0b', PROOF_SENT: '#3b82f6', PROOF_APPROVED: '#8b5cf6',
    PRINTING: '#f97316', SHIPPED: '#14b8a6', DELIVERED: '#22c55e', CANCELLED: '#ef4444',
  }

  return (
    <div className="min-h-screen" style={{background:'#f8f4ee'}}>
      {/* Sidebar + Header */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen" style={{background:'#800000'}}>
          <div className="p-6 border-b" style={{borderColor:'rgba(212,175,55,0.2)'}}>
            <div className="font-cinzel text-sm" style={{color:'#D4AF37'}}>Ashok Cards</div>
            <div className="font-noto text-xs opacity-60" style={{color:'#EFE6D2'}}>Admin Panel</div>
          </div>
          <nav className="p-4 space-y-1">
            {[
              ['/admin/dashboard', '📊 Dashboard'],
              ['/admin/orders', '📦 Orders'],
              ['/admin/products', '🃏 Products'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="block px-3 py-2 rounded text-sm font-noto transition-colors" style={{color:'#EFE6D2'}}>{label}</Link>
            ))}
          </nav>
          <div className="p-4 mt-4">
            <button onClick={logout} className="flex items-center gap-2 text-xs font-noto" style={{color:'#EFE6D2', opacity:0.7}}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <h1 className="font-playfair text-2xl font-bold mb-6" style={{color:'#800000'}}>Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: '#800000' },
              { label: 'Pending Orders', value: stats?.pendingOrders || 0, icon: Clock, color: '#f59e0b' },
              { label: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: '#0A5B4F' },
              { label: 'Revenue', value: `₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`, icon: TrendingUp, color: '#D4AF37' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white p-5 rounded-lg border" style={{borderColor:'rgba(212,175,55,0.2)'}}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-noto text-xs mb-1" style={{color:'#888'}}>{label}</p>
                    <p className="font-playfair text-2xl font-bold" style={{color}}>{value}</p>
                  </div>
                  <Icon size={24} color={color} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg border overflow-hidden" style={{borderColor:'rgba(212,175,55,0.2)'}}>
            <div className="flex justify-between items-center px-6 py-4 border-b" style={{borderColor:'rgba(212,175,55,0.2)'}}>
              <h2 className="font-playfair font-semibold" style={{color:'#800000'}}>Recent Orders</h2>
              <Link href="/admin/orders" className="font-noto text-xs" style={{color:'#D4AF37'}}>View All →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-noto">
                <thead style={{background:'#EFE6D2'}}>
                  <tr>
                    {['Order #', 'Customer', 'Total', 'Status', 'Date', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-cinzel text-xs tracking-wide" style={{color:'#800000'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o: any) => (
                    <tr key={o.id} className="border-t hover:bg-amber-50" style={{borderColor:'rgba(212,175,55,0.1)'}}>
                      <td className="px-4 py-3 font-medium" style={{color:'#800000'}}>#{o.orderNumber}</td>
                      <td className="px-4 py-3">{o.guestName || o.customer?.name || '—'}</td>
                      <td className="px-4 py-3">₹{o.total?.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs" style={{background:`${STATUS_COLORS[o.status]}20`, color:STATUS_COLORS[o.status]}}>
                          {o.status?.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{color:'#888'}}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/orders?id=${o.id}`} className="text-xs" style={{color:'#800000'}}>Manage</Link>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No orders yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
