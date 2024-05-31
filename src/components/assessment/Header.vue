<script setup>
import AppButton from "$components/AppButton.vue";
import Progress from "./Progress.vue";
import { RiMenuLine, RiCloseLine } from "@remixicon/vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { useQuestionsStore } from "$store/questions.js";
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

const { currIndex } = storeToRefs(questions);
const { goNext, goPrev } = questions;
</script>

<template>
  <div
    class="z-10 box-content flex w-full flex-col items-center justify-end bg-spacecadet xl:gap-4">
    <div
      class="grid h-20 w-full grid-cols-[auto_auto_1fr] items-center gap-4 p-4 xl:h-auto">
      <img class="h-10 md:h-12 xl:h-24" src="/assets/crest.svg" />
      <div class="flex flex-col gap-1">
        <h1
          class="max-w-56 text-balance text-sm font-bold uppercase text-aliceblue md:text-base">
          Financial Management School
        </h1>
        <h2
          class="hidden text-balance text-sm font-bold uppercase text-saffron xl:inline">
          GFEBS {{ courseData.courseCode }}:
          {{ courseData.courseTitle }}
        </h2>
      </div>
      <div class="flex flex-col gap-4 justify-self-end xl:w-1/2">
        <Progress class="hidden xl:block" />
        <div class="flex w-full flex-row justify-end gap-4">
          <AppButton
            class="hidden max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm xl:flex xl:w-full xl:max-w-none"
            @click="$emit('submit')"
            v-if="questions.currIndex == questions.total - 1">
            <RiCloseLine class="size-6 fill-aliceblue" /> SUBMIT
          </AppButton>
          <AppButton
            class="max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm xl:w-full xl:max-w-none"
            @click="quit()">
            <RiCloseLine class="size-6 fill-aliceblue" /> EXIT
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="grid h-16 w-full grid-cols-[1.5rem_1fr_auto] items-center gap-4 border-t border-masblue p-4 shadow-md transition md:h-12 md:py-1 xl:h-16 xl:rounded-t-lg xl:border-t-0 xl:bg-masblue">
      <RiMenuLine
        @click="$emit('toggleSidebar')"
        class="size-6 fill-coolgrey p-1 hover:cursor-pointer xl:size-8"></RiMenuLine>
      <h2
        class="text-balance text-xs font-bold uppercase text-coolgrey md:text-sm xl:hidden">
        GFEBS {{ courseData.courseCode }}:
        {{ courseData.courseTitle }}
      </h2>
      <AppButton
        @click="$emit('submit')"
        v-if="questions.currIndex == questions.total - 1"
        class="max-w-min justify-self-end border-2 border-saffron p-1 px-2 text-xs text-saffron md:px-4 md:py-1 md:text-xs xl:hidden"
        >Submit</AppButton
      >
      <div
        class="hidden h-12 items-center justify-end gap-4 text-xs text-aliceblue xl:flex">
        <AppButton
          class="h-fit max-w-fit border-2 border-aliceblue p-2 px-4 disabled:border-coolgrey disabled:text-coolgrey"
          @click="goPrev()"
          :disabled="currIndex == 0">
          Back
        </AppButton>
        <AppButton
          class="h-fit max-w-fit border-2 border-aliceblue p-2 px-4 disabled:border-coolgrey disabled:text-coolgrey"
          @click="goNext()"
          :disabled="currIndex == questions.total - 1">
          Next
        </AppButton>
      </div>
    </div>
  </div>
</template>
