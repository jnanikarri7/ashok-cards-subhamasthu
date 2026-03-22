import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().min(10).max(2000),
  price: z.number().positive().max(10000),
  minQuantity: z.number().int().min(1).default(50),
  images: z.array(z.string().url()).default([]),
  categoryId: z.string().min(1),
  motifs: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  paperType: z.string().max(100).optional(),
  finish: z.string().max(100).optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  sampleText: z.string().max(2000).optional(),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
