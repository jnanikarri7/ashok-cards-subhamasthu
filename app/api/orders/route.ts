import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}
  if (status) where.status = status

  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, include: { items: { include: { product: true } } }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.order.count({ where }),
  ])
  return NextResponse.json({ orders, total, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const orderNumber = generateOrderNumber()
    const subtotal = body.items.reduce((sum: number, item: { quantity: number; pricePerCard: number }) => sum + item.quantity * item.pricePerCard, 0)
    const shipping = subtotal > 5000 ? 0 : 149
    const tax = subtotal * 0.05
    const total = subtotal + shipping + tax

    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: body.email,
        guestPhone: body.phone,
        guestName: body.name,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: body.shippingAddress || {},
        customization: body.customization || {},
        notes: body.notes,
        items: {
          create: body.items.map((item: { productId: string; quantity: number; pricePerCard: number; customization?: unknown }) => ({
            productId: item.productId,
            quantity: item.quantity,
            pricePerCard: item.pricePerCard,
            totalPrice: item.quantity * item.pricePerCard,
            customization: item.customization || {},
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail({
        orderNumber: order.orderNumber,
        customerName: body.name || 'Valued Customer',
        email: body.email,
        total: order.total,
        items: order.items.map(i => ({ name: i.product.name, quantity: i.quantity, price: i.totalPrice })),
      })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
