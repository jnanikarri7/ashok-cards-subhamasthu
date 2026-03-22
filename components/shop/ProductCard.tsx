'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  minQuantity: number
  images: string[]
  category?: { name: string }
  motifs: string[]
  featured: boolean
  finish?: string
  rating: number
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(s => s.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price * product.minQuantity,
      quantity: 1,
      image: product.images[0] || '',
      customization: { quantity: product.minQuantity },
    })
    toast.success(`Added to cart! (Min. ${product.minQuantity} cards)`)
  }

  return (
    <div className="card-hover bg-white rounded-lg overflow-hidden shadow-sm border group" style={{borderColor:'rgba(212,175,55,0.3)'}}>
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={product.images[0] || 'https://placehold.co/400x300/EFE6D2/800000?text=Card+Preview'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.featured && (
          <div className="absolute top-2 left-2 font-cinzel text-xs px-2 py-0.5 rounded-sm shimmer-gold" style={{color:'#800000'}}>
            Featured
          </div>
        )}
        {product.finish && (
          <div className="absolute top-2 right-2 font-noto text-xs px-2 py-0.5 rounded-sm" style={{background:'rgba(128,0,0,0.85)', color:'#D4AF37'}}>
            {product.finish}
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background:'rgba(128,0,0,0.7)'}}>
          <Link href={`/shop/${product.slug}`} className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{background:'white', borderColor:'#D4AF37'}}>
            <Eye size={16} color="#800000" />
          </Link>
          <button onClick={handleAddToCart} className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{background:'#D4AF37', borderColor:'#D4AF37'}}>
            <ShoppingCart size={16} color="#800000" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {product.category && (
          <p className="font-cinzel text-xs tracking-wider mb-1" style={{color:'#D4AF37'}}>{product.category.name}</p>
        )}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-playfair text-base font-semibold leading-tight mb-2 hover:text-red-900 transition-colors" style={{color:'#800000'}}>
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({length: 5}).map((_, i) => (
            <svg key={i} className="w-3 h-3" fill={i < Math.floor(product.rating || 4) ? '#D4AF37' : '#ddd'} viewBox="0 0 20 20">
              <path d="M10 1l2.39 4.84L18 6.91l-4 3.89.94 5.5L10 13.77l-4.94 2.53.94-5.5-4-3.89 5.61-.16z"/>
            </svg>
          ))}
          <span className="text-xs font-noto ml-1" style={{color:'#888'}}>{product.rating || '4.8'}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-playfair text-lg font-bold" style={{color:'#800000'}}>₹{product.price}</span>
            <span className="font-noto text-xs ml-1" style={{color:'#888'}}>/card</span>
            <p className="font-noto text-xs" style={{color:'#888'}}>Min. {product.minQuantity} cards</p>
          </div>
          <Link href={`/shop/${product.slug}`} className="btn-primary text-xs py-2 px-3">
            Customize
          </Link>
        </div>
      </div>
    </div>
  )
}
