import { createRouter, createWebHistory } from 'vue-router'
import Machines from '../views/Machines.vue'
import Status from '../views/Status.vue'
import Events from '../views/Events.vue'

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    name: 'Machines',
    component: Machines
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
