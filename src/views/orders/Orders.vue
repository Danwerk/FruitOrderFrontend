<template>
    <template v-if="identityStore.isAuthorized === true">
        <RouterLink to="/dashboard" style="margin: 5px; background-color: #17090d; color: rgb(194, 160, 160);" tag="button"
            class="btn">
            Back To Dashboard</RouterLink>
        <br>
        <br>
        <h1>Orders</h1>
        <br>
        <br>
        <div class="card" style="width: 400px; margin-bottom: 10px;">
            <div class="card-body">
                <h5 class="card-title">Orders Summary</h5>
                <p class="card-text">Total Orders: {{ ordersStore.orders.length }} </p>
                <p class="card-text">Total Order Sales (without vat): {{ calculateOrdersTotalSalesWithoutVat() }} €</p>
                <p class="card-text">Total Order Sales (vat included): {{ calculateOrdersTotalSalesIncludingVat() }} €</p>
                <p class="card-text">Total Delivery Amount: {{ calculateOrdersTotalDeliveryAmount() }} €</p>
            </div>
        </div>
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
                        Status
                    </th>
                    <th>
                        Payment
                    </th>

                    <th>
                        OrdererName
                    </th>

                    <th>
                        OrdererEmail
                    </th>
                    <th>
                        OrdererAddress
                    </th>
                    <th>
                        OrdererPhoneNumber
                    </th>
                    <th>
                        TotalPriceWithoutVat
                    </th>
                    <th>
                        TotalPriceIncludingVat
                    </th>
                    <th>
                        DeliveryPrice
                    </th>
                    <th>
                        TotalPriceIncludingVatAndDeliveryPrice
                    </th>
                    <th>
                        AppUserId
                    </th>
                  
                </tr>
            </thead>
            <tbody>
                <tr v-for="order of ordersStore.orders" :key="order.id">
                    <td>
                        {{ order.orderNr }}
                    </td>
                    <td>
                        {{ order.orderDate }}
                    </td>
                    <td>
                        {{ order.status }}
                    </td>
                    <td>
                        {{ order.paymentId }}
                    </td>
                    <td>
                        {{ order.ordererName }}
                    </td>
                    <td>
                        {{ order.ordererEmail }}
                    </td>
                    <td>
                        {{ order.ordererAddress }}
                    </td>
                    <td>
                        {{ order.ordererPhoneNumber }}
                    </td>
                    <td>
                        {{ order.totalPriceWithoutVat }}€
                    </td>
                    <td>
                        {{ order.totalPriceIncludingVat?.toFixed(2) }}€
                    </td>
                    <td>
                        {{ order.deliveryPrice }}€
                    </td>
                    <td>
                        {{ order.total }}€
                    </td>
                    <td>
                        {{ order.appUserId }}
                    </td>
                    <td>
                        <RouterLink :to="{ name: 'ordersedit', params: { id: order.id } }">Edit</RouterLink> |
                        <RouterLink :to="{ name: 'ordersdelete', params: { id: order.id } }">Delete</RouterLink>

                    </td>
                </tr>
            </tbody>
        </table>
    </template>
    <template v-else>
        <div style="height: 220px;"></div>
    </template>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useOrdersStore } from '@/stores/orders';
import { OrderService } from '@/services/OrderService';
import { useIdentityStore } from '@/stores/identity';
import router from '@/router';

@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Orders extends Vue {
    ordersStore = useOrdersStore();
    ordersService = new OrderService()

    identityStore = useIdentityStore();


    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized) {
                router.push({ name: "home" });
            }
            this.ordersStore.$state.orders =
                await this.ordersService.getAll();

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }
    }

    calculateOrdersTotalSalesWithoutVat(): number {
        return Number(this.ordersStore.orders.reduce((total, order) => total + order.totalPriceWithoutVat, 0).toFixed(2));
    }
    calculateOrdersTotalSalesIncludingVat(): number {
        return Number(this.ordersStore.orders.reduce((total, order) => total + order.totalPriceIncludingVat!, 0).toFixed(2));
    }

    calculateOrdersTotalDeliveryAmount(): number {
        return this.ordersStore.orders.reduce((total, order) => total + order.deliveryPrice, 0);
    }
}
</script>

<style>

</style>