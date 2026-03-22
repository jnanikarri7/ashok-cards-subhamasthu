export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (from || to) {
    where.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    }
  }

  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const rows = [
    'Order#,Customer,Email,Phone,Items,Subtotal,Shipping,Tax,Total,Status,Payment,Date',
    ...orders.map((o) => {
      const itemsSummary = o.items
        .map((i) => `${i.product.name} x${i.quantity}`)
        .join(' | ')
      return [
        o.orderNumber,
        o.guestName ?? '',
        o.guestEmail ?? '',
        o.guestPhone ?? '',
        `"${itemsSummary}"`,
        o.subtotal.toFixed(2),
        o.shipping.toFixed(2),
        o.tax.toFixed(2),
        o.total.toFixed(2),
        o.status,
        o.paymentStatus,
        new Date(o.createdAt).toLocaleDateString('en-IN'),
      ].join(',')
    }),
  ].join('\n')

  return new NextResponse(rows, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="orders-${Date.now()}.csv"`,
    },
  })
}
