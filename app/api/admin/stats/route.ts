import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [totalOrders, totalProducts, pendingOrders, totalRevenue] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'paid' },
      }),
    ])

    return NextResponse.json({
      totalOrders,
      totalProducts,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total ?? 0,
    })
  } catch (err) {
    console.error('[Admin stats]', err)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
