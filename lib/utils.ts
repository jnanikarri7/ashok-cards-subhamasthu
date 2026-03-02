import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatPrice(price: number, perCard = false): string {
  if (perCard) return `₹${price.toFixed(2)}/card`
  return `₹${price.toLocaleString('en-IN')}`
}

export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 9000) + 1000
  return `AC${year}${month}${day}${random}`
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Order Received',
  PROOF_SENT: 'Proof Sent',
  PROOF_APPROVED: 'Proof Approved',
  PRINTING: 'Printing in Progress',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROOF_SENT: 'bg-blue-100 text-blue-800',
  PROOF_APPROVED: 'bg-purple-100 text-purple-800',
  PRINTING: 'bg-orange-100 text-orange-800',
  SHIPPED: 'bg-teal-100 text-teal-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export const MOTIFS = [
  'Ganesha', 'Kalasham', 'Lotus', 'Mango Leafs', 'Temple Gopuram',
  'Peacock', 'Kuthuvilakku', 'Kolam/Rangoli', 'Nadaswaram'
]

export const LANGUAGES = ['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'English', 'Sanskrit']
