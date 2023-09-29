<template>
        <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button"
            class="btn">
            Back To Dashboard</RouterLink>
        <br>
        <br>
        <h1>Prices</h1>

        <p>
            <RouterLink :to="{ name: 'pricescreate' }">Create</RouterLink>
            <br>

        </p>

        <table class="table">
            <thead>
                <tr>
                    <th>
                        Value
                    </th>
                    <th>
                        From
                    </th>
                    <th>
                        To
                    </th>
                    <th>
                        ProductName
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="price of pricesStore.prices" :key="price.id">
                <tr>
                    <td>
                        {{ price.value }}
                    </td>
                    <td>
                        {{ price.from }}
                    </td>
                    <td>
                        {{ price.to }}
                    </td>
                    <td>
                        {{ productsStore.getProductById(price.productId)?.name }}
                    </td>
                    <td>
                        <RouterLink :to="{ name: 'pricesedit', params: { id: price.id } }">Edit</RouterLink> |
                        <RouterLink :to="{ name: 'pricesdelete', params: { id: price.id } }">Delete</RouterLink>
                    </td>
                </tr>

            </tbody>
        </table>
   
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useProductsStore } from '@/stores/products';
import { ProductService } from "@/services/ProductService";
import { UnitService } from '@/services/UnitService';
import { useUnitStore } from '@/stores/units';
import { useProductTypesStore } from '@/stores/productTypes';
import { ProductTypeService } from '@/services/ProductTypeService';
import { usePriceStore } from '@/stores/prices';
import { PriceService } from '@/services/PriceService';
import { useIdentityStore } from '@/stores/identity';
import router from '@/router';


@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Prices extends Vue {
    productsStore = useProductsStore();
    productsService = new ProductService();

    identityStore = useIdentityStore();

    pricesStore = usePriceStore();
    pricesService = new PriceService();


    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }
            this.productsStore.$state.products =
                await this.productsService.getAll();

            this.pricesStore.$state.prices = await this.pricesService.getAll();

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }
}
</script>