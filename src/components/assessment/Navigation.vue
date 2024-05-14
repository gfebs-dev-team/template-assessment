<script setup>
import AppButton from "$components/AppButton.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import { ref, computed, onUpdated} from "vue";

const questions = useQuestionsStore();
const { current } = storeToRefs(questions);
const { total } = questions;
const { goNext, goPrev } = questions;
const progress = computed(()=>
   `${((current.value + 1)/ total)*100}%`
);
defineProps(["courseData"]);
</script>

<template>
  <nav class="w-full">
    <div class="left-0 h-2 w-full bg-masblue">

      <div class="h-full bg-saffron transition-width duration-700 ease" :style="`width: ${progress}`"></div>
    </div>
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
