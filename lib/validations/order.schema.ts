import { z } from 'zod'

export const createOrderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  shippingAddress: z.object({
    name: z.string().optional(),
    address: z.string().min(5, 'Address too short'),
    city: z.string().min(2),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
    state: z.string().min(2),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(50, 'Minimum 50 cards').max(10000),
        pricePerCard: z.number().positive().max(1000),
        customization: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .min(1, 'At least one item required'),
  notes: z.string().max(1000).optional(),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
