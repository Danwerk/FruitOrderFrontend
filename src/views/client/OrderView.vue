<template>
  <div v-if="errors != null" class="text-danger validation-summary-errors error-block" data-valmsg-summary="true">
    <ul v-for="error of errors">
      <li>{{ error }}</li>
    </ul>
  </div>
  <section class="h-100 h-custom" style="background-color: #17090d;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-3">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <!-- Left Section -->

                      <div class="row mb-4 d-flex justify-content-between align-items-center">
                        <h1 class="fw-bold mb-0 text-black">Order</h1>
                        <hr class="my-4">


                        <div class="mb-5">
                          <label for="ordererName" class="form-label label-left">Name</label>
                          <input v-model="name" type="text" class="form-control" id="ordererName"
                            placeholder="Enter your name">
                        </div>

                        <div class="mb-5">
                          <label for="ordererEmail" class="form-label label-left">Email</label>
                          <input v-model="email" type="email" class="form-control" id="ordererEmail"
                            placeholder="Enter your email">
                        </div>
                        <div class="mb-5">
                          <label for="ordererAddress" class="form-label label-left">Address</label>
                          <input v-model="address" type="text" class="form-control" id="ordererAddress"
                            placeholder="Enter your address">
                        </div>
                        <div class="mb-5">
                          <label for="ordererPhoneNumber" class="form-label label-left">Phone Number</label>
                          <input v-model="phoneNumber" type="text" class="form-control" id="ordererPhoneNumber"
                            placeholder="Enter your phone number">
                        </div>
                        <div class="mb-5">
                          <label for="orderDeliveryTime" class="form-label label-left">Delivery Time</label>
                          <div class="form-group">
                            <input v-model="deliveryTime" class="form-control" type="datetime-local" id="CreatedAt"
                              name="CreatedAt" />
                          </div>
                        </div>
                        <a class="btn btn-warning" @click="isPaymentProcessing || PlaceAnOrder()">Pay</a>
                      </div>
                    </div>
                    <div class="pt-2">
                      <h6 class="mb-0" style="margin-top: 45px;">
                        <RouterLink to="/CartView" class="text-body">Back to Cart</RouterLink>
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <!-- Right Section -->
                      <div>
                        <h4>Order Products</h4>
                        <hr>

                        <div v-for="cartProduct of cartProductsStore.cartProducts" :key="cartProduct.id" class="mb-3">
                          <div class="d-flex">
                            <img :src=productsStore.getProductById(cartProduct.productId!)?.image alt="Product 1"
                              class="img-thumbnail product-image">
                            <div class="product-details">
                              <h5 style="font-weight: bold;">{{
                                productsStore.getProductById(cartProduct.productId!)?.name }}</h5>
                              <h5>Amount: {{ cartProduct.quantity }}</h5>
                              <h5>Price: {{ cartProduct.price }} €</h5>
                            </div>
                          </div>
                          <hr>
                        </div>

                        <div class="total-price justify-content-between mb-4">
                          <div class="d-flex justify-content-between mb-4">
                            <h4 class="text-uppercase">Sub-total: </h4>
                            <h4 style="font-family: Lato;">{{ cartsStore.$state.cart?.totalPrice }} €</h4>
                          </div>
                          <div class="d-flex justify-content-between mb-4">
                            <h4 class="text-uppercase">(VAT 20%): </h4>
                            <h4 style="font-family: Lato;">{{ cartsStore.VAT }} €</h4>
                          </div>
                          <div class="d-flex justify-content-between mb-4">
                            <h4 class="text-uppercase">Delivery: </h4>
                            <h4 style="font-family: Lato;">{{ cartsStore.deliveryPrice }} €</h4>
                          </div>
                          <hr style="border-top: 10px solid #17090d">

                          <div class="d-flex justify-content-between mb-5">
                            <h4 style="font-family: Lato;">Total Price: </h4>
                            <h4 style="font-family: Lato;">{{ totalPriceIncludingVatAndDeliveryPrice() }} €</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <template>

  </template>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useProductsStore } from '@/stores/products';
import { ProductService } from "@/services/ProductService";
import { useIdentityStore } from '@/stores/identity';
import { useCartsStore } from '@/stores/carts';
import { CartService } from '@/services/CartService';
import type { ICartProduct } from '@/domain/ICartProduct';
import { CartProductService } from '@/services/CartProductService';
import { useCartProductsStore } from '@/stores/cartProducts';
import { OrderProductService } from '@/services/OrderProductService';
import { useOrderProductsStore } from '@/stores/orderProducts';
import { OrderService } from '@/services/OrderService';
import { useOrdersStore } from '@/stores/orders';
import { format } from 'date-fns';
import type { IOrderProduct } from '@/domain/IOrderProduct';
import router from '@/router';

@Options({

  components: {
  },
  props: {
    productTypeId: String
  },
  emits: [],
})
export default class OrderView extends Vue {
  isPaymentProcessing: boolean = false;


  totalPriceIncludingVatAndDeliveryPrice() {
    if (this.cartsStore.cart != null && this.cartsStore.cart?.totalPriceIncludingVat) {
      return Number((this.cartsStore.cart.totalPriceIncludingVat + this.cartsStore.deliveryPrice).toFixed(2));
    }
    return;
  }
  errors: [string] | null = null;
  cartsStore = useCartsStore();
  cartsService = new CartService();

  cartProductsService = new CartProductService()
  cartProductsStore = useCartProductsStore();

  orderProductsService = new OrderProductService()
  orderProductsStore = useOrderProductsStore();

  ordersStore = useOrdersStore();
  ordersService = new OrderService();

  productsStore = useProductsStore();
  productsService = new ProductService();

  identityStore = useIdentityStore();

  name: string = "";
  email: string = "";
  address: string = "";
  phoneNumber: string = "";
  deliveryTime: string = "";



  async mounted(): Promise<void> {
    try {
      if (!this.identityStore.isAuthorized) {
        router.push({ name: "home" });
      }
      this.cartProductsStore.$state.cartProducts = await this.cartProductsService.getAll();

      // todo: transform cartProducts to orderProducts;
      /* this.orderProductsStore.$state.orderProducts = this.cartProductsStore.$state.cartProducts; */

    } catch (e) {
      console.error(`Error retrieving cartproducts data: ${e}`)
    }
  }



  async PlaceAnOrder() {
    this.isPaymentProcessing = true;
    if (this.name == "" || this.email == "" || this.address == "" || this.phoneNumber == "" || this.deliveryTime == "") {
      this.errors = ["Please fill all fields."];
    }
    if (this.name && this.email && this.address && this.phoneNumber && this.deliveryTime) {
      const now = new Date(); // Get the current date and time
      const formattedDate = format(now, 'yyyyMMdd-HHmmss'); // Format the date and time
      const orderNr = formattedDate;  // Assign the formatted date and time as the orderNr

      if (new Date(this.deliveryTime) < now) {
        this.errors = ["Delivery time cannot be in the past. Choose correct one"];
        return;
      }

      var createdOrder = await this.ordersService.add({
        orderNr: orderNr,
        orderDate: now.toISOString(),
        status: "Pending",
        paymentId: null,
        ordererName: this.name,
        ordererEmail: this.email,
        ordererAddress: this.address,
        ordererPhoneNumber: this.phoneNumber,
        orderDeliveryTime: new Date(this.deliveryTime).toISOString(),
        totalPriceWithoutVat: this.cartsStore.$state.cart?.totalPrice!,
        totalPriceIncludingVat: this.cartsStore.$state.cart?.totalPrice! + Number(this.cartsStore.VAT),
        deliveryPrice: this.cartsStore.deliveryPrice,
        total: this.totalPriceIncludingVatAndDeliveryPrice()!,
      })

      if (createdOrder) {
        const orderId = createdOrder.data?.id; // Access the 'id' property
        await this.createOrderProducts(orderId, this.cartProductsStore.$state.cartProducts);

        this.ordersStore.orderId = orderId;

        if (createdOrder.status >= 300) {
          this.errors = [createdOrder.status + ' ' + createdOrder.errorMsg];
        } else {
          router.push({ name: "paymentview", params: { orderId: this.ordersStore.orderId, total: this.totalPriceIncludingVatAndDeliveryPrice() } })
        }


      }

    }
  }

  async createOrderProducts(orderId: string | undefined, cartProducts: ICartProduct[]): Promise<void> {
    for (const cartProduct of cartProducts) {
      const orderProduct: IOrderProduct = {
        // Transform the necessary properties from CartProduct to OrderProduct
        id: cartProduct.id,
        quantity: cartProduct.quantity,
        price: cartProduct.price,
        total: cartProduct.total,
        discount: cartProduct.discount,
        productId: cartProduct.productId,
        orderId: orderId || '', // Assign a default value for orderId if it's undefined
      };

      // Save the OrderProduct to the database
      await this.orderProductsService.add(orderProduct);
    }
  }

}

</script>
  

<style>
.product-details {
  margin-left: 15px;
  text-align: left;
}

.label-left {
  text-align: left;
  display: block;
}

.total-price {
  text-align: left;
}


.product-image {
  width: 100px;
  height: auto;
  object-fit: cover;
}
</style>