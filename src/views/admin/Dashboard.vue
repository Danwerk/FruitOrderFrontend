<template>
    <div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">

                <div class="navi">
                    <ul>
                        <li class="active"><a href=""><i class="fa fa-home" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Home</span></a></li>
                        <li><a href=""><i class="fa fa-tasks" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Workflow</span></a></li>
                        <li><a href=""><i class="fa fa-bar-chart" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Statistics</span></a></li>
                        <li><a href=""><i class="fa fa-user" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Calender</span></a></li>
                        <li><a href=""><i class="fa fa-calendar" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Users</span></a></li>
                        <li><a href=""><i class="fa fa-cog" aria-hidden="true"></i><span
                                    class="hidden-xs hidden-sm">Setting</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 display-table-cell v-align">
                <!--<button type="button" class="slide-toggle">Slide Toggle</button> -->
                <div class="user-dashboard">
                    <h1>Hello, Admin</h1>
                    <div class="row">
                        <div class="col-md-5 col-sm-5 col-xs-12 gutter">

                            <div class="sales">
                                <h2>Sales</h2>

                                <div class="btn-group">
                                    <button class="btn btn-secondary btn-lg" type="button">
                                        
                                        <RouterLink to="/SalesView" class="nav-link text-dark" active-class="active">Total sales
                                        </RouterLink>
                                   
                                    </button>
                                  
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-sm-7 col-xs-12 gutter">

                            <div class="sales report">
                                <h2>Report</h2>
                                <div class="btn-group">
                                    <button class="btn btn-secondary btn-lg dropdown-toggle" type="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span>Period:</span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a href="#">2012</a>
                                        <a href="#">2014</a>
                                        <a href="#">2015</a>
                                        <a href="#">2016</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Products" class="nav-link text-dark" active-class="active">Products ({{
                                    productsStore.productCount }})
                                </RouterLink>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Orders" class="nav-link text-dark" active-class="active">Orders
                                </RouterLink>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Carts" class="nav-link text-dark" active-class="active">Carts
                                    ({{ cartsStore.cartCount }})</RouterLink>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Units" class="nav-link text-dark" active-class="active">Units
                                    ({{ unitsStore.unitCount }})
                                </RouterLink>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/ProductTypes" class="nav-link text-dark" active-class="active">
                                    ProductTypes
                                </RouterLink>
                            </div>
                        </div>

                        <!-- <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Payments" class="nav-link text-dark" active-class="active">Payments
                                </RouterLink>
                            </div>
                        </div> -->

                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Discounts" class="nav-link text-dark" active-class="active">Discounts
                                </RouterLink>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-5 col-xs-12 gutter">
                            <div class="product-block">
                                <RouterLink to="/Prices" class="nav-link text-dark" active-class="active">Prices
                                </RouterLink>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
    
<script lang="ts">
import { RouterLink } from 'vue-router';
import { Options, Vue } from "vue-class-component";
import { useCartsStore } from '@/stores/carts';
import { CartService } from "@/services/CartService";
import { ProductService } from '@/services/ProductService';
import { useProductsStore } from '@/stores/products';
import { useUnitStore } from '@/stores/units';
import { UnitService } from '@/services/UnitService';
import router from '@/router';
import { useIdentityStore } from '@/stores/identity';

@Options({
    components: {
    },
    props: {},
    emits: []
})
export default class Dashboard extends Vue {


    cartsStore = useCartsStore();
    cartsService = new CartService();

    productsStore = useProductsStore();
    productsService = new ProductService();

    unitsStore = useUnitStore();
    unitsService = new UnitService();

    identityStore = useIdentityStore();

    async mounted(): Promise<void> {
        try {
            if (!this.identityStore.isAuthorized) {
                router.push({ name: "home" });
            }
            this.cartsStore.$state.carts =
                await this.cartsService.getAll();

            this.productsStore.$state.products =
                await this.productsService.getAll();

            this.unitsStore.$state.units = await this.unitsService.getAll();
        } catch (e) {
            console.error(`Error retrieving dashboard data: ${e}`)
        }
    }


}
</script>
<style>
/*Login Signup Page*/

li,
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}


/*Home Page*/

.home {
    background: #f6f7fa;
}

#navigation {
    background: #17090d;
}

#navigation {
    padding: 0;
}

.display-table {
    display: table;
    padding: 0;
    height: 100%;
    width: 100%;
}

.display-table-row {
    display: table-row;
    height: 100%;
}

.display-table-cell {
    display: table-cell;
    float: none;
    height: 100%;
}

.v-align {
    vertical-align: top;
}



.add-project {
    background: #5584ff none repeat scroll 0 0;
    border-radius: 100px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 27px 10px 45px;
    position: relative;
}

.header-rightside .nav>li>a:focus,
.header-rightside .nav>li>a:hover {
    background: none;
    text-decoration: none;
}



.navi i {
    font-size: 20px;
}


.header-top .dropdown-toggle {
    color: #0e1a35;
}

.header-top .dropdown-menu {
    border: medium none;
    left: -85px;
    padding: 17px;
}

.view {
    background: #5584ff none repeat scroll 0 0;
    border-radius: 100px;
    color: #ffffff;
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    padding: 10px 15px;
}

.navbar-content>span {
    font-size: 13px;
    font-weight: 700;
}

.img-responsive {
    width: 100%;
}

#navigation {
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}


header {
    background: #ffffff none repeat scroll 0 0;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.04);
    display: inline-block !important;
    line-height: 23px;
    padding: 15px;
    transition: all 0.5s ease 0s;
    width: 100%;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}


.navi a {
    border-bottom: 1px solid #0d172e;
    border-top: 1px solid #0d172e;
    color: #ffffff;
    display: block;
    font-size: 17px;
    font-weight: 500;
    padding: 28px 20px;
    text-decoration: none;
}

.navi i {
    margin-right: 15px;
    color: orange;
}

.navi .active a {
    background: #122143;
    border-left: 5px solid orange;
    padding-left: 15px;
}

.navi a:hover {
    background: #122143 none repeat scroll 0 0;
    border-left: 5px solid orange;
    display: block;
    padding-left: 15px;
}





.user-dashboard {
    padding: 0 20px;
}

.user-dashboard h1 {
    color: #0e1a35;
    font-size: 30px;
    font-weight: 500;
    margin: 0;
    padding: 21px 0;
}

.product-block {
    background: white none repeat scroll 0 0;
    border: 1px solid #d4d9e3;
    display: inline-block;
    padding: 15px;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    transition: background-color 0.3s ease;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: larger;
}


.sales {
    background: #ffffff none repeat scroll 0 0;
    border: 1px solid #d4d9e3;
    display: inline-block;
    padding: 15px;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    transition: background-color 0.3s ease;
}

.sales button {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: 1px solid #dadee7;
    border-radius: 100px;
    font-size: 15px;
    letter-spacing: 0.5px;
    padding-right: 32px;
    color: #0e1a35;
}

.sales button::before {
    font-family: FontAwesome;
    position: absolute;
    right: 12px;
    top: 11px;
}

.sales .btn-group {
    float: right;
}



.sales h2 {
    color: #8492af;
    float: left;
    font-size: 21px;
    font-weight: 600;
    margin: 0;
    padding: 9px 0 0;
}

.btn.btn-secondary.btn-lg.dropdown-toggle>span {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
}


.sales:hover,
.sales.report:hover,
.product-block:hover,
.additional-block:hover {
    background-color: #f3eef0;
}


.sales .btn-group.open .dropdown-toggle,
.btn.active,
.btn:active {
    box-shadow: none;
}


.block-link {
    display: block;
    text-decoration: none;
    color: rgb(180, 135, 135);
}

.block-link h2 {
    margin: 0;
}
</style>
