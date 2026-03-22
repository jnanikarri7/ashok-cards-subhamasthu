/**
 * Environment variable validation.
 * Only DATABASE_URL and JWT_SECRET are hard-required at startup.
 * Payment and email vars are validated lazily in their respective routes.
 */

if (typeof window === 'undefined') {
  const hardRequired = ['DATABASE_URL', 'JWT_SECRET'] as const
  for (const key of hardRequired) {
    if (!process.env[key]) {
      throw new Error(`[env] Missing required environment variable: ${key}`)
    }
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ?? '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ?? '',
  SMTP_HOST: process.env.SMTP_HOST ?? '',
  SMTP_USER: process.env.SMTP_USER ?? '',
  SMTP_PASS: process.env.SMTP_PASS ?? '',
  SMTP_PORT: process.env.SMTP_PORT ?? '587',
  SMTP_FROM: process.env.SMTP_FROM ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '',
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
}
