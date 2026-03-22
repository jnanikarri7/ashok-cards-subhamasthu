export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendStatusUpdateEmail } from '@/lib/email'
import { ORDER_STATUS_LABELS } from '@/lib/utils'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    })

    // Send status update email
    const email = order.guestEmail
    if (email) {
      await sendStatusUpdateEmail({
        orderNumber: order.orderNumber,
        customerName: order.guestName || 'Valued Customer',
        email,
        status,
        statusLabel: ORDER_STATUS_LABELS[status] || status,
      }).catch(console.error)
    }

    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
