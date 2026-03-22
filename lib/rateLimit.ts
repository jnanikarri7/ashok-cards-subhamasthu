/**
 * In-memory rate limiter — works on Vercel serverless (per-instance).
 * For multi-region production, swap with @upstash/ratelimit + Vercel KV.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    store.forEach((entry, key) => {
      if (now > entry.resetAt) store.delete(key)
    })
  }, 5 * 60 * 1000)
}

export function rateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now > entry.resetAt) {
    const newEntry = { count: 1, resetAt: now + windowMs }
    store.set(identifier, newEntry)
    return { allowed: true, remaining: limit - 1, resetAt: newEntry.resetAt }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}

export function getClientIp(req: Request): string {
  const forwarded = (req as any).headers?.get?.('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}
