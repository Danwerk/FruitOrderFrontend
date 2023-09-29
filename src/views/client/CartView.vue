<template>
  <section class="h-100 h-custom" style="background-color: #17090d;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-3">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 class="mb-0 text-muted">{{ cartProductsStore.cartProducts.length }} items</h6>
                    </div>

                    <hr class="my-4">

                    <div v-for="cartProduct of cartProductsStore.cartProducts" :key="cartProduct.id"
                      class="row mb-4 d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img :src=productsStore.getProductById(cartProduct.productId!)?.image class="img-fluid rounded-3"
                          alt="">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">{{ productsStore.getProductById(cartProduct.productId!)?.name }}</h6>
                        <h6 class="text-black mb-0">{{
                          unitsStore.getUnitById(productsStore.getProductById(cartProduct.productId!)?.unitId!)?.unitName
                        }}</h6>
                      </div>

                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">


                        <button class="btn btn-link px-2">
                          <i class="fa fa-minus" style="color: #17090d;" @click="decrement(cartProduct.id!)"></i>

                        </button>

                        <input id="form1" min="1" name="quantity" :value=cartProduct.quantity
                          class="form-control form-control-sm" />

                        <button class="btn btn-link px-2">
                          <i class="fa fa-plus" style="color: #17090d" @click="increment(cartProduct.id!)"></i>
                        </button>

                      </div>



                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">€ {{ cartProduct.price }}</h6>

                      </div>

                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a @click.prevent="DeleteCartProduct(cartProduct)"
                          style="background-color: red; border-style: none;" class="btn btn-primary btn-sm rounded-0"><i
                            class="fa fa-trash"></i></a>
                      </div>
                    </div>
                    <hr class="my-4">

                    <div class="pt-5">
                      <h6 class="mb-0" style="margin-top: 455px;">
                        <RouterLink to="/Shop" class="text-body">Back to List</RouterLink>
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr class="my-4">

                    <div class="d-flex justify-content-between mb-4" style="padding-bottom: 55px;">
                      <h5 class="text-uppercase">items {{ cartProductsStore.cartProducts.length }}</h5>
                      <h5>€ {{ cartProductsStore.cartProductsTotal.toFixed(2) }}</h5>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">VAT 20% </h5>
                      <h5>€ {{ cartsStore.VAT }}</h5>
                    </div>

                    <!-- <h5 class="text-uppercase mb-3">Shipping</h5>

                    <div class="mb-4 pb-2">
                      <select class="select">
                        <option value="1">Standard-Delivery- €5.00</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                      </select>
                    </div> -->

                    <!-- <h5 class="text-uppercase mb-3">Give code</h5>

                    <div class="mb-5">
                      <div class="form-outline">
                        <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                        <label class="form-label" for="form3Examplea2">Enter your code</label>
                      </div>
                    </div> -->

                    <hr class="my-4">

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Total price</h5>
                      <h5>€ {{ cartsStore.cart?.totalPriceIncludingVat?.toFixed(2) }}</h5>
                    </div>
                    <div>
                      <button @click="ClearCart(cartsStore.cart?.id!)" style="margin: 10px;" type="button"
                        class="btn btn-danger btn-block btn-lg" data-mdb-ripple-color="dark">Clear cart</button>

                      <RouterLink to="/OrderView" class="btn btn-warning btn-block btn-lg">Place an Order</RouterLink>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
    
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { CartService } from '@/services/CartService';
import { useCartsStore } from '@/stores/carts';
import { useCartProductsStore } from '@/stores/cartProducts';
import { CartProductService } from '@/services/CartProductService';
import { ProductService } from '@/services/ProductService';
import { useProductsStore } from '@/stores/products';
import { useUnitStore } from '@/stores/units';
import { UnitService } from '@/services/UnitService';
import type { ICartProduct } from '@/domain/ICartProduct';
import type { ICart } from '@/domain/ICart';
import { useIdentityStore } from '@/stores/identity';
import router from '@/router';

@Options({
  components: {},
  props: {},
  emits: [],


  watch: {
    cartProducts: function () {
      console.log(this.forceUpdate())
    },
  },
})
export default class CartView extends Vue {

  errors: [string] | null = null;

  quantity: number = 0;

  cartsStore = useCartsStore();
  cartsService = new CartService();

  productsStore = useProductsStore();
  productsService = new ProductService();

  cartProductsService = new CartProductService()
  cartProductsStore = useCartProductsStore();

  unitsService = new UnitService()
  unitsStore = useUnitStore();

  identityStore = useIdentityStore();




  async mounted(): Promise<void> {

    try {
      if (!this.identityStore.isAuthorized) {
        router.push({ name: "home" });
      }
      this.productsStore.$state.products =
        await this.productsService.getAll();

      this.cartProductsStore.$state.cartProducts =
        await this.cartProductsService.getAll();

      this.unitsStore.$state.units =
        await this.unitsService.getAll()

    } catch (e) {
      console.error(`Error retrieving cartproducts data: ${e}`)
    }
  }


  async DeleteCartProduct(cProduct: ICartProduct) {
    if (cProduct.id != null) {
      this.$forceUpdate();
      await this.cartProductsService.delete(cProduct.id);
      this.cartProductsStore.$state.cartProducts = this.cartProductsStore.$state.cartProducts.filter(cp => cp.id !== cProduct.id);
      this.cartsStore.$state.cart = await this.cartsService.get(cProduct.cartId);


      var cart = await this.cartsService.get(cProduct.cartId)
      // update cart in store and db
      if (cart != null && cart.id) {
        cart.totalPrice = this.cartProductsStore.cartProductsTotal
        await this.cartsService.put(cart.id, cart)
        this.cartsStore.$state.cart = await this.cartsService.get(cart.id)
      }
    }

  }

  async ClearCart(cartId: string) {
    await this.cartsService.deleteCartProducts(cartId);
    this.cartProductsStore.$state.cartProduct = null;
    this.cartProductsStore.$state.cartProducts = [];

    this.cartsStore.$state.cart = await this.cartsService.get(cartId)

    await this.updateCartInDatabase(this.cartsStore.$state.cart)
  }


  async increment(cartProductId: string) {
    var cartProduct = this.cartProductsStore.getCartProductProductById(cartProductId)

    if (cartProduct && cartProduct.quantity !== undefined) {
      cartProduct.quantity += 1;
      cartProduct.total = cartProduct.quantity * cartProduct.price;

      // update cartProductStore's cartProduct
      this.cartProductsStore.$state.cartProduct = cartProduct;

      // update cartProduct in db
      await this.cartProductsService.put(cartProduct.id, cartProduct)
      this.cartProductsStore.$state.cartProducts = await this.cartProductsService.getAll()


      this.cartsStore.$state.cart = await this.cartsService.get(cartProduct.cartId)

      await this.cartsService.put(cartProduct.cartId, this.cartsStore.$state.cart!)


      this.cartsStore.$state.cart = await this.cartsService.get(cartProduct.cartId!)

    }
  }

  async decrement(cartProductId: string) {
    var cartProduct = this.cartProductsStore.getCartProductProductById(cartProductId)

    if (cartProduct && cartProduct.quantity !== undefined) {
      if (cartProduct.quantity >= 2) {
        cartProduct.quantity -= 1;
        cartProduct.total = cartProduct.quantity * cartProduct.price

        // update cartProductStore's cartProduct
        this.cartProductsStore.$state.cartProduct = cartProduct;

        // update cartProduct in db
        await this.cartProductsService.put(cartProduct.id, cartProduct)
        this.cartProductsStore.$state.cartProducts = await this.cartProductsService.getAll()


        this.cartsStore.$state.cart = await this.cartsService.get(cartProduct.cartId)

        await this.cartsService.put(cartProduct.cartId, this.cartsStore.$state.cart!)

        /*    console.log( this.cartsStore.$state.cart!) */

        this.cartsStore.$state.cart = await this.cartsService.get(cartProduct.cartId!)

      } else {
        return;
      }
    }
  }

  async updateCartInDatabase(cart: ICart) {
    var storeCart = cart;
    if (storeCart && storeCart.totalPrice != null) {
      storeCart.totalPrice = this.cartProductsStore.cartProductsTotal;
      await this.cartsService.put(storeCart.id, storeCart)

      this.cartsStore.$state.cart = await this.cartsService.get(storeCart.id!)
    }
  }
}
</script>
      