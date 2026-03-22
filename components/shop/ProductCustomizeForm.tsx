'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

const MOTIF_OPTIONS = [
  'Ganesha', 'Kalasham', 'Lotus', 'Mango Leafs (Torana)',
  'Temple Gopuram', 'Peacock', 'Kuthuvilakku Lamp',
  'Kolam/Rangoli Borders', 'Nadaswaram/Thavil instruments',
]

const COLOR_OPTIONS = [
  { name: 'Temple Maroon', value: '#800000' },
  { name: 'Royal Gold', value: '#D4AF37' },
  { name: 'Peacock Green', value: '#0A5B4F' },
  { name: 'Sandalwood Cream', value: '#EFE6D2' },
  { name: 'Deep Maroon', value: '#5C0000' },
  { name: 'Classic White', value: '#FFFFFF' },
]

interface Product {
  id: string
  name: string
  minPrice: number
  maxPrice: number
  languages: string[]
  motifs: string[]
  minQty: number
  maxQty: number
  images: string[]
}

export default function ProductCustomizeForm({ product }: { product: Product }) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)

  const [form, setForm] = useState({
    brideName: '',
    groomName: '',
    brideParents: '',
    groomParents: '',
    muhurthamDate: '',
    muhurthamTime: '',
    venue: '',
    venueAddress: '',
    language: product.languages[0] || 'Telugu',
    selectedMotifs: product.motifs.slice(0, 2),
    colorChoice: COLOR_OPTIONS[0].name,
    quantity: product.minQty,
    notes: '',
    customPhotoUrl: '',
  })

  const [loading, setLoading] = useState(false)

  const pricePerCard = form.quantity <= 100 ? product.maxPrice :
    form.quantity <= 500 ? (product.minPrice + product.maxPrice) / 2 : product.minPrice
  const totalPrice = pricePerCard * form.quantity

  function toggleMotif(motif: string) {
    setForm((prev) => ({
      ...prev,
      selectedMotifs: prev.selectedMotifs.includes(motif)
        ? prev.selectedMotifs.filter((m) => m !== motif)
        : [...prev.selectedMotifs, motif],
    }))
  }

  async function handleAddToCart() {
    if (!form.brideName || !form.groomName || !form.muhurthamDate || !form.venue) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      addItem({
        productId: product.id,
        name: product.name,
        price: pricePerCard,
        quantity: form.quantity,
        image: product.images[0] || '',
        customization: {
          brideName: form.brideName,
          groomName: form.groomName,
          brideParents: form.brideParents,
          groomParents: form.groomParents,
          muhurthamDate: form.muhurthamDate,
          muhurthamTime: form.muhurthamTime,
          venue: form.venue,
          venueAddress: form.venueAddress,
          language: form.language,
          motifs: form.selectedMotifs,
          colorChoice: form.colorChoice,
          notes: form.notes,
          customPhotoUrl: form.customPhotoUrl,
        },
      })
      toast.success('Added to cart! 🎉')
      router.push('/cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gold-500/20 rounded-2xl p-8 shadow-luxury max-w-4xl mx-auto">
      {/* Price Summary */}
      <div className="bg-maroon-800 rounded-xl p-5 mb-8 text-center">
        <p className="text-cream-200/70 text-sm font-noto">Estimated Total</p>
        <p className="font-playfair text-gold-500 text-4xl font-bold">₹{totalPrice.toLocaleString('en-IN')}</p>
        <p className="text-cream-200/60 text-xs font-noto mt-1">
          ₹{pricePerCard.toFixed(0)} × {form.quantity} cards (incl. customization)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: Wedding Details */}
        <div className="space-y-5">
          <h3 className="font-cinzel text-maroon-800 text-lg tracking-wider border-b border-gold-500/30 pb-3">
            WEDDING DETAILS
          </h3>

          {/* Bride & Groom */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
                BRIDE'S NAME *
              </label>
              <input
                value={form.brideName}
                onChange={(e) => setForm({ ...form, brideName: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30"
              />
            </div>
            <div>
              <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
                GROOM'S NAME *
              </label>
              <input
                value={form.groomName}
                onChange={(e) => setForm({ ...form, groomName: e.target.value })}
                placeholder="e.g. Arjun Reddy"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30"
              />
            </div>
          </div>

          {/* Parents */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              BRIDE'S PARENTS' NAMES
            </label>
            <input
              value={form.brideParents}
              onChange={(e) => setForm({ ...form, brideParents: e.target.value })}
              placeholder="e.g. Sri. Ramesh & Smt. Lakshmi Sharma"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              GROOM'S PARENTS' NAMES
            </label>
            <input
              value={form.groomParents}
              onChange={(e) => setForm({ ...form, groomParents: e.target.value })}
              placeholder="e.g. Sri. Venkat & Smt. Padma Reddy"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Muhurtham */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
                MUHURTHAM DATE *
              </label>
              <input
                type="date"
                value={form.muhurthamDate}
                onChange={(e) => setForm({ ...form, muhurthamDate: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
                MUHURTHAM TIME
              </label>
              <input
                value={form.muhurthamTime}
                onChange={(e) => setForm({ ...form, muhurthamTime: e.target.value })}
                placeholder="e.g. 7:30 AM – 9:15 AM"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              VENUE NAME *
            </label>
            <input
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              placeholder="e.g. Sri Kalyana Mandapam"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              VENUE FULL ADDRESS
            </label>
            <textarea
              value={form.venueAddress}
              onChange={(e) => setForm({ ...form, venueAddress: e.target.value })}
              placeholder="Complete address with city and pincode..."
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500 resize-none"
            />
          </div>
        </div>

        {/* RIGHT: Design Preferences */}
        <div className="space-y-5">
          <h3 className="font-cinzel text-maroon-800 text-lg tracking-wider border-b border-gold-500/30 pb-3">
            DESIGN PREFERENCES
          </h3>

          {/* Language */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              INVITATION LANGUAGE
            </label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
            >
              {product.languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Motifs */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-2">
              PREFERRED MOTIFS (select multiple)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MOTIF_OPTIONS.map((motif) => (
                <button
                  key={motif}
                  type="button"
                  onClick={() => toggleMotif(motif)}
                  className={`px-3 py-2 text-xs rounded-lg border text-left transition-all ${
                    form.selectedMotifs.includes(motif)
                      ? 'bg-maroon-800 text-gold-500 border-maroon-800'
                      : 'border-gray-200 text-gray-700 hover:border-gold-500/50'
                  }`}
                >
                  {motif}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-2">
              PRIMARY COLOR THEME
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setForm({ ...form, colorChoice: color.name })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-noto transition-all ${
                    form.colorChoice === color.name
                      ? 'border-maroon-800 bg-cream-100'
                      : 'border-gray-200 hover:border-gold-500/50'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-300"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="truncate">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              QUANTITY (MIN. {product.minQty})
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={product.minQty}
                max={product.maxQty}
                step={50}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || product.minQty })}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500"
              />
              <span className="text-sm text-gray-500 font-noto whitespace-nowrap">
                = ₹{pricePerCard.toFixed(0)}/card
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-noto">
              Bulk pricing: 50+ cards. Higher quantity = lower per-card price.
            </p>
          </div>

          {/* Custom Notes */}
          <div>
            <label className="block text-xs font-cinzel text-maroon-800 tracking-wider mb-1.5">
              CUSTOM INSTRUCTIONS / NOTES
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Dress code, dietary notes, special requests, Nakshatra/Rashi info, etc."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-noto focus:outline-none focus:border-gold-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Preview Text */}
      {form.brideName && form.groomName && (
        <div className="mt-8 bg-cream-50 border border-gold-500/30 rounded-xl p-6">
          <h4 className="font-cinzel text-maroon-800 text-sm tracking-wider mb-4">✨ PREVIEW TEXT</h4>
          <div className="text-center font-noto text-maroon-800 leading-relaxed">
            <p className="text-sm text-gray-600 mb-2">With the blessings of Lord Ganesha,</p>
            {form.brideParents && <p className="text-sm"><em>{form.brideParents}</em></p>}
            {form.groomParents && <p className="text-sm"><em>{form.groomParents}</em></p>}
            <p className="text-xl font-bold mt-3">
              {form.brideName}
              <span className="text-gold-600 mx-3">♥</span>
              {form.groomName}
            </p>
            {form.muhurthamDate && (
              <p className="text-sm mt-2">
                {new Date(form.muhurthamDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                {form.muhurthamTime && ` | ${form.muhurthamTime}`}
              </p>
            )}
            {form.venue && <p className="text-sm font-medium mt-1">{form.venue}</p>}
            {form.venueAddress && <p className="text-xs text-gray-600 mt-0.5">{form.venueAddress}</p>}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 py-4 bg-maroon-800 text-gold-500 font-cinzel tracking-wider rounded-xl hover:bg-maroon-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {loading ? 'Adding...' : '🛒 Add to Cart & Checkout'}
        </button>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi! I want to order: ${product.name}\nBride: ${form.brideName}\nGroom: ${form.groomName}\nDate: ${form.muhurthamDate}\nQty: ${form.quantity}`)}`}
          target="_blank"
          className="py-4 px-8 bg-[#25D366] text-white font-cinzel tracking-wider rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
        >
          💬 Order via WhatsApp
        </a>
      </div>

      <p className="text-center text-xs text-gray-500 font-noto mt-4">
        🔒 Free digital proof provided before printing begins. No hidden charges.
      </p>
    </div>
  )
}
