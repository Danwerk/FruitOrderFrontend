<template>
    <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button"
        class="btn">
        Back To Dashboard</RouterLink>
    <br>
    <br>
    <h1>Product Types</h1>

    <p>
        <RouterLink :to="{ name: 'producttypescreate' }">Create</RouterLink>

    </p>
    <table class="table">
        <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    IsActive
                </th>
                <th>
                    CreatedAt
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="productType of productTypesStore.productTypes" :key="productType.id">
                <td>
                    {{ productType.name }}
                </td>
                <td>

                    <input v-if="productType.isActive === true" checked=true class="check-box" disabled=true
                        type="checkbox" />
                    <input v-if="productType.isActive === false" class="check-box" disabled=true type="checkbox" />

                </td>
                <td>
                    {{ productType.createdAt }}
                </td>
                <td>
                    <RouterLink :to="{ name: 'producttypesedit', params: { id: productType.id } }">Edit</RouterLink> |
                    <RouterLink :to="{ name: 'producttypesdelete', params: { id: productType.id } }">Delete</RouterLink>
                </td>
            </tr>

        </tbody>
    </table>
</template>
   
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { ProductTypeService } from '@/services/ProductTypeService';
import { useProductTypesStore } from '@/stores/productTypes';
import { useIdentityStore } from '@/stores/identity';
import router from '@/router';
@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class ProductTypes extends Vue {
    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    identityStore = useIdentityStore();


    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }
            this.productTypesStore.$state.productTypes =
                await this.productTypesService.getAll();


        } catch (e) {
            console.error(`Error retrieving producttypes data: ${e}`)
        }
    }
}
</script>