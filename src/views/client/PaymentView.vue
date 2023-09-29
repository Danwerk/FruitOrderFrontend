<template>
    <div v-if="errors != null" class="text-danger validation-summary-errors error-block" data-valmsg-summary="true">
        <ul v-for="error of errors">
            <li>{{ error }}</li>
        </ul>
    </div>

    <div class="container py-5">
        <div class="row">
            <div class="col-lg-7 mx-auto">
                <div class="card pay-card">
                    <div class="card-header">
                        <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                            <!-- Credit card form tabs -->
                            <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3 ">
                                <li class="nav-item ">
                                    <a class="btn btn-warning">
                                        <i class="fa fa-credit-card mr-2"></i> Credit Card
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="btn btn-warning">
                                        <i class="fa fa-paypal mr-2"></i> Paypal
                                    </a>
                                </li>

                            </ul>
                        </div> <!-- End -->
                        <!-- Credit card form content -->
                        <div class="tab-content">
                            <!-- credit card info-->
                            <div id="credit-card" class="tab-pane fade show active pt-3">
                                <form role="form" onsubmit="event.preventDefault()">
                                    <div class="form-group"> <label for="username">
                                            <h6>Card Owner</h6>
                                        </label> <input type="text" name="username" placeholder="Card Owner Name" required
                                            class="form-control "> </div>
                                    <div class="form-group"> <label for="cardNumber">
                                            <h6>Card number</h6>
                                        </label>
                                        <div class="input-group"> <input type="text" name="cardNumber"
                                                placeholder="Valid card number" class="form-control " required>
                                            <div class="input-group-append"> <span class="input-group-text text-muted"> <i
                                                        class="fa fa-cc-visa mx-1"></i> <i
                                                        class="fa fa-cc-mastercard mx-1"></i> <i
                                                        class="fa fa-cc-amex mx-1"></i> </span> </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-8">
                                            <div class="form-group"> <label><span class="hidden-xs">
                                                        <h6>Expiration Date</h6>
                                                    </span></label>
                                                <div class="input-group"> <input v-model="expiryMM" type="number"
                                                        placeholder="MM" name="" class="form-control" required>
                                                    <input v-model="expiryYY" type="number" placeholder="YY" name=""
                                                        class="form-control" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group mb-4"> <label data-toggle="tooltip"
                                                    title="Three digit CV code on the back of your card">
                                                    <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                                </label> <input type="text" required class="form-control"> </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div class="d-flex justify-content-between mb-5">
                                            <h4 style="font-family: Lato;">To pay: </h4>
                                            <h4 style="font-family: Lato;">{{ total }} €
                                            </h4>
                                        </div>
                                        <a class="btn btn-warning" @click="ConfirmPayment()">Confirm Payment</a>
                                    </div>
                                    <br>
                                    <br>
                                    <RouterLink to="/OrderView" class="text-body">Back to My Order</RouterLink>

                                </form>
                            </div>
                        </div> <!-- End -->
                        <!-- Paypal info -->
                        <div id="paypal" class="tab-pane fade pt-3">
                            <h6 class="pb-2">Select your paypal account type</h6>
                            <div class="form-group "> <label class="radio-inline"> <input type="radio" name="optradio"
                                        checked> Domestic </label> <label class="radio-inline"> <input type="radio"
                                        name="optradio" class="ml-5">International </label></div>
                            <p> <button type="button" class="btn btn-primary "><i class="fab fa-paypal mr-2"></i> Log into
                                    my Paypal</button> </p>
                            <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure
                                gateway for payment. After completing the payment process, you will be redirected back to
                                the website to view details of your order. </p>
                        </div> <!-- End -->
                        <!-- bank transfer info -->
                        <div id="net-banking" class="tab-pane fade pt-3">
                            <div class="form-group "> <label for="Select Your Bank">
                                    <h6>Select your Bank</h6>
                                </label> <select class="form-control" id="ccmonth">
                                    <option value="" selected disabled>--Please select your Bank--</option>
                                    <option>Bank 1</option>
                                    <option>Bank 2</option>
                                    <option>Bank 3</option>
                                    <option>Bank 4</option>
                                    <option>Bank 5</option>
                                    <option>Bank 6</option>
                                    <option>Bank 7</option>
                                    <option>Bank 8</option>
                                    <option>Bank 9</option>
                                    <option>Bank 10</option>
                                </select> </div>
                            <div class="form-group">
                                <p> <button type="button" class="btn btn-primary "><i class="fa fa-mobile-alt mr-2"></i>
                                        Proceed Payment</button> </p>
                            </div>
                            <p class="text-muted">Note: After clicking on the button, you will be directed to a secure
                                gateway for payment. After completing the payment process, you will be redirected back to
                                the website to view details of your order. </p>
                        </div> <!-- End -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useIdentityStore } from '@/stores/identity';
import { useCartsStore } from '@/stores/carts';
import router from '@/router';
import { usePaymentsStore } from '@/stores/paymentsStore';
import { PaymentService } from '@/services/PaymentService';
import { OrderService } from '@/services/OrderService';
import { useOrdersStore } from '@/stores/orders';

@Options({

    components: {
    },
    props: {
        orderId: String,
        total: Number
    },
    emits: [],
})
export default class PaymentView extends Vue {


    identityStore = useIdentityStore();

    paymentStore = usePaymentsStore();
    paymentService = new PaymentService();

    ordersStore = useOrdersStore();
    ordersService = new OrderService();

    cartsStore = useCartsStore();

    total: number | undefined;

    errors: [string] | null = null;
    orderId: string | undefined;

    expiryYY: string = "";
    expiryMM: string = "";

    name: string = "";
    cardNo: string = "";
    cvvNo: string = "";
    address: string = "";
    paymentMode: string = "";



    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized) {
                router.push({ name: "home" });
            }

        } catch (e) {
            console.error(`Error retrieving payment data: ${e}`)
        }
    }

    async ConfirmPayment() {
        var expDate = new Date(parseInt(this.expiryYY), parseInt(this.expiryMM) - 1, 1);

        var createdPayment = await this.paymentService.add({
            name: this.name,
            cardNo: this.cardNo,
            expiryDate: expDate.toISOString(),
            cvvNo: this.cvvNo,
            address: this.address,
            paymentMode: this.paymentMode
        })

        /*   console.log(createdPayment.data) */

        if (this.orderId != null && createdPayment.data?.id != null) {
            console.log(this.orderId)
            var order = await this.ordersService.get(this.orderId);
            order.paymentId = createdPayment.data?.id

            await this.ordersService.put(order.id, order)

            router.push({ name: "successpage", params: { orderId: this.orderId, total: this.total } })
        }


    }

}
</script>

<style>
.custom-btn {
    background-color: orange;
    color: white;
    /* Add any other styles as needed */
}
</style>