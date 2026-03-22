import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { sendOrderConfirmationEmail } from '@/lib/email'
import type { CreateOrderInput } from '@/lib/validations/order.schema'

export async function createOrder(data: CreateOrderInput) {
  // Server-side price validation — never trust client prices
  const productIds = data.items.map((i) => i.productId)
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: productIds }, inStock: true },
    select: { id: true, price: true, minQuantity: true },
  })

  const productMap = new Map(dbProducts.map((p) => [p.id, p]))

  for (const item of data.items) {
    const dbProduct = productMap.get(item.productId)
    if (!dbProduct) {
      throw new Error(`Product ${item.productId} not found or out of stock`)
    }
    if (item.quantity < dbProduct.minQuantity) {
      throw new Error(`Minimum quantity for this product is ${dbProduct.minQuantity}`)
    }
    if (item.pricePerCard > dbProduct.price * 1.2) {
      throw new Error(`Invalid price for product ${item.productId}`)
    }
  }

  const orderNumber = generateOrderNumber()
  const subtotal = data.items.reduce((s, i) => s + i.quantity * i.pricePerCard, 0)
  const shipping = subtotal > 5000 ? 0 : 149
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  const order = await prisma.order.create({
    data: {
      orderNumber,
      guestEmail: data.email,
      guestPhone: data.phone,
      guestName: data.name,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: data.shippingAddress,
      notes: data.notes,
      items: {
        create: data.items.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          pricePerCard: item.pricePerCard,
          totalPrice: item.quantity * item.pricePerCard,
          customization: (item.customization ?? {}) as object,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  })

  // Fire-and-forget — don't block the response on email
  sendOrderConfirmationEmail({
    orderNumber: order.orderNumber,
    customerName: data.name ?? 'Valued Customer',
    email: data.email,
    total: order.total,
    items: order.items.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      price: i.totalPrice,
    })),
  }).catch((err) => console.error('[Email] Order confirmation failed:', err))

  return order
}

export async function getOrderByIdentifier(identifier: string) {
  const order = await prisma.order.findFirst({
    where: {
      OR: [{ orderNumber: identifier }, { id: identifier }],
    },
    include: { items: { include: { product: true } } },
  })
  return order
}
