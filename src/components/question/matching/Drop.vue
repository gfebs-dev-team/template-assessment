<script setup>
defineEmits(["drop", "data", "entered"]);
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
  <div
    :data-drop-id="id"
    class="drop relative"
    @drop="$emit('data', $event)"
    :class="className">
    <div class="relative">
      <h2 class="text-transparent"><slot /></h2>
      <h2 class="pointer-events-none absolute inset-0 z-20"><slot /></h2>
    </div>
    <div
      :id="id"
      class="drop absolute inset-0"
      :class="dropClass"
      @drop.self="$emit('drop', $event)"
      @dragenter.prevent="$emit('entered', $event)"
      @dragover.prevent
      :data-index="index">
      <slot name="item" />
    </div>
  </div>
</template>
