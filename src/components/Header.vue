<template>
    <header style="background-color: rgb(255, 255, 255); ">
        <nav class="container navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container">
                        <div class="navbar-brand-container"
                            style="background-color: #17090d; padding: 12px; border-radius: 0px 170px 30px 130px;">
                            <a class="navbar-brand" style="color: rgb(187, 137, 137); font-size: 24px;"
                                href="/">FruitOrder</a>
                        </div>
                    </div>
                </nav>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li v-if="isAdmin === false" class="nav-item">
                            <RouterLink to="/" class="nav-link text-dark" active-class="active">Home</RouterLink>
                        </li>
                        <li v-if="isAdmin === false" class="nav-item">
                            <RouterLink to="/About" class="nav-link text-dark" active-class="active">About</RouterLink>
                        </li>
                        <li v-if="isAdmin === false" class="nav-item">
                            <RouterLink to="/Shop" class="nav-link text-dark" active-class="active">Shop</RouterLink>
                        </li>
                        <li v-if="isAdmin === false" class="nav-item">
                            <RouterLink to="/Contact" class="nav-link text-dark" active-class="active">Contact</RouterLink>
                        </li>

                        <li v-if="isAdmin === false && isAuthorized === true" class="nav-item">
                            <RouterLink to="/CartView" class="nav-link text-dark" active-class="active">MyCart<span v-if="cartProductsQuantity > 0" class="cart-product-quantity">{{ cartProductsQuantity }}</span></RouterLink>
                        </li>
                        <li v-if="isAdmin === false && isAuthorized === true" class="nav-item">
                            <RouterLink to="/MyOrdersView" class="nav-link text-dark" active-class="active">MyOrders</RouterLink>
                        </li>

                        <li v-if="isAdmin === true" class="nav-item">
                            <RouterLink to="/Dashboard" class="nav-link text-dark" active-class="active">Dashboard
                            </RouterLink>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link text-dark" href="/Home/Privacy">Privacy</a>
                        </li> -->
                    </ul>

                    <ul class="navbar-nav">
                        <template v-if="identityStore.$state.jwt == null">
                            <li class="nav-item">
                                <RouterLink to="/identity/account/register" class="nav-link text-dark"
                                    active-class="active">
                                    Register</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/identity/account/login" class="nav-link text-dark" active-class="active">
                                    Login</RouterLink>

                            </li>
                        </template>
                        <template v-else>
                            <RouterLink to="/" @click="logoutClicked()" class="nav-link text-dark" active-class="active">
                                Logout</RouterLink>
                        </template>

                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>


<script lang="ts">
import { CartProductService } from '@/services/CartProductService';
import { IdentityService } from '@/services/IdentityService';
import { useCartProductsStore } from '@/stores/cartProducts';
import { useCartsStore } from '@/stores/carts';
import { useIdentityStore } from '@/stores/identity';
import { Options, Vue } from 'vue-class-component';
import { RouterLink } from 'vue-router';
@Options({
    components: {
    }
})

export default class Header extends Vue {
    cartsStore = useCartsStore();
    identityStore = useIdentityStore();
    identityService = new IdentityService();
    cartProductsStore = useCartProductsStore();
    cartProductService = new CartProductService();

    async logoutClicked(): Promise<void> {
        this.identityService.logout();
    }


    get isAdmin(): boolean | undefined {
        return this.identityStore.isAdmin;
    }

    get isAuthorized(): boolean | undefined {
        return this.identityStore.isAuthorized;
    }
    get cartProductsQuantity(): number {
    return this.cartProductsStore.cartProducts.length;
  }


}
</script>

<style>

.cart-product-quantity {
  display: inline-block;
  background-color: orange;
  color: white;
  font-size: 13px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  margin-left: 5px;
  line-height: 18px;
}
</style>