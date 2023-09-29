<template>
    <h1>Edit {{ id }}</h1>

    <h4>Product</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="Image">Image</label>
                <input v-model="image" class="form-control" type="text" id="Image" name="Image" />
            </div>
            <div class="form-group">
                <label class="control-label" for="Name">Name</label>
                <input v-model="name" class="form-control" type="text" id="Name" maxlength="512" name="Name" />
            </div>
            <div class="form-group">
                <label class="control-label" for="Description">Description</label>
                <input v-model="description" class="form-control" type="text" id="Description" maxlength="4096"
                    name="Description" />
            </div>
            <div class="form-group">
                <label class="control-label" for="Quantity">Quantity</label>
                <input v-model="quantity" class="form-control" type="number" id="Quantity" name="Quantity" />
            </div>
            <div class="form-group">
                <label class="control-label" for="UnitId">UnitId</label>
                <select class="form-control" id="UnitId" name="UnitId" v-model="unitId">
                    <option v-for="unit of unitsStore.units" :key="unit.id" :value="unit.id">{{ unit.unitName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label class="control-label" for="ProductTypeId">ProductTypeId</label>
                <select class="form-control" id="ProductTypeId" name="ProductTypeId" v-model="productTypeId">
                    <option v-for="productType of productTypesStore.productTypes" :key="productType.id"
                        :value="productType.id">{{ productType.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <input @click="Update()" type="submit" value="Save" class="btn btn-primary" />
            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/Products">Back to List</RouterLink>
    </div>
</template>
   

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useUnitStore } from '@/stores/units';
import { UnitService } from "@/services/UnitService";
import router from '@/router';
import { ProductService } from '@/services/ProductService';
import { useProductsStore } from '@/stores/products';
import { ProductTypeService } from '@/services/ProductTypeService';
import { useProductTypesStore } from '@/stores/productTypes';
import { useIdentityStore } from '@/stores/identity';


@Options({
    components: {
    },
    props: {
        id: String,
    },
    emits: [],

})
export default class ProductsEdit extends Vue {
    unitsStore = useUnitStore();
    unitsService = new UnitService();

    productsStore = useProductsStore();
    productsService = new ProductService();

    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    identityStore = useIdentityStore();

    id!: string;
    image: string = '';
    name!: string;
    description!: string;
    quantity!: number
    unitId: string = "";
    productTypeId: string = "";

    errorMessage: string | null = null;

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }

            var product = await this.productsService.get(this.id);
            this.productsStore.$state.product = product
            this.image = product.image;
            this.name = product.name;
            this.description = product.description;
            this.quantity = product.quantity;
            this.unitId = product.unitId;
            this.productTypeId = product.productTypeId;

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }

    async Update(): Promise<void> {
        if (this.id, this.image && this.name && this.name && this.description && this.quantity && this.unitId && this.productTypeId) {
            var res = await this.productsService.put(this.id, {
                id: this.id,
                image: this.image,
                name: this.name,
                description: this.description,
                quantity: this.quantity,
                unitId: this.unitId,
                productTypeId: this.productTypeId
            })
            router.push("/products")
        }
    }
}
</script>