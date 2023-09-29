<template>
    <h1>Delete</h1>

    <h3>Are you sure you want to delete this?</h3>
    <div>
        <h4>ProductType</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">
                Name
            </dt>
            <dd class="col-sm-10">
                {{ name }}
            </dd>
            <dt class="col-sm-2">
                IsActive
            </dt>
            <dd class="col-sm-10">

                <input v-if="isActive === true" checked=true class="check-box" disabled=true type="checkbox" />
                <input v-if="isActive === false" class="check-box" disabled=true type="checkbox" />
            </dd>
            <dt class="col-sm-2">
                CreatedAt
            </dt>
            <dd class="col-sm-10">
                {{ createdAt }}
            </dd>
        </dl>

        <div class="form-group">
            <input @click="Delete()" type="submit" value="Delete" class="btn btn-danger" /> |
            <RouterLink to="/ProductTypes">Back to List</RouterLink>

        </div>
    </div>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { ProductTypeService } from '@/services/ProductTypeService';
import { useProductTypesStore } from '@/stores/productTypes';
import router from '@/router';
import { useIdentityStore } from '@/stores/identity';
@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class ProductTypesDelete extends Vue {
    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    identityStore = useIdentityStore();

    id!: string;
    name: string = '';
    isActive!: boolean;
    createdAt: string = '';

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }

            var productType = await this.productTypesService.get(this.id);
            this.productTypesStore.$state.productType = productType
            this.name = productType.name;
            this.isActive = productType.isActive
            this.createdAt = productType.createdAt
        } catch (e) {
            console.error(`Error retrieving unit data: ${e}`)
        }

    }


    async Delete(): Promise<void> {
        if (this.name) {
            var res = await this.productTypesService.delete(this.id);
            console.log(res)
        }
        router.push("/productTypes")
    }

}
</script>