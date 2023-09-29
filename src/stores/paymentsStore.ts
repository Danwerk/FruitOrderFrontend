import { defineStore } from 'pinia'
import type { IPayment } from '@/domain/IPayment'

export const usePaymentsStore = defineStore({
  id: "payments",
  state: () => ({
    payments: [
    ] as IPayment[],
    payment: null as IPayment | null,
    
  }),


  getters: {
    paymentCount: (state) => state.payments.length,
  },
  actions: {}
})
