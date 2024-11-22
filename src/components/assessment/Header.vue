<script setup>
import AppButton from "@components/AppButton.vue";
import Progress from "./Progress.vue";
import { RiMenuLine, RiCloseLine } from "@remixicon/vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { useQuestionsStore } from "@store/questions.js";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const props = defineProps(["courseData"]);
const emits = defineEmits(["toggleSidebar", "submit"]);

function quit() {
  SCORM.set("cmi.exit", "normal");
  SCORM.save();
  if (SCORM.get("cmi.completion_status") == "incomplete") {
    SCORM.set("cmi.success_status", "unknown");
    SCORM.set("adl.nav.request", "suspendAll");
  } else {
    SCORM.set("cmi.success_status", "passed");
  }
  SCORM.quit();
}

const { next, prev, currInSimulation } = storeToRefs(questions);
const { goNext, goPrev } = questions;
</script>

<template>
  <div
    class="z-10 box-content flex w-full flex-col items-center justify-end bg-spacecadet xl:gap-4">
    <div
      class="grid h-full w-full grid-cols-[auto_auto_1fr] items-center gap-4 p-4 sm:h-20 xl:h-auto">
      <img
        class="h-8 object-contain md:h-12 xl:h-16"
        src="/assets/gfebs_white.png" />
      <div class="flex flex-col gap-1">
        <h1
          class="text-balance text-sm font-bold uppercase text-aliceblue md:text-base xl:text-xl">
          GFEBS {{ courseData.courseCode }}
          {{ courseData.courseTitle }}
        </h1>
        <h2
          class="text-balance text-sm font-bold uppercase text-saffron xl:inline xl:text-base">
          {{ courseData.topic }}
        </h2>
      </div>
      <div class="flex flex-col gap-4 justify-self-end xl:w-2/3">
        <Progress class="hidden xl:block" />
        <div class="flex w-full flex-col justify-end gap-4 sm:flex-row">
          <AppButton
            id="assessment_header_submit"
            class="max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm xl:flex xl:w-full xl:max-w-none xl:text-base"
            @click="$emit('submit')"
            v-if="questions.currIndex == questions.total - 1">
            <RiCloseLine class="size-6 fill-aliceblue" /> SUBMIT
          </AppButton>
          <AppButton
            id="assessment_header_exit"
            class="max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm xl:w-full xl:max-w-none xl:text-base"
            @click="quit()">
            <RiCloseLine class="size-6 fill-aliceblue" /> EXIT
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="grid h-16 w-full items-center gap-4 border-t border-masblue p-4 shadow-md transition md:h-max xl:rounded-t-lg xl:border-t-0 xl:bg-masblue"
      :class="
        currInSimulation ? 'hidden xl:grid' : 'grid-cols-[1.5rem_1fr_auto]'
      ">
      <RiMenuLine
        v-if="!currInSimulation"
        @click="$emit('toggleSidebar')"
        class="size-6 fill-coolgrey p-1 hover:cursor-pointer xl:size-8"></RiMenuLine>

      <div
        class="hidden items-center justify-end gap-4 text-xs text-aliceblue xl:flex">
        <AppButton
          id="assessment_header_prev"
          class="h-fit max-w-fit border-2 border-aliceblue p-1 px-4 disabled:border-coolgrey disabled:text-coolgrey"
          @click="goPrev()"
          :disabled="!prev">
          Back
        </AppButton>
        <AppButton
          id="assessment_header_next"
          class="h-fit max-w-fit border-2 border-aliceblue p-1 px-4 disabled:border-coolgrey disabled:text-coolgrey"
          @click="goNext()"
          :disabled="!next">
          Next
        </AppButton>
      </div>
    </div>
  </div>
</template>
