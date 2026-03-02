import Razorpay from 'razorpay'
import crypto from 'crypto'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function createRazorpayOrder(amount: number, orderId: string) {
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // amount in paise
    currency: 'INR',
    receipt: orderId,
    notes: {
      source: 'ashok-cards-website',
    },
  })
  return order
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + '|' + paymentId
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex')
  return expectedSignature === signature
}
