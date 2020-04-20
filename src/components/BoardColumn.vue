<template>
  <AppDrop
    class="column"
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="task.id"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from '@/components/ColumnTask'
import moveTaskOrColumnMixin from '@/mixins/moveTaskOrColumnMixin'
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'

export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [moveTaskOrColumnMixin],
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
    pickupColumn (event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      const payload = {
        type: 'column',
        fromColumnIndex: fromColumnIndex
      }
      event.dataTransfer.setData('payload', JSON.stringify(payload))
    },
    createTask (event, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: event.target.value })
      event.target.value = ''
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
