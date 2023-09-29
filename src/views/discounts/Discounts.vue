<template>
     <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button"
            class="btn">
            Back To Dashboard</RouterLink>
            <br>
            <br>
    <h1>Index</h1>

    <p>
        <RouterLink :to="{ name: 'discountscreate' }">Create</RouterLink>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>
                    DiscountValue
                </th>
                <th>
                    From
                </th>
                <th>
                    To
                </th>
                <th>
                    Description
                </th>
                <th>
                    Product
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="discount of discountsStore.discounts" :key="discount.id">
                <td>
                    {{ discount.discountValue }}
                </td>
                <td>
                    {{ discount.from }}
                </td>
                <td>
                    {{ discount.to }}
                </td>
                <td>
                    {{ discount.description }}
                </td>
                <td>
                    {{ productsStore.getProductById(
                        discount.productId)?.name }}
                </td>
                <td>
                    <RouterLink :to="{ name: 'discountsedit', params: { id: discount.id } }">Edit</RouterLink> |
                    <RouterLink :to="{ name: 'discountsdelete', params: { id: discount.id } }">Delete</RouterLink>
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
import { DiscountService } from '@/services/DiscountService';
import { useIdentityStore } from '@/stores/identity';
import { IdentityService } from '@/services/IdentityService';
import router from '@/router';
import { useDiscountStore } from '@/stores/discounts';


@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Discounts extends Vue {
    productsStore = useProductsStore();

    discountsService = new DiscountService();
    discountsStore = useDiscountStore();

    identityStore = useIdentityStore();

    get isAdmin(): boolean | undefined {
        return this.identityStore.isAdmin;
    }

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }
            this.discountsStore.$state.discounts =
                await this.discountsService.getAll();

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }
}
</script>