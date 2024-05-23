<script setup>
import AppHeader from "$components/AppHeader.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";

defineProps(["courseData"]);

const questions = useQuestionsStore();
const { questionsList } = storeToRefs(questions);
const { total } = questions;

const correct = ref(
  questionsList.value.filter(
    (q) => "learnerResponse" in q && "correct" in q.learnerResponse,
  ).length,
);
const score = ref(correct.value / total);
const results = ref(
  questionsList.value.some((q) => q.learnerResponse == undefined)
    ? 0
    : Math.round(score.value * 10000) / 100,
);
onMounted(() => {
  const passing = SCORM.get("cmi.passing_score");
  if (score.value >= passing) {
    SCORM.set("cmi.completion_status", "complete");
  } else {
    SCORM.set("cmi.completion_status", "incomplete");
  }
});

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
</script>

<template>
  <section class="flex h-dvh flex-col items-center bg-oxfordblue md:gap-0">
    <AppHeader class="grow-1" @exit="quit()"></AppHeader>
    <div class="box-border flex grow items-center p-12 lg:max-w-[1200px]">
      <img class="hidden h-96 md:block" src="/assets/crest.svg" alt="crest" />
      <div class="flex grow flex-col items-center justify-center gap-8 p-8">
        <p class="text-center text-lg text-aliceblue md:text-lg">
          You have completed the {{ courseData.courseTitle }}
          {{ courseData.topic }}. Below is your assessment score. Click the
          <span class="font-bold text-saffron">Exit</span> button to complete
          the test.
        </p>
        <h2 class="text-2xl font-bold text-aliceblue">Score: {{ results }}%</h2>
      </div>
    </div>
  </section>
</template>
