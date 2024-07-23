<script setup>
import { inject } from "vue";
const props = defineProps(["value", "id", "index"]);
const emits = defineEmits(["selected"]);

const checked_el = inject("checked_el");
const answer = inject("answer");
</script>

<template>
  <li
    class="group box-border grid w-full grid-cols-[1rem_auto] gap-2 rounded-lg border-2 border-transparent px-4 py-1 transition duration-150 data-[checked=true]:bg-saffron data-[checked=false]:hover:border-saffron"
    @click="$emit('selected')"
    :data-checked="checked_el == index">
    <input
      class="relative m-0 mt-[.43rem] flex aspect-square size-[.8rem] appearance-none items-center justify-center rounded-full border-2 border-transparent bg-aliceblue text-sm text-saffron data-[checked=true]:bg-transparent data-[checked=true]:after:mt-[.23rem] data-[checked=true]:after:h-max data-[checked=true]:after:w-max data-[checked=true]:after:text-[1rem] data-[checked=true]:after:text-oxfordblue data-[checked=true]:after:content-['◉'] data-[checked=false]:group-hover:border-saffron data-[checked=false]:group-hover:bg-saffron data-[checked=false]:group-hover:bg-opacity-35 xl:mt-[.54rem]"
      type="radio"
      :id
      :value
      v-model="answer"
      :true-value="checked_el == index"
      :data-checked="checked_el == index" />
    <label
      class="h-min w-full p-1 text-sm text-aliceblue data-[checked=true]:font-bold data-[checked=true]:text-spacecadet data-[checked=false]:group-hover:font-bold data-[checked=false]:group-hover:text-saffron xl:text-base"
      :data-checked="checked_el == index"
      :for="id">
      <slot></slot>
    </label>
  </li>
</template>
