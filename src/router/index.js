import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../views/Board.vue'
import Task from '../views/Task.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: Task
        }
      ]
    }
  ]
})

export default router
