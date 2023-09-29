<template>
    <h1>Edit</h1>

    <h4>Price</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="Value">Value</label>
                <input v-model="value" class="form-control" type="text" id="Value" name="Value" />

            </div>


            <div class="form-group">
                <label class="control-label" for="From">From</label>
                <input v-model="from" class="form-control" type="datetime-local" id="From" name="From" />
            </div>
            <div class="form-group">
                <label class="control-label" for="To">To</label>
                <input v-model="to" class="form-control" type="datetime-local" id="To" name="To" />
            </div>
            <div class="form-group">
                <label class="control-label" for="ProductId">ProductId</label>
                <select class="form-control" id="ProductId" name="ProductId" v-model="productId">
                    <option v-for="product of productsStore.products" :key="product.id" :value="product.id">{{
                        product.name }}</option>
                </select>

            </div>
            <div class="form-group">
                <input @click="Update()" type="submit" value="Save" class="btn btn-primary" />
            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/Prices">Back to List</RouterLink>
    </div>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useProductsStore } from '@/stores/products';
import { ProductService } from "@/services/ProductService";
import router from '@/router';
import { useIdentityStore } from '@/stores/identity';
import { PriceService } from '@/services/PriceService';
import { usePriceStore } from '@/stores/prices';
import { format } from 'date-fns';
@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class PricesEdit extends Vue {
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

            if (!this.identityStore.isAuthorized) {
                router.push({ name: "home" });
            }

            this.productsStore.$state.products =
                await this.productsService.getAll();
            var price = await this.pricesService.get(this.id);
            this.value = price.value;
            this.from = format(new Date(price.from), "yyyy-MM-dd'T'HH:mm");
            this.to = format(new Date(price.to), "yyyy-MM-dd'T'HH:mm");
            this.productId = price.productId;

        } catch (e) {
            console.error(`Error retrieving prices data: ${e}`)
        }
    }


    async Update(): Promise<void> {
        if (this.value && this.from && this.to && this.productId) {
            var res = await this.pricesService.put(this.id, {
                id: this.id,
                value: this.value,
                from: this.from,
                to: this.to,
                productId: this.productId
            })
            router.push("/prices")
        }
    }
}
</script>