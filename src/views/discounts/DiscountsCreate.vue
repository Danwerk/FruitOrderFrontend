<template>
    <h1>Create</h1>

    <h4>Discount</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="DiscountValue">DiscountValue</label>
                <input v-model="discountValue" class="form-control" type="number" id="DiscountValue" name="DiscountValue" />
            </div>
            <div class="form-group">
                <label class="control-label" for="From">From</label>
                <input v-model="from" class="form-control" type="datetime-local" id="From" name="From"  />
            </div>
            <div class="form-group">
                <label class="control-label" for="To">To</label>
                <input v-model="to" class="form-control" type="datetime-local" id="To" name="To" />
            </div>
            <div class="form-group">
                <label class="control-label" for="Description">Description</label>
                <input v-model="description" class="form-control" type="text" id="Description" maxlength="4096" name="Description" />
            </div>
            <div class="form-group">
                <label class="control-label" for="ProductId">ProductId</label>
                <select v-model="productId" class="form-control" id="ProductId" name="ProductId">
                    <option v-for="product of productsStore.products" :key="product.id"
                        :value="product.id">{{ product.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <input @click="Create()" type="submit" value="Create" class="btn btn-primary" />
            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/Discounts">Back to List</RouterLink>
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
import { DiscountService } from '@/services/DiscountService';


@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class DiscountsCreate extends Vue {
    productsStore = useProductsStore();
    productsService = new ProductService();

    discountsService = new DiscountService();

    identityStore = useIdentityStore();

    id!: string;
    discountValue!: number;
    from!: string;
    to!: string;
    description!: string;
    productId: string = "";

    errorMessage: string | null = null;

    async mounted(): Promise<void> {
        if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
            router.push({ name: "home" });
        }
    }

    async Create(): Promise<void> {
        if (this.discountValue && this.from && this.to && this.productId) {
            var res = await this.discountsService.add({
              discountValue: this.discountValue,
              from: this.from,
              to: this.to,
              description: this.description,
              productId: this.productId
            })

            router.push("/discounts")

        }

    }
}

</script>