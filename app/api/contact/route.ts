export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'
import { contactSchema } from '@/lib/validations/contact.schema'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const { allowed } = rateLimit(`contact:${ip}`, 3, 60_000)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    await sendContactNotification(parsed.data)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact] Email failed:', err)
    // Still return success to user — don't expose email errors
    return NextResponse.json({ success: true })
  }
}
