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
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (state, { fromTasks, toTasks, taskIndex }) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]
      toTasks.push(taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  },
  actions: {
  },
  modules: {
  }
})
