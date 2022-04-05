import Vue from 'vue'
import VueRouter from 'vue-router'
import Tutorials from '../views/Tutorials/Tutorials.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tutorials',
    component: Tutorials
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
