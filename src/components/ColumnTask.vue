<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromTaskIndex: this.taskIndex,
        fromColumnIndex: this.columnIndex
      }"
      @click="goToTask(task)"
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
    </AppDrag>
  </AppDrop>
</template>

<script>
import moveTaskOrColumnMixin from '@/mixins/moveTaskOrColumnMixin'
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'

export default {
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [moveTaskOrColumnMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}
</style>
