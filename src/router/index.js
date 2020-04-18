import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../views/Board.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board
    }
  ]
})

export default router
