<template>
    <h1>Delete {{ id }}</h1>

    <h3>Are you sure you want to delete this?</h3>
    <div>
        <h4>Cart</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">
                TotalPrice
            </dt>
            <dd class="col-sm-10">
                123.00
            </dd>
            <dt class="col-sm-2">
                AppUser
            </dt>
            <dd class="col-sm-10">
                user@app.com
            </dd>
        </dl>

        <div class="form-group">
            <input @click="Delete()" type="submit" value="Delete" class="btn btn-danger" /> |
            <RouterLink to="/Carts">Back to List</RouterLink>
        </div>
    </div>
</template>
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useCartsStore } from '@/stores/carts';
import router from '@/router';
import { CartService } from '@/services/CartService';

@Options({
    components: {
    },
    props: {
        id: String
    },
    emits: []
})
export default class CartsDelete extends Vue {
    id!: string

    cartsStore = useCartsStore();
    cartService = new CartService();



    async mounted(): Promise<void> {
        try {
            var cart = await this.cartService.get(this.id);
            this.cartsStore.$state.cart = cart
           
        } catch (e) {
            console.error(`Error retrieving cart data: ${e}`)
        }

    }


    async Delete(): Promise<void> {
        
        console.log("carts delete clicked")
        console.log(this.id)
        if (this.id) {
            var res = await this.cartService.delete(this.id);
            console.log(res)
        }
        router.push("/carts")
    }
}
</script>