<template>
  <div class="home-page">
    <div class="banner">
      <img src="../fresh-fruits-wallpaper.jpg" alt="Dark Brown Background Image">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1 style=" font-size: 67px;">Welcome to our FruitOrder Shop</h1>
        <p style="font-size: 20px;">We offer a wide selection of fresh berries and fruits</p>
      </div>
    </div>
    <div class="about-us">
      <h2>About Us</h2>
      <p>We are a family-owned fruit shop that has been serving the community for over 30 years. We pride ourselves on
        offering the freshest and highest quality fruits and berries.</p>
      <hr />
    </div>
    <div class="selling-points">
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Wide selection of fresh fruits and berries</li>
        <li>Competitive pricing</li>
        <li>Knowledgeable and friendly staff</li>
        <li>Convenient locations</li>
        <li>Online ordering and delivery options</li>
      </ul>
      <hr />
    </div>

    <div class="contact-us">
      <h2>Contact Us</h2>
      <ul>
        <li><strong>Address:</strong> Kriidi 11, Tallinn</li>
        <li><strong>Phone:</strong> +372 555 66 72</li>
        <li><strong>Email:</strong> fruit.order@gmail.com</li>
      </ul>
    </div>
  </div>
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
import { useIdentityStore } from '@/stores/identity';

@Options({
  components: {
  },
  props: {},
  emits: [],
  watch: {
    cartProducts: function () {
      console.log(this.forceUpdate())
    },
  },


})
export default class HomeView extends Vue {

  cartsStore = useCartsStore();
  cartsService = new CartService();

  productsStore = useProductsStore();
  productsService = new ProductService();

  cartProductsService = new CartProductService()
  cartProductsStore = useCartProductsStore();

  unitsService = new UnitService()
  unitsStore = useUnitStore();

  identityStore = useIdentityStore()


  async mounted(): Promise<void> {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa")
    console.log(this.identityStore.$state.jwt)
    if (this.identityStore.isAuthorized) {
      // ---------------------if some bugs, then comment this out ---------------------------
         this.cartProductsStore.$state.cartProducts = await this.cartProductsService.getAll();
      /*await this.deleteCartProducts(cartProducts);
    */
      var carts = await this.cartsService.getAll();
      this.cartsStore.$state.carts = carts;


      if (carts.length === 0) {
        var userCart = await this.cartsService.add({
          totalPrice: 0,
        })

        if (userCart.data?.id != null) {
          this.cartsStore.$state.cart = await this.cartsService.get(userCart.data?.id)
        }

      } else if (carts.length === 1) {
        this.cartsStore.$state.cart = this.cartsStore.$state.carts[0]

        var updatedCart = await this.cartsService.put(this.cartsStore.$state.cart?.id, this.cartsStore.$state.cart)
        this.cartsStore.$state.cart = await this.cartsService.get(this.cartsStore.$state.carts[0].id!)
      }

    }
  }


  async deleteCartProducts(cartProducts: ICartProduct[]): Promise<void> {
    for (const cartProduct of cartProducts) {
      // Delete the OrderProduct to the database
      if (cartProduct.id != null) {
        await this.cartProductsService.delete(cartProduct.id);

      }
    }
  }

}
</script>
      



<style>
.home-page {
  font-family: sans-serif;
  max-width: 1800px;
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 5px;
  padding-bottom: 10px;
}

.banner {
  position: relative;
  height: 600px;
  background-color: black;
}

.banner img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  background-color: black;
  filter: blur(6px);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-family: italic;
}

.about-us {
  margin-top: 50px;
  color: #d6afba;
}

.selling-points {
  margin-top: 50px;
  color: #d6afba;
}

.contact-us {
  margin-top: 50px;
  color: #d6afba;
}
</style>


 