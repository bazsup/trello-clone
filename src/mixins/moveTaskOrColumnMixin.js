export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (event, toTask, toColumnIndex, toTaskIndex) {
      const transferData = JSON.parse(event.dataTransfer.getData('payload'))
      // const payload = {
      //   type: 'task',
      //   fromTaskIndex: taskIndex,
      //   fromColumnIndex: fromColumnIndex
      // }

      if (transferData.type === 'task') {
        this.moveTask(event, toTask, toTaskIndex, transferData)
      } else if (transferData.type === 'column') {
        this.moveColumn(event, transferData)
      }
    },
    moveTask (event, toTasks, toTaskIndex, { fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn (event, { fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}
