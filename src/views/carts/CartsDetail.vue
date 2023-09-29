<template>
    <template v-if="identityStore.isAdmin === true">
        CartsDetail
        <div style="background-color: white; margin: 5px;" class="content">
            <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button" class="btn">
            Back To Dashboard</RouterLink>
            <br>
            <br>
            <h1>Carts</h1>
        </div>
    </template>
    <template v-else>
        <div style="height: 50px;"></div>
    </template>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useCartsStore } from '@/stores/carts';
import router from '@/router';
import { CartService } from '@/services/CartService';
import { useIdentityStore } from '@/stores/identity';

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class CartsDetail extends Vue {
    id!: string

    cartsStore = useCartsStore();
    cartService = new CartService();

    identityStore = useIdentityStore();



    async mounted(): Promise<void> {
        try {
            var cart = await this.cartService.get(this.id);
            this.cartsStore.$state.cart = cart

        } catch (e) {
            console.error(`Error retrieving cart data: ${e}`)
        }

    }

}
</script>