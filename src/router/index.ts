import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/client/AboutView.vue'
import ShopView from '../views/client/ShopView.vue'
import ContactView from '../views/client/ContactView.vue'
import PaymentView from '../views/client/PaymentView.vue'
import SuccessPage from '../views/client/SuccessPage.vue'
import MyOrdersView from '../views/client/MyOrdersView.vue'

import Carts from '../views/carts/Carts.vue'
import CartsDetail from '@/views/carts/CartsDetail.vue'
import CartsDelete from '@/views/carts/CartsDelete.vue'

import Orders from '@/views/orders/Orders.vue'
import OrdersEdit from '@/views/orders/OrdersEdit.vue'
import OrdersDelete from '@/views/orders/OrdersDelete.vue'

import Login from '@/views/identity/Login.vue'
import Register from '@/views/identity/Register.vue'

import Units from '../views/units/Units.vue'
import UnitsCreate from '@/views/units/UnitsCreate.vue'
import UnitsEdit from '@/views/units/UnitsEdit.vue'
import UnitsDelete from '@/views/units/UnitsDelete.vue'

import ProductTypes from '../views/productTypes/ProductTypes.vue'
import ProductTypesCreate from '@/views/productTypes/ProductTypesCreate.vue'
import ProductTypesEdit from '@/views/productTypes/ProductTypesEdit.vue'
import ProductTypesDelete from '@/views/productTypes/ProductTypesDelete.vue'
import CartView from '@/views/client/CartView.vue'

import Products from '@/views/products/Products.vue'
import ProductsCreate from '@/views/products/ProductsCreate.vue'
import ProductsDelete from '@/views/products/ProductsDelete.vue'
import ProductsEdit from '@/views/products/ProductsEdit.vue'

import Prices from '@/views/prices/Prices.vue'
import PricesCreate from '@/views/prices/PricesCreate.vue'
import PricesDelete from '@/views/prices/PricesDelete.vue'
import PricesEdit from '@/views/prices/PricesEdit.vue'

import Discounts from '@/views/discounts/Discounts.vue'
import DiscountsCreate from '@/views/discounts/DiscountsCreate.vue'
import DiscountsDelete from '@/views/discounts/DiscountsDelete.vue'
import DiscountsEdit from '@/views/discounts/DiscountsEdit.vue'

import Dashboard from '@/views/admin/Dashboard.vue'
import SalesView from '@/views/admin/SalesView.vue'
import OrderView from '@/views/client/OrderView.vue'

console.log(import.meta.env.VITE_BASE_URL)
console.log(import.meta.env.VITE_BACKEND_URL)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/About',
      name: 'about',
      component: AboutView
    },
    {
      path: '/Shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/Contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/CartView',
      name: 'cartview',
      component: CartView
    },
    {
      path: '/identity/account/login',
      name: 'login',
      component: Login
    },
    {
      path: '/identity/account/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/salesview',
      name: 'salesview',
      component: SalesView
    },
    {
      path: '/orderview',
      name: 'orderview',
      component: OrderView
    },
    {
      path: '/myordersview',
      name: 'myordersview',
      component: MyOrdersView
    },
    {
      path: '/paymentview/:orderId/:total',
      name: 'paymentview',
      component: PaymentView,
      props: true,
    },
    {
      path: '/successpage/:orderId/:total',
      name: 'successpage',
      component: SuccessPage,
      props: true,
    },


    {path: '/Carts', name: 'carts', component: Carts},
    {path: '/Carts/detail/:id', name: 'cartsdetail', component: CartsDetail, props: true},
    {path: '/Carts/delete/:id', name: 'cartsdelete', component: CartsDelete, props: true},

    {path: '/Orders', name: 'orders', component: Orders},
    {path: '/Orders/edit/:id', name: 'ordersedit', component: OrdersEdit, props: true},
    {path: '/Orders/delete/:id', name: 'ordersdelete', component: OrdersDelete, props: true},

    {path: '/Units', name: 'units', component: Units},
    {path: '/Units/create', name: 'unitscreate', component: UnitsCreate},
    {path: '/Units/edit/:id', name: 'unitsedit', component: UnitsEdit, props: true},
    {path: '/Units/delete/:id', name: 'unitsdelete', component: UnitsDelete, props: true},

    {path: '/ProductTypes', name: 'producttypes', component: ProductTypes},
    {path: '/ProductTypes/create', name: 'producttypescreate', component: ProductTypesCreate},
    {path: '/ProductTypes/edit/:id', name: 'producttypesedit', component: ProductTypesEdit, props: true},
    {path: '/ProductTypes/delete/:id', name: 'producttypesdelete', component: ProductTypesDelete, props: true},
  
    {path: '/Products', name: 'products', component: Products},
    {path: '/Products/create', name: 'productscreate', component: ProductsCreate},
    {path: '/Products/edit/:id', name: 'productsedit', component: ProductsEdit, props: true},
    {path: '/Products/delete/:id', name: 'productsdelete', component: ProductsDelete, props: true},

    {path: '/Prices', name: 'prices', component: Prices},
    {path: '/Prices/create', name: 'pricescreate', component: PricesCreate},
    {path: '/Prices/edit/:id', name: 'pricesedit', component: PricesEdit, props: true},
    {path: '/Prices/delete/:id', name: 'pricesdelete', component: PricesDelete, props: true},
  
    {path: '/Discounts', name: 'discounts', component: Discounts},
    {path: '/Discounts/create', name: 'discountscreate', component: DiscountsCreate},
    {path: '/Discounts/edit/:id', name: 'discountsedit', component: DiscountsEdit, props: true},
    {path: '/Discounts/delete/:id', name: 'discountsdelete', component: DiscountsDelete, props: true},
  ]
})

export default router
