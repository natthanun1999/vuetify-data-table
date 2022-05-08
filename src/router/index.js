import Vue from 'vue'
import VueRouter from 'vue-router'
import Tutorials from '../views/Tutorials/Tutorials.vue'
import TutorialDetail from '../views/Tutorials/TutorialDetail.vue'
import AddTutorial from '../views/Tutorials/AddTutorial.vue'
import Cart from '../views/Cart/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: Tutorials
  },
  {
    path: '/tutorials/add',
    name: 'AddTutorial',
    component: AddTutorial
  },
  {
    path: '/tutorials/:id',
    name: 'TutorialDetail',
    component: TutorialDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
