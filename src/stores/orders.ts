import { defineStore } from 'pinia'
import type { ICart } from '@/domain/ICart'
import type { IOrder } from '@/domain/IOrder'

export const useOrdersStore = defineStore({
  id: "orders",
  state: () => ({
    orders: [
    ] as IOrder[],
    order: null as IOrder | null,
    orderId: null as string | null | undefined,
    
  }),


  getters: {
    cartCount: (state) => state.orders.length,
  },

  
  actions: {}
})
