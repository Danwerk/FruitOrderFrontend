import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/domain/IProduct';

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    products: [
    ] as IProduct[],
    product: null as IProduct | null,
  }),


  getters: {
    getProductById: (state) => {
      return (productId: string) => 
      state.products.find((product) => 
      product.id === productId)
   },
   productCount: (state) => state.products.length,
    
 
  },
  actions: {
    add(cart: IProduct) {
      this.products.push(cart);
    },
    

  }
})
