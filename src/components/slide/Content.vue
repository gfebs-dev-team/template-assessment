<script setup>
import Base from "./Base.vue";

const props = defineProps(["title", "classNames", "columns"]);

let column = (index) => {
  return "column_" + (index + 1);
};
</script>

<template>
  <Base class="text-aliceblue" v-bind="props">
    <template #main>
      <slot></slot>
    </template>
    <template #[column(index)] v-for="index in columns" :key="index">
      <slot :name="'column_' + (index + 1)" />
    </template>
  </Base>
</template>
