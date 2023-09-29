<template>
    <h1>Delete</h1>

    <h3>Are you sure you want to delete this?</h3>
    <div>
        <h4>Price</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">
                Value
            </dt>
            <dd class="col-sm-10">
                {{ value }}
            </dd>
            <dt class="col-sm-2">
                From
            </dt>
            <dd class="col-sm-10">
                {{ from }}
            </dd>
            <dt class="col-sm-2">
                To
            </dt>
            <dd class="col-sm-10">
                {{ to }}
            </dd>
            <dt class="col-sm-2">
                Product
            </dt>
            <dd class="col-sm-10">
                {{ productsStore.getProductById(productId)?.name }}
            </dd>
        </dl>
        <div class="form-group">
            <input @click="Delete()" type="submit" value="Delete" class="btn btn-danger" /> |
            <RouterLink to="/Prices">Back to List</RouterLink>

        </div>
    </div>
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
export default class PricesDelete extends Vue {
    identityStore = useIdentityStore();

    productsStore = useProductsStore();
    productsService = new ProductService();

    pricesStore = usePriceStore();
    pricesService = new PriceService();

    id!: string;
    value!: number;
    from: string = "";
    to: string = "";
    productId: string = "";


    async mounted(): Promise<void> {
        try {

            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }


            var price = await this.pricesService.get(this.id);
            this.value = price.value;
            this.from = price.from
            this.to = price.to;
            this.productId = price.productId;

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }

    async Delete(): Promise<void> {
        if (this.value && this.from && this.to && this.productId) {
            var res = await this.pricesService.delete(this.id);
        }
        router.push("/prices")
    }

}
</script>