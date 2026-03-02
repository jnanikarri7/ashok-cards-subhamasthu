'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({ name:'', slug:'', description:'', price:'', minQuantity:'50', categoryId:'', paperType:'', finish:'', featured:false, images:[''], motifs:[] as string[], languages:['Telugu','English'], tags:[] as string[] })

  const load = async () => {
    const res = await fetch('/api/products?limit=50')
    const d = await res.json()
    setProducts(d.products || [])
  }

  useEffect(() => {
    load()
    fetch('/api/categories').then(r => r.json()).then(setCategories)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), minQuantity: parseInt(form.minQuantity), slug: form.slug || form.name.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'') }),
    })
    if (res.ok) { toast.success('Product created!'); setShowForm(false); load() }
    else toast.error('Failed to create product')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted'); load() }
  }

  return (
    <div className="min-h-screen" style={{background:'#f8f4ee'}}>
      <div className="flex">
        <aside className="w-56 min-h-screen" style={{background:'#800000'}}>
          <div className="p-6"><div className="font-cinzel text-sm" style={{color:'#D4AF37'}}>Ashok Cards Admin</div></div>
          <nav className="p-4 space-y-1">
            {[['/admin/dashboard','📊 Dashboard'],['/admin/orders','📦 Orders'],['/admin/products','🃏 Products']].map(([h, l]) => (
              <Link key={h} href={h} className="block px-3 py-2 rounded text-sm font-noto" style={{color:'#EFE6D2', background: h==='/admin/products'?'rgba(212,175,55,0.2)':undefined}}>{l}</Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-playfair text-2xl font-bold" style={{color:'#800000'}}>Manage Products</h1>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border mb-6 grid grid-cols-2 gap-4" style={{borderColor:'rgba(212,175,55,0.2)'}}>
              <h2 className="col-span-2 font-playfair font-bold" style={{color:'#800000'}}>New Product</h2>
              {[['name','Name'],['slug','Slug (optional)'],['price','Price per card (₹)'],['minQuantity','Min Qty'],['paperType','Paper Type'],['finish','Finish']].map(([k,l]) => (
                <div key={k}>
                  <label className="block text-xs font-noto mb-1" style={{color:'#800000'}}>{l}</label>
                  <input className="input-field text-sm" value={(form as any)[k]} onChange={e => setForm(p => ({...p,[k]:e.target.value}))} required={['name','price'].includes(k)} />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs font-noto mb-1" style={{color:'#800000'}}>Category</label>
                <select className="input-field text-sm" value={form.categoryId} onChange={e => setForm(p => ({...p, categoryId: e.target.value}))}>
                  <option value="">Select category</option>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-noto mb-1" style={{color:'#800000'}}>Description</label>
                <textarea rows={3} className="input-field text-sm" value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-noto mb-1" style={{color:'#800000'}}>Image URL</label>
                <input className="input-field text-sm" value={form.images[0]} onChange={e => setForm(p => ({...p, images: [e.target.value]}))} />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({...p, featured: e.target.checked}))} id="featured" />
                <label htmlFor="featured" className="font-noto text-sm" style={{color:'#800000'}}>Featured product</label>
              </div>
              <div className="col-span-2 flex gap-3">
                <button type="submit" className="btn-primary">Save Product</button>
                <button type="button" onClick={() => setShowForm(false)} className="font-noto text-sm px-4 py-2 border rounded" style={{borderColor:'#D4AF37', color:'#800000'}}>Cancel</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-lg border overflow-hidden" style={{borderColor:'rgba(212,175,55,0.2)'}}>
                <div className="relative aspect-[4/3]">
                  <Image src={p.images?.[0] || 'https://placehold.co/200x150/EFE6D2/800000?text=Card'} alt={p.name} fill className="object-cover" />
                  {p.featured && <div className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded shimmer-gold" style={{color:'#800000'}}>Featured</div>}
                </div>
                <div className="p-3">
                  <p className="font-playfair font-semibold text-sm mb-1 truncate" style={{color:'#800000'}}>{p.name}</p>
                  <p className="font-noto text-xs mb-2" style={{color:'#888'}}>₹{p.price}/card • Min {p.minQuantity}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 text-xs py-1 px-2 border rounded flex items-center justify-center gap-1" style={{borderColor:'#D4AF37', color:'#800000'}}>
                      <Pencil size={12} /> Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="flex-1 text-xs py-1 px-2 border rounded flex items-center justify-center gap-1" style={{borderColor:'#ef4444', color:'#ef4444'}}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
