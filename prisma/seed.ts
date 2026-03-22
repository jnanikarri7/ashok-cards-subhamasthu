import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const CARD_IMAGES = {
  temple:    'https://placehold.co/800x600/800000/D4AF37?text=Temple+Theme',
  kalamkari: 'https://placehold.co/800x600/4a0000/D4AF37?text=Kalamkari',
  leaf:      'https://placehold.co/800x600/2d5a27/D4AF37?text=Leaf+Style',
  gold:      'https://placehold.co/800x600/5c4000/D4AF37?text=Gold+Foil',
  gopuram:   'https://placehold.co/800x600/800000/EFE6D2?text=Gopuram',
  modern:    'https://placehold.co/800x600/1a1a2e/D4AF37?text=Modern',
  laser:     'https://placehold.co/800x600/2c2c2c/D4AF37?text=Laser+Cut',
  digital:   'https://placehold.co/800x600/0a3d62/D4AF37?text=Digital+Invite',
}

async function main() {
  // Create admin
  const hashedPw = await bcrypt.hash('Admin@123', 10)
  await prisma.admin.upsert({
    where: { email: 'admin@ashokcards.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@ashokcards.com', password: hashedPw, role: 'superadmin' },
  })

  // Categories
  const traditional = await prisma.category.upsert({
    where: { slug: 'traditional' },
    update: {},
    create: { name: 'Traditional', slug: 'traditional', description: 'Classic South Indian wedding invitation designs', image: CARD_IMAGES.temple },
  })
  const ceremony = await prisma.category.upsert({
    where: { slug: 'ceremony-specific' },
    update: {},
    create: { name: 'Ceremony Specific', slug: 'ceremony-specific', description: 'Cards designed for specific wedding ceremonies', image: CARD_IMAGES.gold },
  })
  const modern = await prisma.category.upsert({
    where: { slug: 'modern-digital' },
    update: {},
    create: { name: 'Modern & Digital', slug: 'modern-digital', description: 'Contemporary and digital invitation designs', image: CARD_IMAGES.modern },
  })

  // Sub-categories
  await prisma.category.upsert({ where: { slug: 'temple-theme' }, update: {}, create: { name: 'Temple Theme Cards', slug: 'temple-theme', parentId: traditional.id, image: CARD_IMAGES.temple } })
  await prisma.category.upsert({ where: { slug: 'kalamkari' }, update: {}, create: { name: 'Kalamkari / Heritage', slug: 'kalamkari', parentId: traditional.id, image: CARD_IMAGES.kalamkari } })
  await prisma.category.upsert({ where: { slug: 'leaf-style' }, update: {}, create: { name: 'Leaf Style Cards', slug: 'leaf-style', parentId: traditional.id, image: CARD_IMAGES.leaf } })
  await prisma.category.upsert({ where: { slug: 'gold-foil' }, update: {}, create: { name: 'Gold Foil Cards', slug: 'gold-foil', parentId: traditional.id, image: CARD_IMAGES.gold } })

  // Products
  const products = [
    { name: 'Srinivasa Mandapam Temple Card', slug: 'srinivasa-mandapam-temple-card', description: 'Exquisite temple-themed card featuring Tirupati-inspired gopuram artwork with gold embossing. Perfect for traditional Telugu weddings.', price: 18, minQuantity: 100, categoryId: traditional.id, motifs: ['Ganesha', 'Gopuram', 'Kalasham'], languages: ['Telugu', 'English'], paperType: 'Premium Art Paper', finish: 'Gold Emboss', featured: true, images: [CARD_IMAGES.temple], tags: ['temple', 'traditional', 'telugu', 'gold'] },
    { name: 'Kalamkari Heritage Invitation', slug: 'kalamkari-heritage-invitation', description: 'Hand-painted Kalamkari art style invitation with traditional folk motifs from Andhra Pradesh. Truly one-of-a-kind artistic invitation.', price: 22, minQuantity: 50, categoryId: traditional.id, motifs: ['Peacock', 'Lotus', 'Mango Leafs'], languages: ['Telugu', 'Tamil', 'English'], paperType: 'Handmade Paper', finish: 'Matte', featured: true, images: [CARD_IMAGES.kalamkari], tags: ['kalamkari', 'artisanal', 'handmade'] },
    { name: 'Mango Leaf Torana Card', slug: 'mango-leaf-torana-card', description: 'Auspicious mango leaf (torana) border design symbolizing prosperity. Traditional green and gold color scheme with sacred motifs.', price: 15, minQuantity: 100, categoryId: traditional.id, motifs: ['Mango Leafs', 'Kolam', 'Ganesha'], languages: ['Telugu', 'Kannada', 'Tamil', 'English'], paperType: 'Ivory Card Stock', finish: 'Satin', images: [CARD_IMAGES.leaf], tags: ['mango', 'leaf', 'torana', 'traditional'] },
    { name: 'Royal Gold Foil Patrika', slug: 'royal-gold-foil-patrika', description: 'Premium 24K gold foil stamped invitation on thick cotton paper. Exudes luxury and grandeur befitting a royal wedding.', price: 35, minQuantity: 50, categoryId: traditional.id, motifs: ['Kalasham', 'Lotus', 'Ganesha'], languages: ['Telugu', 'Tamil', 'English'], paperType: '300 GSM Cotton', finish: '24K Gold Foil', featured: true, images: [CARD_IMAGES.gold], tags: ['gold-foil', 'luxury', 'premium'] },
    { name: 'Gopuram Grandeur Card', slug: 'gopuram-grandeur-card', description: 'Magnificent South Indian temple tower (gopuram) design with intricate deity carvings. A tribute to Dravidian architectural heritage.', price: 20, minQuantity: 100, categoryId: traditional.id, motifs: ['Gopuram', 'Ganesha', 'Peacock'], languages: ['Tamil', 'Telugu', 'English'], paperType: 'Art Paper', finish: 'UV Gloss', images: [CARD_IMAGES.gopuram], tags: ['gopuram', 'temple', 'dravidian'] },
    { name: 'Muhurtham Patrika Classic', slug: 'muhurtham-patrika-classic', description: 'Traditional Muhurtham (auspicious time) card with Panchanga details. Includes special section for nakshatra, thithi, and muhurtham time.', price: 16, minQuantity: 100, categoryId: ceremony.id, motifs: ['Ganesha', 'Kalasham', 'Kuthuvilakku'], languages: ['Telugu', 'Tamil', 'English'], paperType: 'Premium Card', finish: 'Gloss', featured: true, images: [CARD_IMAGES.temple], tags: ['muhurtham', 'panchanga', 'traditional'] },
    { name: 'Reception Royal Card', slug: 'reception-royal-card', description: 'Elegant reception invitation with modern-traditional blend. Perfect for evening reception parties with a sophisticated look.', price: 14, minQuantity: 100, categoryId: ceremony.id, motifs: ['Lotus', 'Peacock'], languages: ['Telugu', 'Tamil', 'Kannada', 'English'], paperType: 'Silk Paper', finish: 'Satin', images: [CARD_IMAGES.gold], tags: ['reception', 'evening', 'elegant'] },
    { name: 'Lagna Patrika Premium', slug: 'lagna-patrika-premium', description: 'The complete wedding invitation (Lagna Patrika) with all ceremony details. Includes Bride\'s and Groom\'s family pages with traditional blessings text.', price: 25, minQuantity: 50, categoryId: ceremony.id, motifs: ['Ganesha', 'Kalasham', 'Mango Leafs', 'Lotus'], languages: ['Telugu', 'Tamil', 'English'], paperType: '250 GSM Art Board', finish: 'Soft Touch', featured: true, images: [CARD_IMAGES.gold], tags: ['lagna-patrika', 'complete', 'premium'] },
    { name: 'Engagement Nischitartham Card', slug: 'engagement-nischitartham-card', description: 'Beautiful engagement (Nischitartham) invitation with floral and traditional motifs. Sets the tone for the grand wedding to follow.', price: 12, minQuantity: 50, categoryId: ceremony.id, motifs: ['Lotus', 'Peacock', 'Kolam'], languages: ['Telugu', 'Tamil', 'English'], paperType: 'Premium Paper', finish: 'Matte', images: [CARD_IMAGES.leaf], tags: ['engagement', 'nischitartham', 'flowers'] },
    { name: 'Pelli Patrika Deluxe', slug: 'pelli-patrika-deluxe', description: 'Deluxe Telugu wedding invitation (Pelli Patrika) with all traditional elements. Customizable with your family details and wedding venue.', price: 18, minQuantity: 100, categoryId: ceremony.id, motifs: ['Ganesha', 'Gopuram', 'Kolam'], languages: ['Telugu', 'English'], paperType: 'Art Paper', finish: 'Gold Border', images: [CARD_IMAGES.temple], tags: ['pelli-patrika', 'telugu', 'traditional'] },
    { name: 'Minimal Elegance White', slug: 'minimal-elegance-white', description: 'Contemporary minimalist design with subtle gold accents. Clean typography meets traditional motifs in a modern presentation.', price: 10, minQuantity: 50, categoryId: modern.id, motifs: ['Lotus', 'Ganesha'], languages: ['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English'], paperType: 'Premium White', finish: 'Matte', featured: true, images: [CARD_IMAGES.modern], tags: ['minimal', 'modern', 'clean'] },
    { name: 'Laser Cut Jali Invitation', slug: 'laser-cut-jali-invitation', description: 'Stunning laser-cut invitation with intricate jali (lattice) pattern. The cutwork reveals the invitation card inside — a wow-factor guaranteed.', price: 45, minQuantity: 25, categoryId: modern.id, motifs: ['Ganesha', 'Peacock', 'Lotus'], languages: ['Telugu', 'Tamil', 'English'], paperType: 'White Card + Color Inner', finish: 'Laser Cut', featured: true, images: [CARD_IMAGES.laser], tags: ['laser-cut', 'premium', 'jali', 'luxury'] },
    { name: 'Digital E-Invite Video', slug: 'digital-e-invite-video', description: 'Animated digital invitation video (30-60 sec) with music. Share on WhatsApp, Instagram, and all digital platforms instantly.', price: 2500, minQuantity: 1, categoryId: modern.id, motifs: ['Ganesha', 'Peacock', 'Lotus', 'Kolam'], languages: ['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English'], paperType: 'Digital File (MP4 + JPEG)', finish: 'Digital', featured: true, images: [CARD_IMAGES.digital], tags: ['digital', 'video', 'e-invite', 'whatsapp'] },
    { name: 'Peacock Heritage Card', slug: 'peacock-heritage-card', description: 'Vibrant peacock motif card in traditional teal and gold. The peacock symbolizes beauty and grace — perfect for grand wedding celebrations.', price: 19, minQuantity: 100, categoryId: traditional.id, motifs: ['Peacock', 'Lotus', 'Mango Leafs'], languages: ['Tamil', 'Telugu', 'English'], paperType: 'Art Board', finish: 'Satin + Spot UV', images: [CARD_IMAGES.kalamkari], tags: ['peacock', 'teal', 'heritage'] },
    { name: 'Kuthuvilakku Lamp Card', slug: 'kuthuvilakku-lamp-card', description: 'Sacred lamp (Kuthuvilakku) centered design representing divine light and auspiciousness. A deeply spiritual and traditional choice.', price: 17, minQuantity: 100, categoryId: traditional.id, motifs: ['Kuthuvilakku', 'Kolam', 'Ganesha'], languages: ['Tamil', 'Telugu', 'Kannada', 'English'], paperType: 'Ivory Board', finish: 'Bronze Foil', images: [CARD_IMAGES.leaf], tags: ['lamp', 'kuthuvilakku', 'spiritual'] },
    { name: 'Kolam Border Patrika', slug: 'kolam-border-patrika', description: 'Intricate kolam (rangoli) pattern border surrounding the invitation. Every line is hand-drawn by our master artists, digitally reproduced.', price: 13, minQuantity: 100, categoryId: traditional.id, motifs: ['Kolam', 'Lotus', 'Ganesha'], languages: ['Tamil', 'Telugu', 'Kannada', 'Malayalam', 'English'], paperType: 'Art Paper', finish: 'Gloss', images: [CARD_IMAGES.kalamkari], tags: ['kolam', 'rangoli', 'borders'] },
    { name: 'Nadaswaram Musical Card', slug: 'nadaswaram-musical-card', description: 'Unique card featuring traditional Nadaswaram and Thavil musical instruments. Celebrates the rich musical heritage of South Indian weddings.', price: 21, minQuantity: 50, categoryId: traditional.id, motifs: ['Ganesha', 'Kolam', 'Lotus'], languages: ['Telugu', 'Tamil', 'English'], paperType: 'Premium Art', finish: 'Textured Matt', images: [CARD_IMAGES.temple], tags: ['nadaswaram', 'musical', 'instruments', 'heritage'] },
    { name: 'Digital Photo E-Invite', slug: 'digital-photo-e-invite', description: 'Personalized digital invitation with your couple\'s photo incorporated into beautiful South Indian traditional design. Available as JPEG, PDF, and WhatsApp story format.', price: 1500, minQuantity: 1, categoryId: modern.id, motifs: ['Lotus', 'Peacock', 'Kolam'], languages: ['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English'], paperType: 'Digital (JPEG + PDF)', finish: 'Digital', images: [CARD_IMAGES.digital], tags: ['digital', 'photo', 'e-invite', 'personalized'] },
    { name: 'Tamil Brahmin Classic Patrika', slug: 'tamil-brahmin-classic-patrika', description: 'Traditional Iyer/Iyengar wedding invitation with Sanskrit shlokas and traditional Brahmin wedding ceremony details. Timeless and sacred.', price: 20, minQuantity: 100, categoryId: ceremony.id, motifs: ['Ganesha', 'Kalasham', 'Lotus'], languages: ['Tamil', 'Sanskrit', 'English'], paperType: '250 GSM Board', finish: 'Gold Border Print', images: [CARD_IMAGES.gold], tags: ['brahmin', 'iyer', 'tamil', 'traditional'] },
    { name: 'Kerala Christian-Inspired Card', slug: 'kerala-inspired-card', description: 'Elegant Kerala-style invitation with traditional motifs adapted for all communities. Beautiful floral and geometric borders with ivory and gold theme.', price: 16, minQuantity: 100, categoryId: traditional.id, motifs: ['Lotus', 'Mango Leafs', 'Kolam'], languages: ['Malayalam', 'English'], paperType: 'Ivory Laid Paper', finish: 'Letterpress', images: [CARD_IMAGES.leaf], tags: ['kerala', 'malayalam', 'elegant', 'floral'] },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, sampleText: `Om Ganeshaya Namah\n\nWith the blessings of God,\n[Groom's Parents Names]\nare delighted to announce the wedding of their son\n[Groom Name]\nwith\n[Bride Name]\ndaughter of\n[Bride's Parents Names]\n\nMuhurtham: [Date] at [Time]\nVenue: [Venue Name], [Address]` },
    })
  }

  console.log('✅ Seed complete! 20 products, categories, and admin created.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
