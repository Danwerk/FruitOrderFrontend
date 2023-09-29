<template>
    <h1>Edit</h1>

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
                <input v-model="from" class="form-control" type="datetime-local" id="From" name="From" />
            </div>
            <div class="form-group">
                <label class="control-label" for="To">To</label>
                <input v-model="to" class="form-control" type="datetime-local" id="To" name="To" />
            </div>
            <div class="form-group">
                <label class="control-label" for="Description">Description</label>
                <input v-model="description" class="form-control" type="text" id="Description" maxlength="4096"
                    name="Description" />
            </div>
            <div class="form-group">
                <label class="control-label" for="ProductId">ProductId</label>
                <select v-model="productId" class="form-control" id="ProductId" name="ProductId">
                    <option v-for="product of productsStore.products" :key="product.id" :value="product.id">{{ product.name
                    }}</option>
                </select>
            </div>
            <div class="form-group">
                <input @click="Update()" type="submit" value="Save" class="btn btn-primary" />
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
import { useUnitStore } from '@/stores/units';
import { UnitService } from "@/services/UnitService";
import router from '@/router';
import { ProductService } from '@/services/ProductService';
import { useProductsStore } from '@/stores/products';
import { useIdentityStore } from '@/stores/identity';
import { DiscountService } from '@/services/DiscountService';
import { useDiscountStore } from '@/stores/discounts';
import { format } from 'date-fns';


@Options({
    components: {
    },
    props: {
        id: String,
    },
    emits: [],

})
export default class DiscountsEdit extends Vue {
    unitsStore = useUnitStore();
    unitsService = new UnitService();

    productsStore = useProductsStore();
    productsService = new ProductService();

    discountsStore = useDiscountStore();
    discountsService = new DiscountService();

    identityStore = useIdentityStore();

    id!: string;
    discountValue!: number;
    from: string = "";
    to: string = "";
    description: string | undefined = "";
    productId: string = "";

    errorMessage: string | null = null;

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }

            var discount = await this.discountsService.get(this.id);
            this.discountsStore.$state.discount = discount;
            this.discountValue = discount.discountValue;
            this.from = format(new Date(discount.from), "yyyy-MM-dd'T'HH:mm");
            this.to = format(new Date(discount.to), "yyyy-MM-dd'T'HH:mm");
            this.description = discount.description;
            this.productId = discount.productId;

        } catch (e) {
            console.error(`Error retrieving discount data: ${e}`)
        }
    }

    async Update(): Promise<void> {
        if (this.id, this.discountValue && this.from && this.to && this.description && this.productId) {
            var res = await this.discountsService.put(this.id, {
                id: this.id,
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