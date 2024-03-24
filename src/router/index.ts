import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerView from '../views/CustomerView.vue'
import VehicleView from '../views/VehicleView.vue'
import ReservationView from '../views/ReservationView.vue'
import SaleView from '../views/SaleView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomerView,
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: VehicleView,
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: ReservationView,
  },
  {
    path: '/sales',
    name: 'sales',
    component: SaleView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
