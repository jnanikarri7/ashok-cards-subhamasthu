export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature')

  if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

  if (expected !== signature) {
    console.warn('[Webhook] Invalid Razorpay signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event: Record<string, unknown>
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.event === 'payment.captured') {
    const payment = (event as any).payload?.payment?.entity
    if (payment?.notes?.orderId) {
      await prisma.order.update({
        where: { id: payment.notes.orderId },
        data: { paymentStatus: 'paid', paymentId: payment.id },
      }).catch((err: unknown) => console.error('[Webhook] DB update failed:', err))
    }
  }

  return NextResponse.json({ received: true })
}
