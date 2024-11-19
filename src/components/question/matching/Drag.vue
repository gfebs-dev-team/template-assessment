<script setup>
import { startDrag, swap } from "./draggable";
defineProps(["id", "className", "index"]);
</script>

<template>
  <div
    :data-drag-index="index"
    :id="id"
    draggable="true"
    @drop.self="swap($event)"
    @dragstart="startDrag($event)"
    class="drag z-10"
    :class="className">
    <slot />
  </div>
</template>
