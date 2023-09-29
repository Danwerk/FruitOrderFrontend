<template>
    <div v-if="errors != null" class="text-danger validation-summary-errors error-block" data-valmsg-summary="true">
        <ul v-for="error of errors">
            <li>{{ error }}</li>
        </ul>
    </div>
    <h1>Create</h1>

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
                <input v-model="name" class="form-control" type="text" data-val="true" id="Name" maxlength="512"
                    name="Name" />
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
                <label class="control-label" for="UnitId">Unit</label>
                <select v-model="unitId" class="form-control" id="UnitId" name="UnitId">
                    <option v-for="unit of unitsStore.units" :key="unit.id" :value="unit.id">{{ unit.unitName }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label class="control-label" for="ProductTypeId">ProductType</label>
                <select v-model="productTypeId" class="form-control" id="ProductTypeId" name="ProductTypeId">
                    <option v-for="productType of productTypesStore.productTypes" :key="productType.id"
                        :value="productType.id">{{ productType.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <input @click="Create()" type="submit" value="Create" class="btn btn-primary" />
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
import router from '@/router';
import { ProductService } from '@/services/ProductService';
import { useProductsStore } from '@/stores/products';
import { useProductTypesStore } from '@/stores/productTypes';
import { ProductTypeService } from '@/services/ProductTypeService';
import { UnitService } from '@/services/UnitService';
import { useUnitStore } from '@/stores/units';
import { useIdentityStore } from '@/stores/identity';


@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class ProductsCreate extends Vue {
    errors: string[] | null = null;

    productsStore = useProductsStore();
    productsService = new ProductService();

    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    unitsStore = useUnitStore();
    unitsService = new UnitService();

    identityStore = useIdentityStore();


    id!: string;
    image!: string;
    name!: string;
    description!: string;
    quantity!: number
    unitId: string = "";
    productTypeId: string = "";

    errorMessage: string | null = null;

    async mounted(): Promise<void> {
        if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
            router.push({ name: "home" });
        }
    }

    async Create(): Promise<void> {
        if (this.name && this.image && this.description && this.quantity && this.unitId && this.productTypeId) {
            var res = await this.productsService.add({
                image: this.image,
                name: this.name,
                description: this.description,
                quantity: this.quantity,
                unitId: this.unitId,
                productTypeId: this.productTypeId,
            })

            router.push("/products")

        }
        else {
            this.errors = ["Please fill all fields"];
        }
        setTimeout(() => {
            this.errors = null;
        }, 4000);
    }
}

</script>