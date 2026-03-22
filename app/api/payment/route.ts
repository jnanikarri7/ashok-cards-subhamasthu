import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json()

    // Lazy-init so build doesn't fail without env vars
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt,
    })
    return NextResponse.json(order)
  } catch (error) {
    console.error('Razorpay error:', error)
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}
