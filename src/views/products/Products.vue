<template>
    <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button"
        class="btn">
        Back To Dashboard</RouterLink>
    <br>
    <br>
    <h1>Products</h1>

    <p>
        <RouterLink :to="{ name: 'productscreate' }">Create</RouterLink>

    </p>
    <table class="table">
        <thead>
            <tr>
                <th>
                    Image
                </th>
                <th>
                    Name
                </th>
                <th>
                    Description
                </th>
                <th>
                    Quantity
                </th>
                <th>
                    Unit
                </th>
                <th>
                    ProductType
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product of productsStore.products" :key="product.id">
                <td>
                    {{ product.image }}
                </td>
                <td>
                    {{ product.name }}
                </td>
                <td>
                    {{ product.description }}
                </td>
                <td>
                    {{ product.quantity }}
                </td>
                <td>
                    {{ unitsStore.getUnitById(product.unitId)?.unitName }}
                </td>
                <td>
                    {{ productTypesStore.getProductTypeById(product.productTypeId)?.name }}
                </td>
                <td>
                    <RouterLink :to="{ name: 'productsedit', params: { id: product.id } }">Edit</RouterLink> |
                    <RouterLink :to="{ name: 'productsdelete', params: { id: product.id } }">Delete</RouterLink>

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
import { useIdentityStore } from '@/stores/identity';
import { IdentityService } from '@/services/IdentityService';
import router from '@/router';


@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Products extends Vue {
    productsStore = useProductsStore();
    productsService = new ProductService();

    unitsStore = useUnitStore();
    unitsService = new UnitService();

    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    identityStore = useIdentityStore();

    get isAdmin(): boolean | undefined {
        return this.identityStore.isAdmin;
    }

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }

            this.productsStore.$state.products =
                await this.productsService.getAll();

            this.unitsStore.$state.units = await this.unitsService.getAll();
            this.productTypesStore.$state.productTypes = await this.productTypesService.getAll();

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }
}
</script>