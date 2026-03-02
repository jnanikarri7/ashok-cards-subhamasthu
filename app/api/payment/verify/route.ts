import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json()

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { paymentId: razorpay_payment_id, paymentStatus: 'paid' },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
