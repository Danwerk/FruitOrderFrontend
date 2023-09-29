<template>
    <div v-if="errors != null" class="text-danger validation-summary-errors error-block" data-valmsg-summary="true">
        <ul v-for="error of errors">
            <li>{{ error }}</li>
        </ul>
    </div>

    <div class="container-fluid" style="background-color: #17090d;">
        <div class="row justify-content-center">

            <div class="col-lg-3 col-md-4 col-sm-6 mb-4" v-for="product of productsStore.products" :key="product.id">

                <div class="card h-100">
                    <div v-if="product.activeDiscount" class="product-badge border-default text-body"
                        style="border-radius: 5px; width: 70px; background-color: #21bd4a;">{{ product.activeDiscount }}%OFF
                    </div>
                    <img class="card-img-top" :src="product.image" alt="Card image cap">
                    <div class="card-body d-flex flex-column justify-content-end text-center" style="height: 200px; ">
                        <h3 class="card-title " style="text-transform: uppercase; font-family: cambria; color: #7d6c20;">{{
                            product.name }}</h3>
                        <p class="card-text " style=" font-family: cambria; color: #574b15; ">{{
                            productTypesStore.getProductTypeById(product.productTypeId)?.name }}</p>
                        <p class="card-text" style="font-family: cambria; color: #846f0e; text-transform: uppercase ">{{
                            product.description }}</p>
                        <h4 class="card-text">
                            <span v-if="product.priceBeforeDiscounting" class="crossed-out">{{
                                product.priceBeforeDiscounting
                            }}€</span>
                            {{ product.activePrice }}€ /
                            {{ unitsStore.getUnitById(productsStore.getProductById(product.id!)?.unitId!)?.unitName }}
                        </h4>

                        <a @click.prevent="AddToCart(product)" class="btn cart px-auto btn-warning btn-block btn-lg ">ADD
                            TO CART</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useProductsStore } from '@/stores/products';
import { ProductService } from "@/services/ProductService";
import { IdentityService } from "@/services/IdentityService";
import { useIdentityStore } from '@/stores/identity';
import { useProductTypesStore } from '@/stores/productTypes';
import { ProductTypeService } from "@/services/ProductTypeService";
import type { IProduct } from '@/domain/IProduct';
import { useCartsStore } from '@/stores/carts';
import { CartService } from '@/services/CartService';
import type { ICartProduct } from '@/domain/ICartProduct';
import { CartProductService } from '@/services/CartProductService';
import { UnitService } from '@/services/UnitService';
import { useUnitStore } from '@/stores/units';
import { useCartProductsStore } from '@/stores/cartProducts';

@Options({

    components: {
    },
    props: {
        productTypeId: String
    },
    emits: [],
})
export default class ShopView extends Vue {

    errors: string[] | null = null;

    productsStore = useProductsStore();
    productsService = new ProductService();

    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    cartsStore = useCartsStore();
    cartsService = new CartService();

    unitsService = new UnitService()
    unitsStore = useUnitStore();

    cartProductsService = new CartProductService()
    cartProductsStore = useCartProductsStore();

    identityStore = useIdentityStore()


    id!: string;
    quantity!: number;
    price!: number;
    total!: number
    discount!: number;
    productId: string = "";
    cartId: string = "";


    async mounted(): Promise<void> {
        try {
            // Active product price and active discount is calculate on backend.
            this.productsStore.$state.products =
                await this.productsService.getAll();

            this.productTypesStore.$state.productTypes =
                await this.productTypesStore.getProductTypes();

            this.unitsStore.$state.units =
                await this.unitsService.getAll()


           /*  console.log("isAdmin" + ' ' + this.identityStore.isAdmin) */


        } catch (e) {
            console.error(`Error retrieving cart data: ${e}`)
        }
    }

    async AddToCart(product: IProduct) {
        this.errors = null
        console.log(this.errors)
        if (this.identityStore.isAuthorized) {
            var carts = await this.cartsService.getAll();
            this.cartsStore.$state.carts = carts;
            if (product.activePrice == null) {
                this.errors = ["This product is currently unavailable"];
                return;
            }

            if (carts.length === 0) {
                var userCart = await this.cartsService.add({
                    totalPrice: 0,
                })
                this.cartsStore.$state.carts = await this.cartsService.getAll();
                this.cartsStore.$state.cart = this.cartsStore.$state.carts[0]


                // if there is already cart for that user, don't do new one, use existing 
            } else if (carts.length === 1) {
                this.cartsStore.$state.cart = carts[0];
            }

            var cart = this.cartsStore.$state.cart;

            var cp = cart!.cartProducts?.find(cpr => cpr.productId === product.id)

            if (cp) {
                cp.quantity += 1;
                cp.total = cp.quantity * cp.price
                // todo: implement product discount
                await this.cartProductsService.put(cp?.id, cp!)
                this.cartProductsStore.$state.cartProducts = cart?.cartProducts || [];

            } else {
                var cartProduct: ICartProduct = {
                    productId: product.id,
                    cartId: cart!.id!,
                    quantity: 1,
                    discount: 0,
                    price: product.activePrice!,
                    total: product.activePrice!
                }
                await this.cartProductsService.add(cartProduct);

            }
            this.cartProductsStore.$state.cartProducts = await this.cartProductsService.getAll();

            // update cart in store and db
            if (cart != null && cart.id) {
                cart.totalPrice = this.cartProductsStore.cartProductsTotal
                await this.cartsService.put(cart.id, cart)
                this.cartsStore.$state.cart = await this.cartsService.get(cart.id)
            }

        } else {
            this.errors = ["Unauthorized! You need to be logged in to add items to your cart."];
        }

        setTimeout(() => {
            this.errors = null;
        }, 4000);
    }

}

</script>
  

<style>
.container-fluid {
    max-width: 1800px;
    margin: 0 auto;
    padding: 10px;
}

.error-block {

    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    border: 1px solid red;
    background-color: #ffe6e6;
    z-index: 999;
    opacity: 1;
    animation: fadeOut 4s forwards;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        display: none;
    }
}




.crossed-out {
    text-decoration: line-through;
    color: #999999;
    margin-right: 10px;
}



</style>