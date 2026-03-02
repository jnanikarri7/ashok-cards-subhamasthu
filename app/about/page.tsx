import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Ashok Cards Subhamasthu — Secunderabad\'s trusted traditional South Indian wedding invitation store since 1985.',
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="py-12 px-6 text-center" style={{background:'linear-gradient(135deg,#800000,#4a0000)'}}>
        <p className="font-cinzel text-xs tracking-widest mb-2" style={{color:'#D4AF37'}}>OUR STORY</p>
        <h1 className="font-playfair text-4xl font-bold" style={{color:'#EFE6D2'}}>About Ashok Cards Subhamasthu</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="ornament mb-8"><span className="font-cinzel text-xs tracking-widest px-4" style={{color:'#D4AF37'}}>Since 1985</span></div>

        <div className="prose font-noto leading-relaxed space-y-6" style={{color:'#444'}}>
          <p className="text-lg">
            Founded in the heart of Secunderabad's bustling General Bazaar, <strong style={{color:'#800000'}}>Ashok Cards Subhamasthu</strong> has been crafting wedding invitations that honour the rich traditions of South India for nearly four decades.
          </p>
          <p>
            What began as a small printing shop near the iconic Dargah on Bazar Road has grown into one of Telangana's most trusted names for traditional wedding invitation cards. Our founder, Sri Ashok Kumar, started with a single press and a deep reverence for South Indian cultural aesthetics — hand-drawing gopuram borders, sourcing the finest paper from Tamil Nadu mills, and ensuring every card told a story worthy of the families it represented.
          </p>
          <p>
            Today, we serve over 25,000 families every year — from Secunderabad to Chennai, Bangalore to Kochi, and across the globe through our All-India shipping service. Our artisans combine traditional motifs like the sacred Ganesha, the auspicious Kalasham, and the magnificent Peacock with modern printing technology to deliver cards that are both timeless and impeccably produced.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            {[['38+', 'Years of Heritage'], ['25,000+', 'Happy Families'], ['5', 'Languages Served']].map(([num, label]) => (
              <div key={label} className="text-center p-6 rounded-lg" style={{background:'#EFE6D2', border:'1px solid rgba(212,175,55,0.3)'}}>
                <div className="font-playfair text-4xl font-bold" style={{color:'#800000'}}>{num}</div>
                <div className="font-cinzel text-xs tracking-widest mt-1" style={{color:'#D4AF37'}}>{label}</div>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-2xl font-bold" style={{color:'#800000'}}>Our Commitment</h2>
          <p>
            Every invitation that leaves our workshop carries with it our commitment to perfection. We understand that a wedding invitation is not merely a piece of paper — it is the first impression of your celebration, the bearer of an auspicious event, and a cherished keepsake for generations.
          </p>
          <p>
            We specialise in Telugu, Tamil, Kannada, Malayalam, and English wedding cards, with the option to include Sanskrit shlokas for traditional Brahmin ceremonies. Our motif library includes 200+ traditional designs — from Kalamkari patterns to intricate Kolam borders — allowing every family to find a design that speaks to their heritage.
          </p>

          <h2 className="font-playfair text-2xl font-bold" style={{color:'#800000'}}>Visit Us</h2>
          <p>
            Our shop is located at <strong>#3-3-832, Bazar Road, near Dargah, General Bazaar, Secunderabad, Telangana 500003</strong>. Walk in any day to browse our sample albums, discuss your design, and experience our craft firsthand.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
