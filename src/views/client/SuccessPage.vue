<template>
    <template v-if="identityStore.isAuthorized === true">
    <div style="height: 50px;"></div>
    <section class="vh-100% gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-md-10">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="col-md-2"></div>

                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <br>
                                    <br>
                                    <br>
                                    <div style="text-align:center;">
                                        <h3>Thank you! You have successfully ordered. </h3>
                                        <br>
                                        <br>

                                        <h5>Order: {{ ordersStore.$state.order?.orderNr }}</h5>
                                        <hr class="my-4">

                                        <h5>Delivery to: {{ ordersStore.$state.order?.ordererAddress }}</h5>
                                        <h5>Delivery time: {{ formatDate(ordersStore.$state.order?.orderDeliveryTime) }}</h5>
                                        <br>
                                        <br>
                                        <h3>Products:</h3>
                                        <div v-for="orderProduct of orderProductsStore.$state.orderProducts"
                                            :key="orderProduct.id">
                                            <h5> * {{ productsStore.getProductById(orderProduct.productId!)?.description }} 
                                                {{productsStore.getProductById(orderProduct.productId!)?.name}}, 
                                                {{ orderProduct.quantity }}
                                                {{ unitsStore.getUnitById(productsStore.getProductById(orderProduct.productId!)?.unitId!)?.unitName}},
                                            </h5> 
                                        </div>
                                        <br>
                                        <h5>Total sum: {{ total }}€</h5>
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                    </div>

                                    <br>
                                    <br />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    </section>
</template>
<template v-else>
        <div style="height: 220px;"></div>
    </template>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { OrderService } from '@/services/OrderService';
import { useOrdersStore } from '@/stores/orders';
import { useProductsStore } from '@/stores/products';
import { useOrderProductsStore } from '@/stores/orderProducts';
import { useUnitStore } from '@/stores/units';
import { useIdentityStore } from '@/stores/identity';
import router from '@/router';
import { usePriceStore } from '@/stores/prices';
import { format } from 'date-fns';

@Options({

    components: {
    },
    props: {
        orderId: String,
        total: Number
    },
    emits: [],
})
export default class SuccessPage extends Vue {

    errors: [string] | null = null;

    total: number | undefined;
    orderId: string | undefined;

    ordersService = new OrderService();
    ordersStore = useOrdersStore();

    orderProductsStore = useOrderProductsStore()

    productsStore = useProductsStore();
    unitsStore = useUnitStore();

    pricesStore = usePriceStore();

    identityStore = useIdentityStore();
    




    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized) {
                router.push({ name: "home" });
            }
            if (this.orderId != null) {
                this.ordersStore.$state.order = await this.ordersService.get(this.orderId)

                this.orderProductsStore.$state.orderProducts = this.ordersStore.$state.order.orderProducts!;
            }

        } catch (e) {
            console.error(`Error retrieving cart data: ${e}`)
        }
    }

    formatDate(date: string | undefined) {
        if (date) {
            return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
        }
    }

}

</script>
  

<style>
.container-fluid {
    max-width: 1800px;
    margin: 0 auto;
    padding: 10px;
}

.error-block {

    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    border: 1px solid red;
    background-color: #ffe6e6;
    z-index: 999;
}
</style>