<template>
    <h1>Delete</h1>

    <h3>Are you sure you want to delete this?</h3>
    <div>
        <h4>Discount</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">
                DiscountValue
            </dt>
            <dd class="col-sm-10">
                {{discountValue}}
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
                Description
            </dt>
            <dd class="col-sm-10">
                {{ description }}
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
            <RouterLink to="/Discounts">Back to List</RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import router from '@/router';
import { useProductsStore } from '@/stores/products';
import { ProductService } from '@/services/ProductService';
import { useIdentityStore } from '@/stores/identity';
import { DiscountService } from '@/services/DiscountService';
import { useDiscountStore } from '@/stores/discounts';

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class DiscountsDelete extends Vue {
    productsStore = useProductsStore();
    productsService = new ProductService();

    discountsStore = useDiscountStore();
    discountsService = new DiscountService();

    identityStore = useIdentityStore();

    id!: string;

    discountValue!: number;
    from: string = "";
    to: string = ""
    description: string | undefined = "";
    productId: string = "";

    errorMessage: string | null = null;


    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized && !this.identityStore.isAdmin) {
                router.push({ name: "home" });
            }

            var discount = await this.discountsService.get(this.id);
            this.discountsStore.$state.discount = discount
            this.discountValue = discount.discountValue;
            this.from = discount.from;
            this.to = discount.to;
            this.description = discount.description;
            this.productId = discount.productId;
        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }


    async Delete(): Promise<void> {
        if (this.discountValue && this.from && this.to && this.productId) {
            var res = await this.discountsService.delete(this.id);
        }
        router.push("/discounts")
    }

}
</script>