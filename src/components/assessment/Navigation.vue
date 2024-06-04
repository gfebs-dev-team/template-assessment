<script setup>
import AppButton from "$components/AppButton.vue";
import Progress from "./Progress.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const { currIndex } = storeToRefs(questions);
const { goNext, goPrev, inSimulation } = questions;

defineProps(["courseData"]);
</script>

<template>
  <Progress class="xl:hidden" />
  <nav class="w-full xl:hidden">
    <div
      class="h-18 flex items-center justify-between bg-spacecadet p-4 text-xs text-aliceblue md:h-12">
      <AppButton
        class="h-fit max-w-fit border-2 border-aliceblue p-1 px-4 disabled:border-coolgrey disabled:text-coolgrey"
        @click="goPrev()"
        :disabled="currIndex == 0">
        Back
      </AppButton>
      <span class="text-sm font-bold"
        >{{ currIndex + 1 }}/{{ questions.total }}</span
      >
      <AppButton
        class="h-fit max-w-fit border-2 border-aliceblue p-1 px-4 disabled:border-coolgrey disabled:text-coolgrey"
        @click="goNext()"
        :disabled="currIndex == questions.total - 1">
        Next
      </AppButton>
    </div>
  </nav>
</template>
