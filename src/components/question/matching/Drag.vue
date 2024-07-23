<script setup>
import { startDrag, swap } from "./draggable";
defineProps(["id", "className"]);
</script>

<template>
  <div
    :id="id"
    draggable="true"
    @drop.self="swap($event)"
    @dragstart="startDrag($event)"
    class="drag z-10"
    :class="className">
    <slot />
  </div>
</template>
