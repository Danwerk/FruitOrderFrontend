<template>
    <h1>Delete {{ id }}</h1>

    <h3>Are you sure you want to delete this?</h3>
    <div>
        <h4>Order</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">
                OrderNr
            </dt>
            <dd class="col-sm-10">
                {{ orderNr }}
            </dd>
            <dt class="col-sm-2">
                OrderDate
            </dt>
            <dd class="col-sm-10">
                {{ orderDate }}
            </dd>
            <dt class="col-sm-2">
                Status
            </dt>
            <dd class="col-sm-10">
                {{ status }}
            </dd>
            <dt class="col-sm-2">
                Payment
            </dt>
            <dd class="col-sm-10">
                {{ paymentId }}
            </dd>
            <dt class="col-sm-2">
                OrdererName
            </dt>
            <dd class="col-sm-10">
                {{ ordererName }}
            </dd>
            <dt class="col-sm-2">
                OrdererEmail
            </dt>
            <dd class="col-sm-10">
                {{ ordererEmail }}
            </dd>
            <dt class="col-sm-2">
                OrdererAddress
            </dt>
            <dd class="col-sm-10">
                {{ ordererAddress }}
            </dd>
            <dt class="col-sm-2">
                OrdererPhoneNumber
            </dt>
            <dd class="col-sm-10">
                {{ ordererPhoneNumber }}
            </dd>
            <dt class="col-sm-2">
                TotalPriceWithoutVat
            </dt>
            <dd class="col-sm-10">
                {{ totalPriceWithoutVat }}
            </dd>
            <dt class="col-sm-2">
                TotalPriceIncludingVat
            </dt>
            <dd class="col-sm-10">
                {{totalPriceIncludingVat}}
            </dd>
            <dt class="col-sm-2">
                DeliveryPrice
            </dt>
            <dd class="col-sm-10">
                {{deliveryPrice}}
            </dd>
            <dt class="col-sm-2">
                TotalIncludingVatAndDely
            </dt>
            <dd class="col-sm-10">
                {{totalPriceIncludingVatAndDeliveryPrice}}
            </dd>
            <dt class="col-sm-2">
                AppUser
            </dt>
            <dd class="col-sm-10">
                {{appUserId}}
            </dd>
        </dl>
        <div class="form-group">
            <input @click="Delete()" type="submit" value="Delete" class="btn btn-danger" /> |
            <RouterLink to="/Orders">Back to List</RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { OrderService } from '@/services/OrderService';
import router from '@/router';
import { useOrdersStore } from '@/stores/orders';
import { IdentityService } from '@/services/IdentityService';
import { useIdentityStore } from '@/stores/identity';

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class OrdersDelete extends Vue {
    id!: string;

    orderNr: string = "";
    orderDate: string = "";
    status: string = "";
    paymentId: string | null = "";
    ordererName: string = "";
    ordererEmail: string = "";
    ordererAddress: string = "";
    ordererPhoneNumber: string = "";
    orderDeliveryTime: string = ""
    totalPriceWithoutVat!: Number;
    totalPriceIncludingVat!: Number;
    totalPriceIncludingVatAndDeliveryPrice!: Number;
    deliveryPrice!: Number;
    total!: Number;
    appUserId: string = "";


    errorMessage: string | null = null;

    orderService = new OrderService();
    ordersStore = useOrdersStore();

    identityStore = useIdentityStore();

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized) {
                router.push({ name: "home" });
            }
            var order = await this.orderService.get(this.id);
            this.ordersStore.$state.order = order;
            this.orderNr = order.orderNr;
            this.orderDate = order.orderDate;
            this.status = order.status;
            this.paymentId = order.paymentId;
            this.ordererName = order.ordererName;
            this.ordererEmail = order.ordererEmail;
            this.ordererAddress = order.ordererAddress;
            this.ordererPhoneNumber = order.ordererPhoneNumber;
            this.totalPriceWithoutVat = order.totalPriceWithoutVat;
            this.totalPriceIncludingVat = order.totalPriceIncludingVat!;
            this.deliveryPrice = order.deliveryPrice;
            this.total = order.total;
            this.appUserId = order.appUserId!

        } catch (e) {
            console.error(`Error retrieving product data: ${e}`)
        }

    }

    async Delete(): Promise<void> {
        if (this.id) {
            var res = await this.orderService.delete(this.id);
        }
        router.push("/orders")
    }
}
</script>