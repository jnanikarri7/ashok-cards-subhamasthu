import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-96 flex flex-col items-center justify-center py-20 text-center">
        <div className="font-playfair text-8xl font-bold mb-4" style={{color:'rgba(128,0,0,0.1)'}}>404</div>
        <h2 className="font-playfair text-3xl font-bold mb-2" style={{color:'#800000'}}>Page Not Found</h2>
        <p className="font-noto text-sm mb-6" style={{color:'#888'}}>The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    </MainLayout>
  )
}
