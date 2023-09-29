<template>
    <template v-if="identityStore.isAdmin === true">
        <div style="background-color: white; margin: 5px;" class="content">
            <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button" class="btn">
            Back To Dashboard</RouterLink>
            <br>
            <br>
            <h1>Carts</h1>

            
            <div>

            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>
                            TotalPrice
                        </th>
                        <th>
                            totalPriceIncludingVat
                        </th>
                        <th>
                            AppUserId
                        </th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart of cartsStore.carts" :key="cart.id">
                        <td>
                            {{ cart.totalPrice }}
                        </td>

                        <td>
                            {{ cart.totalPriceIncludingVat }}
                        </td>


                        <td>
                            {{ cart.appUserId }}
                        </td>
                        <td>
                            <RouterLink :to="{ name: 'cartsdetail', params: { id: cart.id } }">Details</RouterLink> |
                            <RouterLink :to="{ name: 'cartsdelete', params: { id: cart.id } }">Delete</RouterLink>

                        </td>
                    </tr>
                </tbody>
            </table>
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
import { CartService } from "@/services/CartService";
import { IdentityService } from '@/services/IdentityService';
import { useIdentityStore } from '@/stores/identity';

@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Carts extends Vue {


    cartsStore = useCartsStore();
    cartsService = new CartService();

    identityService = new IdentityService();
    identityStore = useIdentityStore();



    async mounted(): Promise<void> {
        try {
            console.log("mounted");
         

            this.cartsStore.$state.carts =
                await this.cartsService.getAll();

        } catch (e) {
            console.error(`Error retrieving cart data: ${e}`)
        }
    }


}
</script>

<style></style>
      