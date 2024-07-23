<script setup>
import { inject } from "vue";
const props = defineProps(["value", "id", "index", "responses"]);
const emits = defineEmits(["selected"]);

const checked_el = inject("checked_el");
const answer = inject("answer");
</script>

<template>
  <li
    class="group box-border grid w-full grid-cols-[1rem_auto] gap-2 rounded-lg border-2 border-transparent px-4 py-1 transition duration-150 data-[checked=true]:bg-saffron data-[checked=false]:hover:border-saffron"
    @click="$emit('selected')"
    :data-checked="checked_el.includes(index)">
    <input
      class="relative m-0 mt-[.43rem] flex aspect-square size-[.8rem] border-transparent bg-aliceblue text-sm text-saffron accent-saffron checked:accent-oxfordblue checked:mix-blend-multiply data-[checked=true]:bg-transparent xl:mt-[.54rem]"
      type="checkbox"
      :id
      :value
      v-model="answer"
      :true-value="checked_el.includes(index)"
      :data-checked="checked_el.includes(index)" />
    <label
      class="h-min w-full p-1 text-sm text-aliceblue data-[checked=true]:font-bold data-[checked=true]:text-spacecadet data-[checked=false]:group-hover:font-bold data-[checked=false]:group-hover:text-saffron xl:text-base"
      :data-checked="checked_el.includes(index)"
      @click.prevent
      :for="id">
      <slot></slot>
    </label>
  </li>
</template>
