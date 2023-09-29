<template>
    <template v-if="identityStore.isAdmin === true">
        <h1>Create</h1>

        <h4>Price</h4>
        <hr />
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label" for="Value">Value</label>
                    <input v-model="value" class="form-control" type="text" id="Value" name="Value"  />
                </div>

                <div class="form-group">
                    <label class="control-label" for="From">From</label>
                    <input  v-model="from" class="form-control" type="datetime-local" id="From" name="From"  />
                </div>

                <div class="form-group">
                    <label class="control-label" for="To">To</label>
                    <input v-model="to" class="form-control" type="datetime-local" id="To" name="To"  />
                </div>
                <div class="form-group">
                    <label class="control-label" for="ProductId">ProductId</label>
                    <select v-model="productId" class="form-control" id="ProductId" name="ProductId">
                        <option v-for="product of productsStore.products" :key="product.id" :value="product.id">
                            {{ product.name }}</option>

                    </select>
                </div>


                <div class="form-group">
                    <input @click="Create()" type="submit" value="Create" class="btn btn-primary" />
                </div>
            </div>
        </div>

        <div>
            <RouterLink to="/Prices">Back to List</RouterLink>
        </div>
    </template>
    <template v-else>
        <div style="height: 50px;"></div>
    </template>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useProductsStore } from '@/stores/products';
import { ProductService } from "@/services/ProductService";
import { PriceService } from '@/services/PriceService';
import router from '@/router';
import { useIdentityStore } from '@/stores/identity';


@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class PricesCreate extends Vue {
    identityStore = useIdentityStore();

    productsStore = useProductsStore();
    productsService = new ProductService();

    pricesService = new PriceService();


    id!: string;
    value!: number;
    from!: string;
    to!: string;
    productId: string = "";


    async mounted(): Promise<void> {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }
    }

    async Create(): Promise<void> {    
        if (this.value && this.from && this.to && this.productId) {
            var res = await this.pricesService.add({
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