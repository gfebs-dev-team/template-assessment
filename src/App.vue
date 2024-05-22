<script setup>
import LandingPage from "$views/LandingPage.vue";
import AssessmentPage from "$views/AssessmentPage.vue";
import ResultsPage from "./views/ResultsPage.vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { onMounted, shallowRef } from "vue";

const curr = shallowRef(LandingPage);
const courseData = {
  courseCode: "L210E",
  courseTitle: "Financial Process Overview",
  topic: "pre-assessment",
};

onMounted(() => {
  SCORM.init();
});

function startTest() {
  curr.value = AssessmentPage;
}

function submitTest() {
  curr.value = ResultsPage;
}
</script>

<template>
  <component
    :courseData
    :is="curr"
    @start="startTest"
    @submit="submitTest()"
    class="h-dvh w-dvw"></component>
</template>

<style scoped></style>
