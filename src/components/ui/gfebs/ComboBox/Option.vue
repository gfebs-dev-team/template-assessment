<script setup>
defineEmits(["update"]);
defineProps(["value"]);
</script>

<template>
  <ul
    class="group col-span-2 grid cursor-pointer grid-cols-subgrid gap-2 text-ellipsis text-nowrap hover:bg-[#fddd83]"
    @click="$emit('update', $slots.default + ' ' + value)">
    <li class="bg-[#e9f0f7] p-0.5 group-hover:bg-[#fddd83]">
      <slot></slot>
    </li>
    <li class="p-0.5">{{ value }}</li>
  </ul>
</template>
