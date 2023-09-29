import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IPrice } from '@/domain/IPrice';


export const usePriceStore = defineStore({
    id: "prices",
    state: () => ({
        prices: [
        ] as IPrice[],
        price: null as IPrice | null,


    }),

    getters: {
        priceCount: (state) => state.prices.length,

        getPriceById: (state) => {
            return (priceId: string) =>
                state.prices.find((price) =>
                    price.id === priceId)
        },

    },
    actions: {
    }
})
