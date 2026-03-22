/**
 * Environment variable validation — fails fast at startup if anything is missing.
 * Import this in lib/prisma.ts and lib/razorpay.ts to trigger on boot.
 */

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
] as const

if (typeof window === 'undefined') {
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`[env] Missing required environment variable: ${key}`)
    }
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID!,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET!,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
}
