<script setup>
defineEmits(["drop", "data"]);
defineProps({
  id: String,
  className: String,
  index: Number,
  dropClass: {
    type: String,
    default: "flex-col items-center justify-center",
  },
});
</script>

<template>
  <div class="drop relative" @drop="$emit('data', $event)" :class="className">
    <div class="relative">
      <h2 class="text-transparent"><slot /></h2>
      <h2 class="absolute inset-0 z-20"><slot /></h2>
    </div>
    <div
      :id="id"
      class="drop absolute inset-0"
      :class="dropClass"
      @drop.self="$emit('drop', $event)"
      @dragenter.prevent
      @dragover.prevent
      :data-index="index">
      <slot name="item" />
    </div>
  </div>
</template>
