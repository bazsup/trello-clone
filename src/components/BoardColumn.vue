<template>
  <div
    class="column"
    draggable
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <div
        class="task"
        v-for="(task, $taskIndex) of column.tasks"
        :key="task.id"
        draggable
        @dragstart="pickupTask($event, $taskIndex, columnIndex)"
        @click="goToTask(task)"
        @dragover.prevent
        @dragenter.prevent
        @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, $taskIndex)"
      >
        <span class="w-full flex-no-shrink font-bold">
          {{ task.name }}
        </span>
        <p
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm"
        >
          {{ task.description }}
        </p>
      </div>

      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
  </div>
</template>

<script>
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
      const type = event.dataTransfer.getData('type')

      if (type === 'task') {
        this.moveTask(event, toTask, toTaskIndex)
      } else if (type === 'column') {
        this.moveColumn(event, toColumnIndex)
      }
    },
    moveTask (event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn (event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    pickupColumn (event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('type', 'column')
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
    },
    pickupTask (event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('type', 'task')
      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
    },
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    createTask (event, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: event.target.value })
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
