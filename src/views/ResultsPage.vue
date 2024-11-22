<script setup>
import AppHeader from "@components/AppHeader.vue";
import { useQuestionsStore } from "@store/questions";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";

defineProps(["courseData"]);

const questions = useQuestionsStore();
const { questionsList } = storeToRefs(questions);
const { qtotal } = questions;
const passing = ref("Learner Name");

const correct = ref(questionsList.value.filter((q) => q.correct).length);
const score = ref(correct.value / qtotal);
const results = ref(
  questionsList.value
    .filter((q) => !(q.type === "content"))
    .some((q) => q.learnerResponse == undefined)
    ? 0
    : Math.round(score.value * 10000) / 100,
);
const learnerName = ref();
onMounted(() => {
  console.log(questionsList);
  learnerName.value = SCORM.data.get("cmi.learner_name");
  passing.value = SCORM.get("cmi.scaled_passing_score");
  SCORM.set("cmi.score.scaled", results.value / 100);
  if (score.value >= passing.value) {
    SCORM.set("cmi.completion_status", "completed");
  } else {
    SCORM.set("cmi.completion_status", "incomplete");
  }
});

defineEmits(["exit"]);
</script>

<template>
  <section class="flex h-dvh flex-col items-center bg-oxfordblue md:gap-0">
    <AppHeader
      :courseData="courseData"
      class="grow-1"
      @exit="$emit('exit')"></AppHeader>
    <div class="box-border flex grow items-center p-12 lg:max-w-[1200px]">
      <img class="hidden h-96 md:block" src="/assets/crest.svg" alt="crest" />
      <div class="flex grow flex-col items-center justify-center gap-8 p-8">
        <h2 class="text-center text-2xl text-aliceblue">
          Congratulations
          <span class="font-bold text-saffron"> {{ learnerName }}</span
          >.
        </h2>
        <p class="text-center text-lg text-aliceblue md:text-lg">
          You have completed the
          {{ courseData.courseTitle }} {{ courseData.topic }}. Below is your
          assessment score. Click the
          <span class="font-bold text-saffron">Exit</span> button to complete
          the test.
        </p>
        <h2 id="results" class="text-2xl font-bold text-aliceblue">
          Score: {{ results }}%;
        </h2>

        <!-- DEBUGGING -->
        <!-- <p class="text-aliceblue">
          {{
            questionsList
              .filter((q) => !q.correct && q.type != "content")
              .map((q) => ({
                scenario: q.scenario,
                question: q.question,
                learnerResponse: q.learnerResponse,
                reponses: q.responses,
                type: q.type,
              }))
          }}
        </p> -->
      </div>
    </div>
  </section>
</template>
