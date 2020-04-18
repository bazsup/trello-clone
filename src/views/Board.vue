<template>
  <div class="board">

  </div>
</template>

<script>
export default {

}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline;
}

.column {
  @apply bg-gray-300 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-600 h-full overflow-auto;
}

.task-bg {
  @apply inset-0 absolute;
  background: rgba(0,0,0,0.5);
}
</style>
