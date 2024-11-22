<script setup>
import { useQuestionsStore } from "@store/questions";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const questions = useQuestionsStore();
const { currIndex } = storeToRefs(questions);
const { total } = questions;
const progress = computed(() => `${((currIndex.value + 1) / total) * 100}%`);
defineProps(["courseData"]);
</script>

<template>
  <div
    class="left-0 h-2 w-full overflow-hidden bg-masblue xl:h-6 xl:rounded-md">
    <div
      class="ease h-full bg-saffron transition-width duration-700"
      :style="`width: ${progress}`"></div>
  </div>
</template>
