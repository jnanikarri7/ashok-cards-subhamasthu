import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  // Strict rate limit on login: 5 attempts per 15 minutes per IP
  const ip = getClientIp(req)
  const { allowed } = rateLimit(`admin-login:${ip}`, 5, 15 * 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in 15 minutes.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
  }

  try {
    const { email, password } = parsed.data
    const admin = await prisma.admin.findUnique({ where: { email } })

    // Always run bcrypt compare to prevent timing attacks
    const dummyHash = '$2a$12$dummy.hash.to.prevent.timing.attacks.xxxxxxxxxx'
    const valid = admin
      ? await bcrypt.compare(password, admin.password)
      : await bcrypt.compare(password, dummyHash).then(() => false)

    if (!admin || !valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (err) {
    console.error('[Admin login]', err)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
