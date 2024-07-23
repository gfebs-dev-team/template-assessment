<script setup>
const props = defineProps(["title", "columns", "classNames", "class"]);
import { onMounted, ref, useSlots } from "vue";
const hasMain = ref(false);

onMounted(() => {
  hasMain.value = useSlots().main ? true : false;
});
</script>
<template>
  <div
    class="absolute h-full w-full flex-col gap-2 rounded-none p-8 xl:gap-3 xl:px-12 xl:py-8"
    :class="class">
    <h2 class="w-full text-2xl font-bold text-saffron md:hidden">
      {{ props.title }}
    </h2>
    <div
      class="flex h-full w-full flex-col items-stretch gap-2"
      :class="classNames && classNames.main ? classNames.main : ''"
      v-if="hasMain">
      <h2 class="hidden text-2xl font-bold text-saffron md:block">
        {{ props.title }}
      </h2>
      <slot name="main" />
    </div>
    <div
      class="flex w-full flex-col items-stretch gap-2"
      :class="classNames && classNames[index + 1] ? classNames[index + 1] : ''"
      v-for="index in props.columns"
      :key="index">
      <slot :name="'column_' + (index + 1)" />
    </div>
    <slot></slot>
  </div>
</template>
