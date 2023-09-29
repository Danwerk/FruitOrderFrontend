import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IDiscount } from '@/domain/IDiscount';


export const useDiscountStore = defineStore({
    id: "discounts",
    state: () => ({
        discounts: [
        ] as IDiscount[],
        discount: null as IDiscount | null,
    }),
    getters: {
        discountCount: (state) => state.discounts.length,

        getDiscountById: (state) => {
            return (discountId: string) =>
                state.discounts.find((discount) =>
                discount.id === discountId)
        },
    },
    actions: {
    
    }
})
