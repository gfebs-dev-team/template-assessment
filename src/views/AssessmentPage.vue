<script setup>
import {
  AssessmentHeader,
  AssessmentNav,
  AssessmentSidebar,
  AssessmentDisclaimer,
} from "@components/assessment";
import { watchEffect } from "vue";
import { useQuestionsStore } from "@store/questions";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const { sidebarState, disclaimer, current, currIndex, viewed } =
  storeToRefs(questions);
const { toggleSidebar } = questions;

defineProps(["courseData"]);
defineEmits(["exit", "submit"]);

watchEffect(() => {
  if (currIndex.value > viewed.value) {
    viewed.value = currIndex.value;
  }
});
</script>

<template>
  <main
    class="flex h-dvh flex-col justify-between xl:items-center xl:bg-spacecadet xl:px-32 xl:py-10">
    <AssessmentHeader
      :course-data
      @toggleSidebar="toggleSidebar()"
      @submit="$emit('submit')"
      class="xl:max-w-screen-lg" />
    <section
      class="relative flex size-full h-full flex-col justify-between overflow-hidden rounded-b-lg bg-oxfordblue xl:max-w-screen-lg">
      <AssessmentSidebar :sidebarState />
      <Transition
        name="fade"
        enter-active-class="transition-opacity duration-500 ease-in-out"
        leave-active-class="transition-opacity duration-500 ease-in-out"
        enter-from-class="absolute opacity-0"
        leave-to-class="absolute opacity-0">
        <component :is="current" />
      </Transition>
      <AssessmentDisclaimer v-if="disclaimer" />
    </section>

    <AssessmentNav :course-data />
    <!-- Bottom Nav -->
  </main>
</template>
