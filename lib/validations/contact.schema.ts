import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number').optional().or(z.literal('')),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
})

export type ContactInput = z.infer<typeof contactSchema>
