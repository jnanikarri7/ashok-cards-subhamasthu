import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartCustomization {
  brideName?: string
  groomName?: string
  brideParents?: string
  groomParents?: string
  muhurthamDate?: string
  muhurthamTime?: string
  venue?: string
  venueAddress?: string
  language?: string
  motifs?: string[]
  colorChoice?: string
  notes?: string
  customPhotoUrl?: string
  quantity?: number
  [key: string]: unknown
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  customization?: CartCustomization
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'> & { productId: string }) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
  totalCards: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              { ...item, id: `${item.productId}-${Date.now()}` },
            ],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      itemCount: () => get().items.length,

      totalCards: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'ashok-cart-v1',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)
