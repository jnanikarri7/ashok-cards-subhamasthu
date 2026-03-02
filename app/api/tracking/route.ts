import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const orderNumber = searchParams.get('order')

  if (!orderNumber) {
    return NextResponse.json({ error: 'Order number required' }, { status: 400 })
  }

  const order = await prisma.order.findFirst({
    where: { orderNumber: orderNumber.toUpperCase() },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      status: true,
      paymentStatus: true,
      total: true,
      trackingNumber: true,
      proofSentAt: true,
      proofApprovedAt: true,
      printingAt: true,
      shippedAt: true,
      deliveredAt: true,
      createdAt: true,
      items: {
        select: {
          quantity: true,
          product: { select: { name: true, images: true } },
          customization: true,
        },
      },
    },
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json({ order })
}
