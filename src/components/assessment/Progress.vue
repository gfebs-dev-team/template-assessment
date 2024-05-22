<script setup>
import AppButton from "$components/AppButton.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const questions = useQuestionsStore();
const { current } = storeToRefs(questions);
const { total } = questions;
const progress = computed(() => `${((current.value + 1) / total) * 100}%`);
defineProps(["courseData"]);
</script>

<template>
  <div
    class="left-0 h-2 w-full overflow-hidden bg-masblue lg:h-4 lg:rounded-md">
    <div
      class="transition-width ease h-full bg-saffron duration-700"
      :style="`width: ${progress}`"></div>
  </div>
</template>
