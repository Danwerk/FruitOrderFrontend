<template>
    <h1>Create</h1>

    <h4>ProductType</h4>
    <hr />


    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="Name">Name</label>
                <input v-model="name" class="form-control" type="text" id="Name" maxlength="512" name="Name" />
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input v-model="isActive" class="form-check-input" type="checkbox" id="IsActive" name="IsActive" />
                    IsActive
                </label>
            </div>
            <div class="form-group">
                <label class="control-label" for="CreatedAt">CreatedAt</label>
                <input v-model="createdAt" class="form-control" type="datetime-local" id="CreatedAt" name="CreatedAt" />
            </div>


            <div class="form-group">
                <input @click="Create()" type="submit" value="Create" class="btn btn-primary" />
            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/ProductTypes">Back to List</RouterLink>
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
    props: {},
    emits: []
})
export default class ProductTypesCreate extends Vue {
    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    identityStore = useIdentityStore();

    id!: string;
    name!: string;
    createdAt!: string;
    isActive!: boolean;

    errorMessage: string | null = null;

    async mounted(): Promise<void> {
        if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
            router.push({ name: "home" });
        }
    }

    async Create(): Promise<void> {
        if (this.name) {
            var res = await this.productTypesService.add({
                name: this.name,
                createdAt: this.createdAt,
                isActive: this.isActive

            })
        }
        router.push("/productTypes")
    }
}
</script>