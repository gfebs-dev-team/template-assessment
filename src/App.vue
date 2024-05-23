<script setup>
import LandingPage from "$views/LandingPage.vue";
import AssessmentPage from "$views/AssessmentPage.vue";
import ResultsPage from "./views/ResultsPage.vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { onMounted, shallowRef } from "vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";

const curr = shallowRef(LandingPage);
const courseData = {
  courseCode: "L210E",
  courseTitle: "Financial Process Overview",
  topic: "pre-assessment",
};

const questions = useQuestionsStore();
const { disclaimer } = storeToRefs(questions);
const { needsDisclaimer } = questions;

onMounted(() => {
  SCORM.init();
});

function startTest() {
  curr.value = AssessmentPage;
}

function submitTest() {
  if (needsDisclaimer()) {
    disclaimer.value = true;
    console.log(disclaimer.value);
  } else {
    disclaimer.value = false;
    curr.value = ResultsPage;
  }
}
</script>

<template>
  <component
    :courseData
    :is="curr"
    @start="startTest"
    @submit="submitTest"
    class="h-dvh w-dvw"></component>
</template>

<style scoped></style>
