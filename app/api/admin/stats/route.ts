import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalOrders, totalProducts, pendingOrders, totalRevenue] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'paid' } }),
    ])
    return NextResponse.json({ totalOrders, totalProducts, pendingOrders, totalRevenue: totalRevenue._sum.total || 0 })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
