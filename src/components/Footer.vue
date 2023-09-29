<template>
    <template v-if="identityStore.isAdmin === false">
        <!-- Footer -->

        <footer class="text-center text-lg-start bg-light text-muted border-top">
            <!-- Section: Links  -->
            <section class="">

                <div class="container text-center text-md-start"><!-- mt-5-->
                    <br>
                    <!-- Grid row -->
                    <div class="row mt-1">
                        <!-- Grid column -->
                        <div class="col-md-5 col-lg-5 col-xl-5 mx-auto mb-4">
                            <!-- Content -->
                            <h6 class="text-uppercase fw-bold mb-4">Fruit Order</h6>
                            <p>
                                Opened: Monday-Sunday 10:00-19:00 <br>
                                <br>
                                Payment: Card/Cash.<br>
                            </p>
                        </div>
                        <!-- Grid column -->

                        <!-- Grid column -->
                        <div class="col-md-7 col-lg-5 col-xl-4 mx-auto mb-md-0 mb-4">
                            <!-- Links -->
                            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                            <p>
                                <i class="fa fa-envelope me-3"></i>
                                fruit.order@gmail.com
                            </p>
                            <p><i class="fa fa-phone me-3"></i> +372 555 66 72</p>
                            <p><i class="fa fa-home me-3"></i> Kriidi 11, Tallinn</p>
                            <p>
                                <a href="" class="me-4 text-reset">
                                    <i class="fa fa-facebook me-3">&nbsp;&nbsp;</i>https://www.fb.com/
                                </a>
                            </p>
                            <p>
                                <a href="" class="me-4 text-reset">
                                    <i class="fa fa-instagram me-3">&nbsp;&nbsp;</i>https://www.instagram.com/
                                </a>
                            </p>
                            <br>
                        </div>
                        <!-- Grid column -->
                    </div>
                    <!-- Grid row -->
                </div>
            </section>
            <!-- Section: Links  -->

            <!-- Copyright -->
            <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
                © 2023
               
            </div>
            <!-- Copyright -->
        </footer>
        <!-- Footer -->
    </template>
    <template v-else>
        <footer></footer>
    </template>
</template>


<script lang="ts">
import { IdentityService } from '@/services/IdentityService';
import { useCartsStore } from '@/stores/carts';
import { useIdentityStore } from '@/stores/identity';
import { Options, Vue } from 'vue-class-component';
import { RouterLink } from 'vue-router';
@Options({
    components: {
    }
})

export default class Header extends Vue {
    identityStore = useIdentityStore();

}
</script>
