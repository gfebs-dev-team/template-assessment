<script setup>
import { inject } from "vue";
const props = defineProps(["value", "id", "index", "label"]);
const emits = defineEmits(["change"]);

const answer = inject("answer");
</script>

<template>
  <li class="flex w-full justify-between gap-2">
    <label
      class="h-min w-full p-1 text-sm text-aliceblue"
      :for="id + '_' + index">
      {{ label }}
    </label>
    <select
      @change="$emit('change')"
      :name="id + '_' + index"
      :id="id + '_' + index"
      v-model="answer[index]"
      class="rounded-md border border-charcoal bg-transparent p-2 px-4 text-sm text-coolgrey outline-none">
      <option
        class="text-oxfordblue"
        v-for="(v, index) in value"
        :value="`${label}[.]${v}`">
        {{ v }}
      </option>
    </select>
  </li>
</template>
