
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICart } from '@/domain/ICart'
import { CartService } from '@/services/CartService';
import type { ICartProduct } from '@/domain/ICartProduct';


export const useCartProductsStore = defineStore({
  id: "cartproducts",
  state: () => ({
    cartProducts: [
    ] as ICartProduct[],
    cartProduct: null as ICartProduct | null,
  }),


  getters: {
    cartproductsCount: (state) => state.cartProducts.length,

    getCartProductProductById: (state) => {
      return (cartProductId: string) => 
      state.cartProducts.find((cartProduct) => 
      cartProduct.id === cartProductId)
     },
     cartProductsTotal: (state) => {
        
        return state.cartProducts.reduce((total, cartProduct) => {
            return total + cartProduct.total;
        }, 0)
     }
     
    
    
  },
  actions: {
   /*  add(cart: ICart) {
      this.carts.push(cart);
    }, */
    
  }
})
