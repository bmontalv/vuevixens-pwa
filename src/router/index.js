import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CameraView from '@/components/CameraView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-item',
    name: 'create-item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateFestivalItem.vue'),
  },
  {
    path: '/camera',
    name: 'camera',
    component: CameraView
  }
]

const router = new VueRouter({
  routes
})

export default router
