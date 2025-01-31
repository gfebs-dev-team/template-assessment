<script setup>
import AppButton from "#components/ui/AppButton.vue";
import Progress from "./Progress.vue";
import { RiMenuLine, RiCloseLine } from "@remixicon/vue";
import { useQuestionsStore } from "#store/questions.js";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const props = defineProps(["courseData"]);
const emits = defineEmits(["toggleSidebar", "submit", "exit"]);

const { next, prev, currInSimulation } = storeToRefs(questions);
const { goNext, goPrev } = questions;
</script>

<template>
  <div
    class="bg-spacecadet z-10 box-content flex w-full flex-col items-center justify-end xl:gap-4">
    <div
      class="grid h-full w-full grid-cols-[auto_auto_1fr] items-center gap-4 p-4 sm:h-20 xl:h-auto">
      <img
        class="h-8 w-24 object-contain object-center md:h-12 xl:h-16"
        src="/assets/gfebs_white.png" />
      <div class="flex flex-col gap-1">
        <h1
          class="text-aliceblue text-sm font-bold text-balance uppercase md:text-base xl:text-xl">
          GFEBS {{ courseData.code }}
          {{ courseData.title }}
        </h1>
        <h2
          class="text-saffron text-sm font-bold text-balance uppercase xl:inline xl:text-base">
          {{ courseData.topic }}
        </h2>
      </div>
      <div class="flex flex-col gap-4 justify-self-end xl:w-2/3">
        <Progress class="hidden xl:block" />
        <div class="flex w-full flex-col justify-end gap-4 sm:flex-row">
          <AppButton
            id="assessment_header_submit"
            class="bg-oxfordblue text-aliceblue max-w-32 justify-self-end border-transparent p-1 px-2 text-xs md:text-sm xl:flex xl:w-full xl:max-w-none xl:text-base"
            @click="$emit('submit')"
            v-if="questions.currIndex == questions.total - 1">
            <RiCloseLine class="fill-aliceblue size-6" /> SUBMIT
          </AppButton>
          <AppButton
            id="assessment_header_exit"
            class="bg-oxfordblue text-aliceblue max-w-32 justify-self-end border-transparent p-1 px-2 text-xs md:text-sm xl:w-full xl:max-w-none xl:text-base"
            @click="$emit('exit')">
            <RiCloseLine class="fill-aliceblue size-6" /> EXIT
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="border-masblue xl:bg-masblue grid h-16 w-full items-center gap-4 border-t p-4 shadow-md transition md:h-max xl:rounded-t-lg xl:border-t-0"
      :class="
        currInSimulation ? 'hidden xl:grid' : 'grid-cols-[1.5rem_1fr_auto]'
      ">
      <RiMenuLine
        v-if="!currInSimulation"
        @click="$emit('toggleSidebar')"
        class="fill-coolgrey size-6 p-1 hover:cursor-pointer xl:size-8"></RiMenuLine>

      <div
        class="text-aliceblue hidden items-center justify-end gap-4 text-xs xl:flex">
        <AppButton
          id="assessment_header_prev"
          class="border-aliceblue disabled:border-coolgrey disabled:text-coolgrey h-fit max-w-fit border-2 p-1 px-4"
          @click="goPrev()"
          :disabled="!prev">
          Back
        </AppButton>
        <AppButton
          id="assessment_header_next"
          class="border-aliceblue disabled:border-coolgrey disabled:text-coolgrey h-fit max-w-fit border-2 p-1 px-4"
          @click="goNext()"
          :disabled="!next">
          Next
        </AppButton>
      </div>
    </div>
  </div>
</template>
