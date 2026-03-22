import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { z } from 'zod'

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  orderId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  // Rate limit: 10 verifications per minute per IP
  const ip = getClientIp(req)
  const { allowed } = rateLimit(`payment-verify:${ip}`, 10, 60_000)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = verifySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = parsed.data

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    console.warn('[Payment] Invalid signature attempt from IP:', ip)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentId: razorpay_payment_id, paymentStatus: 'paid' },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Payment verify] DB update failed:', err)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
