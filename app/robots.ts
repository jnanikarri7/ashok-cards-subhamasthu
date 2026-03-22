import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ashok9cards.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/order/', '/checkout', '/cart', '/payment/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
