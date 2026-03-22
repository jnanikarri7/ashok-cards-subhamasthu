export const runtime = 'nodejs'
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
      guestName: true,
      status: true,
      paymentStatus: true,
      total: true,
      estimatedDays: true,
      createdAt: true,
      updatedAt: true,
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
