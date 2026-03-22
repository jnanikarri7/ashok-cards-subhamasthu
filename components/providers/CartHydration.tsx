'use client'
import { useEffect } from 'react'
import { useCartStore } from '@/lib/store'

/**
 * Rehydrates the Zustand cart from localStorage on mount.
 * Must be a client component rendered inside the root layout.
 */
export default function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return null
}
