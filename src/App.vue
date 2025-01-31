<script setup>
import LandingPage from "#views/LandingPage.vue";
import AssessmentPage from "#views/AssessmentPage.vue";
import ResultsPage from "./views/ResultsPage.vue";
import { SCORM, debug } from "pipwerks-scorm-api-wrapper";
import { onMounted, shallowRef } from "vue";
import { useQuestionsStore } from "#store/questions";
import { storeToRefs } from "pinia";
import config from "/gfebs.config.js";

const courseData = config.data.course;

// SET THIS TO TRUE TO SKIP THE LANDING PAGE
const dev = false;

const curr = shallowRef(dev ? AssessmentPage : LandingPage);
const questions = useQuestionsStore();
const { disclaimer } = storeToRefs(questions);
const { needsDisclaimer, setSession, getSession } = questions;

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

onMounted(() => {
  //Set this to true or comment it out to get SCORM debug logs in the console.
  debug.isActive = false;

  SCORM.init();
  setSession("start");
  questions.shuffleQuestions();

  SCORM.set("cmi.interactions.0.id", "------STARTING_DIVIDER");
  SCORM.set("cmi.interactions.0.type", "other");
  SCORM.set(
    "cmi.interactions.0.correct_responses.0.pattern",
    "------------------",
  );
  SCORM.set("cmi.interactions.0.learner_response", "------------------");
});

function quit() {
  setSession("end");

  const totalSeconds =
    (Math.round((getSession("end") - getSession("start")) / 1000) * 100) / 100;
  let seconds = totalSeconds % 60;
  let totalMinutes = Math.round((totalSeconds - seconds) / 60);
  let minutes = totalMinutes % 60;
  let totalHours = Math.round((totalMinutes - minutes) / 60);

  let session_time =
    "PT" +
    (totalHours > 0 ? totalHours + "H" : "") +
    (minutes > 0 ? minutes + "M" : "") +
    (seconds > 0 ? seconds + "S" : "");

  console.log(session_time);

  SCORM.set("cmi.exit", "normal");
  SCORM.set("cmi.session_time", session_time);
  SCORM.save();
  if (SCORM.get("cmi.completion_status") == "incomplete") {
    SCORM.set("cmi.success_status", "unknown");
    SCORM.set("adl.nav.request", "suspendAll");
  } else {
    SCORM.set("cmi.success_status", "passed");
  }
  SCORM.quit();
}
</script>

<template>
  <component
    :courseData
    :is="curr"
    @exit="quit"
    @start="startTest"
    @submit="submitTest"
    class="h-dvh w-dvw"></component>
</template>

<style scoped></style>
