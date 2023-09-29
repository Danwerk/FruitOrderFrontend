<template>
        <h1>Delete</h1>

        <h3>Are you sure you want to delete this?</h3>
        <div>
            <h4>Product</h4>
            <hr />
            <dl class="row">
                <dt class="col-sm-2">
                    Image
                </dt>
                <dd class="col-sm-10">
                    {{ image }}
                </dd>
                <dt class="col-sm-2">
                    Name
                </dt>
                <dd class="col-sm-10">
                    {{ name }}
                </dd>
                <dt class="col-sm-2">
                    Description
                </dt>
                <dd class="col-sm-10">
                    {{ description }}
                </dd>
                <dt class="col-sm-2">
                    Quantity
                </dt>
                <dd class="col-sm-10">
                    {{ quantity }}
                </dd>
                <dt class="col-sm-2">
                    Unit
                </dt>
                <dd class="col-sm-10">
                    {{ unitsStore.getUnitById(unitId)?.unitName }}
                </dd>
                <dt class="col-sm-2">
                    ProductType
                </dt>
                <dd class="col-sm-10">
                    {{ productTypesStore.getProductTypeById(productTypeId)?.name }}
                </dd>
            </dl>

            <div class="form-group">
                <input @click="Delete()" type="submit" value="Delete" class="btn btn-danger" /> |
                <RouterLink to="/Products">Back to List</RouterLink>
            </div>
        </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { UnitService } from '@/services/UnitService';
import { useUnitStore } from '@/stores/units';
import router from '@/router';
import { useProductsStore } from '@/stores/products';
import { ProductService } from '@/services/ProductService';
import { ProductTypeService } from '@/services/ProductTypeService';
import { useProductTypesStore } from '@/stores/productTypes';
import { useIdentityStore } from '@/stores/identity';

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class ProductsDelete extends Vue {
    unitsStore = useUnitStore();
    unitsService = new UnitService();

    productTypesStore = useProductTypesStore();
    productTypesService = new ProductTypeService();

    productsStore = useProductsStore();
    productsService = new ProductService();

    identityStore = useIdentityStore();

    id!: string;
    name: string = "";

    image: string = "";
    description: string = "";
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
            this.name = product.name;
            this.image = product.image;
            this.description = product.description;
            this.quantity = product.quantity;
            this.unitId = product.unitId;
            this.productTypeId = product.productTypeId;
        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }


    async Delete(): Promise<void> {
        if (this.name) {
            var res = await this.productsService.delete(this.id);
            console.log(res)
        }
        router.push("/products")
    }

}
</script>