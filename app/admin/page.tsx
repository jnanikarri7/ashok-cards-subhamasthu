'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) { toast.success('Welcome!'); router.push('/admin/dashboard') }
    else { toast.error(data.error || 'Login failed') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'linear-gradient(135deg,#800000,#2b0000)'}}>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="font-cinzel text-2xl font-bold mb-1" style={{color:'#800000'}}>Ashok Cards</div>
          <div className="font-noto text-xs" style={{color:'#D4AF37'}}>Admin Panel</div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Email</label>
            <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block font-noto text-xs mb-1" style={{color:'#800000'}}>Password</label>
            <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
      </div>
    </div>
  )
}
