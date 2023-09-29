import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICart } from '@/domain/ICart'
import { CartService } from '@/services/CartService';


export const useCartsStore = defineStore({
  id: "carts",
  state: () => ({
    carts: [
    ] as ICart[],
    cart: null as ICart | null,
  }),


  getters: {
    cartCount: (state) => state.carts.length,
    VAT: (state) => (state.cart?.totalPrice! * 0.2).toFixed(2),
    deliveryPrice: (state) => (state.cart && state.cart.totalPrice > 25 ? 0 : 5),
    
    
    
  },
  actions: {
    setCart(cart: ICart) {
      this.cart = cart;
    },

    setCarts(carts: ICart[]) {
      this.carts = carts;
    }
   /*  add(cart: ICart) {
      this.carts.push(cart);
    }, */
    
  }
})
