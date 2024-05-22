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

const { current } = storeToRefs(questions);
const { goNext, goPrev } = questions;
</script>

<template>
  <div
    class="z-10 box-content flex w-full flex-col items-center justify-end bg-spacecadet lg:gap-4">
    <div
      class="grid h-20 w-full grid-cols-[auto_auto_1fr] items-center gap-4 p-4 lg:h-auto">
      <img class="h-10 md:h-12 lg:h-24" src="/assets/crest.svg" />
      <div class="flex flex-col gap-1">
        <h1
          class="max-w-56 text-balance text-sm font-bold uppercase text-aliceblue md:text-base">
          Financial Management School
        </h1>
        <h2
          class="hidden text-balance text-sm font-bold uppercase text-saffron lg:inline">
          GFEBS {{ courseData.courseCode }}:
          {{ courseData.courseTitle }}
        </h2>
      </div>
      <div class="flex flex-col gap-4 justify-self-end lg:w-1/2">
        <Progress class="hidden lg:block" />
        <div class="flex w-full flex-row justify-end gap-4">
          <AppButton
            class="hidden max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm lg:flex lg:w-full lg:max-w-none"
            @click="$emit('submit')"
            v-if="questions.current == questions.total - 1">
            <RiCloseLine class="size-6 fill-aliceblue" /> SUBMIT
          </AppButton>
          <AppButton
            class="max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm lg:w-full lg:max-w-none"
            @click="quit()">
            <RiCloseLine class="size-6 fill-aliceblue" /> EXIT
          </AppButton>
        </div>
      </div>
    </div>
    <div
      class="md:h-18 grid h-16 w-full grid-cols-[1.5rem_1fr_auto] items-center gap-4 border-t border-masblue p-4 shadow-md transition md:py-2 lg:rounded-t-lg lg:border-t-0 lg:bg-masblue">
      <RiMenuLine
        @click="$emit('toggleSidebar')"
        class="size-6 fill-coolgrey p-1 hover:cursor-pointer lg:size-8"></RiMenuLine>
      <h2
        class="text-balance text-xs font-bold uppercase text-coolgrey md:text-sm lg:hidden">
        GFEBS {{ courseData.courseCode }}:
        {{ courseData.courseTitle }}
      </h2>
      <AppButton
        @click="$emit('submit')"
        v-if="questions.current == questions.total - 1"
        class="max-w-min justify-self-end border-2 border-saffron p-1 px-2 text-xs text-saffron md:px-4 md:py-2 md:text-sm lg:hidden"
        >Submit</AppButton
      >
      <div
        class="hidden h-12 items-center justify-end gap-4 text-xs text-aliceblue lg:flex">
        <AppButton
          class="h-fit max-w-fit border-2 border-aliceblue p-2 px-4 disabled:border-coolgrey disabled:text-coolgrey"
          @click="goPrev()"
          :disabled="current == 0">
          Back
        </AppButton>
        <AppButton
          class="h-fit max-w-fit border-2 border-aliceblue p-2 px-4 disabled:border-coolgrey disabled:text-coolgrey"
          @click="goNext()"
          :disabled="current == questions.total - 1">
          Next
        </AppButton>
      </div>
    </div>
  </div>
</template>
