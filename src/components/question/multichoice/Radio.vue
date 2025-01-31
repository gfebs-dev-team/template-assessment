<script setup>
import { twMerge } from "tailwind-merge";
import { inject } from "vue";
const props = defineProps(["value", "id", "index", "img", "className"]);
const emits = defineEmits(["selected"]);

const checked_el = inject("checked_el");
const answer = inject("answer");
</script>

<template>
  <li
    :class="
      twMerge(
        'group data-[checked=true]:bg-saffron data-[checked=false]:hover:border-saffron box-border grid w-full grid-cols-[1rem_auto] gap-2 rounded-lg border-2 border-transparent px-4 py-1 transition duration-150',
        className,
      )
    "
    @click="$emit('selected')"
    :data-checked="checked_el == index">
    <input
      :class="
        twMerge(
          'bg-aliceblue text-saffron data-[checked=true]:after:text-oxfordblue data-[checked=false]:group-hover:border-saffron data-[checked=false]:group-hover:bg-saffron/35 accent-oxfordblue relative m-0 mt-[8px] flex aspect-square size-3 items-center justify-center rounded-full border-2 border-transparent text-sm mix-blend-darken outline-hidden data-[checked=false]:mix-blend-normal xl:mt-[.54rem]',
          img ? 'data-[checked=true]:after:text-saffron' : '',
        )
      "
      type="radio"
      :id
      :value
      v-model="answer"
      :true-value="checked_el == index"
      :data-checked="checked_el == index" />
    <label
      class="text-aliceblue data-[checked=true]:text-spacecadet data-[checked=false]:group-hover:text-saffron h-full min-h-0 w-full p-1 text-sm data-[checked=false]:group-hover:font-bold data-[checked=true]:font-bold xl:text-base"
      :data-checked="checked_el == index"
      :for="id">
      <slot></slot>
    </label>
  </li>
</template>
