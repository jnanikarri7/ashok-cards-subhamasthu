import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our gallery of traditional South Indian wedding invitation cards.',
}

export default async function GalleryPage() {
  let products: any[] = []
  try {
    products = await prisma.product.findMany({ where: { inStock: true }, include: { category: true }, take: 20 })
  } catch {}

  return (
    <MainLayout>
      <div className="py-12 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>Our Gallery</h1>
        <p className="font-noto text-sm mt-2" style={{color:'#D4AF37'}}>A showcase of elegance and tradition</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {products.map(p => (
            <div key={p.id} className="break-inside-avoid rounded-lg overflow-hidden border shadow-sm card-hover" style={{borderColor:'rgba(212,175,55,0.3)'}}>
              <div className="relative">
                <Image
                  src={p.images?.[0] || 'https://placehold.co/400x300/EFE6D2/800000?text=Card'}
                  alt={p.name} width={400} height={300} className="w-full object-cover"
                />
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3" style={{background:'linear-gradient(to top, rgba(128,0,0,0.9), transparent)'}}>
                  <p className="font-playfair text-sm font-bold" style={{color:'#EFE6D2'}}>{p.name}</p>
                  <p className="font-noto text-xs" style={{color:'#D4AF37'}}>₹{p.price}/card</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
