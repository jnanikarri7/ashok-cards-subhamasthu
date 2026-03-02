'use client'
import { useState } from 'react'
import { MOTIFS, LANGUAGES } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Product { id: string; name: string; price: number; minQuantity: number; images: string[] }

export default function CustomizationForm({ product }: { product: Product }) {
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)
  const [qty, setQty] = useState(product.minQuantity)
  const [form, setForm] = useState({
    groomName: '', brideName: '', groomParents: '', brideParents: '',
    muhurthamDate: '', muhurthamTime: '', venue: '', venueAddress: '',
    language: 'Telugu', selectedMotifs: [] as string[], colorPreference: '',
    dresscode: '', customNotes: '',
  })

  const handleSubmit = () => {
    if (!form.groomName || !form.brideName || !form.muhurthamDate || !form.venue) {
      toast.error('Please fill in groom name, bride name, date and venue.')
      return
    }
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price * qty,
      quantity: 1,
      image: product.images[0] || '',
      customization: { ...form, quantity: qty },
    })
    toast.success('Added to cart with customization!')
    router.push('/cart')
  }

  const toggleMotif = (m: string) => {
    setForm(prev => ({
      ...prev,
      selectedMotifs: prev.selectedMotifs.includes(m) ? prev.selectedMotifs.filter(x => x !== m) : [...prev.selectedMotifs, m],
    }))
  }

  const f = (label: string, key: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block font-noto text-xs font-medium mb-1" style={{color:'#800000'}}>{label}</label>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={form[key as keyof typeof form] as string}
        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {f("Groom's Name *", 'groomName', 'text', 'e.g. Ravi Kumar')}
        {f("Bride's Name *", 'brideName', 'text', 'e.g. Priya Devi')}
        {f("Groom's Parents Names", 'groomParents', 'text', 'e.g. Sri Ramesh Kumar & Smt. Lakshmi')}
        {f("Bride's Parents Names", 'brideParents', 'text', 'e.g. Sri Suresh Reddy & Smt. Sunitha')}
        {f("Muhurtham Date *", 'muhurthamDate', 'date')}
        {f("Muhurtham Time", 'muhurthamTime', 'time')}
        {f("Venue Name *", 'venue', 'text', 'e.g. Sri Venkateswara Kalyana Mandapam')}
        {f("Venue Address", 'venueAddress', 'text', 'Full address with city')}
        {f("Color Preference", 'colorPreference', 'text', 'e.g. Red and Gold, Peacock Green')}
        {f("Dress Code (optional)", 'dresscode', 'text', 'e.g. Ethnic wear, No alcohol')}
      </div>

      {/* Language */}
      <div>
        <label className="block font-noto text-xs font-medium mb-2" style={{color:'#800000'}}>Language on Card</label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(lang => (
            <button key={lang} type="button"
              className="px-3 py-1 rounded-full text-xs font-noto border transition-all"
              style={{
                background: form.language === lang ? '#800000' : 'white',
                color: form.language === lang ? '#D4AF37' : '#800000',
                borderColor: '#D4AF37',
              }}
              onClick={() => setForm(prev => ({ ...prev, language: lang }))}
            >{lang}</button>
          ))}
        </div>
      </div>

      {/* Motifs */}
      <div>
        <label className="block font-noto text-xs font-medium mb-2" style={{color:'#800000'}}>Preferred Motifs (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {MOTIFS.map(m => (
            <button key={m} type="button"
              className="px-3 py-1 rounded-full text-xs font-noto border transition-all"
              style={{
                background: form.selectedMotifs.includes(m) ? '#D4AF37' : 'white',
                color: '#800000',
                borderColor: '#D4AF37',
              }}
              onClick={() => toggleMotif(m)}
            >{m}</button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block font-noto text-xs font-medium mb-2" style={{color:'#800000'}}>
          Quantity (Min. {product.minQuantity} cards)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={product.minQuantity}
            step={50}
            value={qty}
            onChange={e => setQty(Math.max(product.minQuantity, Number(e.target.value)))}
            className="input-field w-32"
          />
          <div className="text-sm font-noto" style={{color:'#888'}}>
            Total: <span className="font-playfair font-bold text-lg" style={{color:'#800000'}}>₹{(product.price * qty).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Custom Notes */}
      <div>
        <label className="block font-noto text-xs font-medium mb-1" style={{color:'#800000'}}>Special Instructions / Custom Notes</label>
        <textarea
          rows={3}
          className="input-field"
          placeholder="Any specific requests, venue directions, or additional details..."
          value={form.customNotes}
          onChange={e => setForm(prev => ({ ...prev, customNotes: e.target.value }))}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={handleSubmit} className="btn-primary flex-1 justify-center">
          🛒 Add to Cart & Get Proof
        </button>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '')}?text=${encodeURIComponent(`Namaskaram! I want to order "${product.name}" — Groom: ${form.groomName}, Bride: ${form.brideName}`)}`}
          target="_blank"
          className="btn-gold px-4"
        >
          WhatsApp
        </a>
      </div>
      <p className="font-noto text-xs text-center" style={{color:'#888'}}>
        ✓ Digital proof within 24–48 hours &nbsp;|&nbsp; ✓ Revision included &nbsp;|&nbsp; ✓ Print begins after approval
      </p>
    </div>
  )
}
