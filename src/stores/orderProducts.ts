
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICart } from '@/domain/ICart'
import type { IOrderProduct } from '@/domain/IOrderProduct'


export const useOrderProductsStore = defineStore({
  id: "orderproducts",
  state: () => ({
    orderProducts: [
    ] as IOrderProduct[],
    orderProduct: null as IOrderProduct | null,
  }),


  getters: {
  },
  actions: {}
})
