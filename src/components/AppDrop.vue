<template>
  <div
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="onDrop"
  >
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    onDrop ($event) {
      // const transferData = JSON.parse($event.dataTransfer.getData('payload'))

      this.$emit('drop', $event)
    }
  }
}
</script>
