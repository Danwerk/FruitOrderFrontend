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
                                            <h3>My Orders list </h3>
                                            <hr class="my-4">
                                            <br>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            OrderNr
                                                        </th>
                                                        <th>
                                                            OrderDate
                                                        </th>

                                                        <th>
                                                            DeliveryPrice
                                                        </th>
                                                        <th>
                                                            TotalPrice
                                                        </th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="order of ordersStore.orders" :key="order.id">
                                                        <td>
                                                            {{ order.orderNr }}
                                                        </td>
                                                        <td>
                                                            {{ formatDate(order.orderDate) }}
                                                        </td>
                                                        <td>
                                                            {{ order.deliveryPrice }}€
                                                        </td>
                                                        <td>
                                                            {{ order.total }}€
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br>
                                            <h5>Totally spent: {{ totalSpent.toFixed(2) }}€</h5>
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
    },
    emits: [],
})
export default class MyOrdersView extends Vue {

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
            this.ordersStore.$state.orders = await this.ordersService.getAll()

            // Sort orders by orderDate
            this.ordersStore.$state.orders.sort((a, b) => {
                const dateA = new Date(a.orderDate).getTime();
                const dateB = new Date(b.orderDate).getTime();
                return dateA - dateB;
            });
        } catch (e) {
            console.error(`Error retrieving cart data: ${e}`)
        }
    }

    // Computed property to calculate the total amount spent
    get totalSpent() {
        return this.ordersStore.orders.reduce(
            (total, order) => total + order.total,
            0
        );
    }

    formatDate(date: string) {
        return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
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