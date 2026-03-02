import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  
  if (path.startsWith('/admin') && path !== '/admin') {
    const token = req.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')
      await jwtVerify(token, secret)
    } catch {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
