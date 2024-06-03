<script setup>
import {
  AssessmentHeader,
  AssessmentNav,
  AssessmentSidebar,
  AssessmentDisclaimer,
} from "$components/assessment";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const { sidebarState, disclaimer, current } = storeToRefs(questions);
const { toggleSidebar, resetSim } = questions;

defineProps(["courseData"]);
defineEmits(["exit", "submit"]);
</script>

<template>
  <main
    class="flex h-dvh flex-col justify-between xl:items-center xl:bg-spacecadet xl:p-14 xl:px-16">
    <AssessmentHeader
      :course-data
      @toggleSidebar="toggleSidebar()"
      @submit="$emit('submit')"
      class="xl:max-w-[1400px]" />
    <section
      class="relative flex size-full h-full flex-col justify-between overflow-hidden rounded-b-lg bg-oxfordblue xl:max-w-[1400px]">
      <AssessmentSidebar :sidebarState />
      <Transition
        name="fade"
        enter-active-class="transition-opacity duration-500 ease-in-out"
        leave-active-class="transition-opacity duration-500 ease-in-out"
        enter-from-class="absolute opacity-0"
        leave-to-class="absolute opacity-0">
        <component :is="current" @resetSim="resetSim" />
      </Transition>
      <AssessmentDisclaimer v-if="disclaimer" />
    </section>

    <AssessmentNav :course-data />
    <!-- Bottom Nav -->
  </main>
</template>
