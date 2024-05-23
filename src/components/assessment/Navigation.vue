<script setup>
import AppButton from "$components/AppButton.vue";
import Progress from "./Progress.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const { current } = storeToRefs(questions);
const { goNext, goPrev } = questions;

defineProps(["courseData"]);
</script>

<template>
  <Progress class="lg:hidden" />
  <nav class="w-full lg:hidden">
    <div
      class="h-18 flex items-center justify-between bg-spacecadet p-4 text-xs text-aliceblue">
      <AppButton
        class="h-fit max-w-fit border-2 border-aliceblue p-2 px-4 disabled:border-coolgrey disabled:text-coolgrey"
        @click="goPrev()"
        :disabled="current == 0">
        Back
      </AppButton>
      <span class="text-sm font-bold"
        >{{ current + 1 }}/{{ questions.total }}</span
      >
      <AppButton
        class="h-fit max-w-fit border-2 border-aliceblue p-2 px-4 disabled:border-coolgrey disabled:text-coolgrey"
        @click="goNext()"
        :disabled="current == questions.total - 1">
        Next
      </AppButton>
    </div>
  </nav>
</template>
