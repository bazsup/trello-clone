import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board'
import { saveStatePlugin, uuid } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          const task = column.tasks.find(task => task.id === id)
          if (task) {
            return task
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        id: uuid(),
        name,
        description: ''
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
