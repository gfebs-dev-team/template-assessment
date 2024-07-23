<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { useQuestionsStore } from "$store/questions";

const questions = useQuestionsStore();
const { getQuestion } = questions;
const props = defineProps(["questionData", "answer"]);
let questionStart, questionEnd;

onMounted(() => {
  questionStart = new Date();
  const { id, type } = props.questionData;
  const correctResponse = props.questionData.correctResponse;
  const timestamp =
    questionStart
      .toISOString()
      .slice(0, questionStart.toISOString().indexOf(".") + 2) + "Z";

  SCORM.set("cmi.interactions." + (id + 1) + ".id", "question_" + (id + 1));
  SCORM.set("cmi.interactions." + (id + 1) + ".timestamp", timestamp);
  SCORM.set("cmi.interactions." + (id + 1) + ".type", type);

  SCORM.set(
    "cmi.interactions." + (id + 1) + ".correct_responses.0.pattern",
    correctResponse,
  );
});

onBeforeUnmount(() => {
  questionEnd = new Date();
  const answer = props.answer;
  const { id } = props.questionData;
  let learnersResponse = "";

  //console.log(answer);
  if (answer.length > 0) {
    console.log(answer);
    getQuestion(id).learnerResponse = answer;
    answer.forEach((r, i) => {
      if (i !== 0) {
        learnersResponse += "[,]";
      }
      learnersResponse += r;
    });

    SCORM.set(
      "cmi.interactions." + (id + 1) + ".learner_response",
      learnersResponse,
    );
  }

  if (learnersResponse == getQuestion(id).correctResponse) {
    getQuestion(id).correct = true;
    SCORM.set("cmi.interactions." + (id + 1) + ".result", "correct");
  } else {
    getQuestion(id).correct = false;
    SCORM.set("cmi.interactions." + (id + 1) + ".result", "incorrect");
  }

  const lT = (Math.round((questionEnd - questionStart) / 1000) * 100) / 100;

  const latency = "PT" + lT + "S";

  SCORM.set(
    "cmi.interactions." + (props.questionData.id + 1) + ".latency",
    latency,
  );
});
</script>

<template>
  <section
    class="absolute flex h-full flex-col gap-2 p-8 xl:gap-3 xl:px-12 xl:py-8">
    <h3 class="text-base font-bold text-saffron xl:text-lg">
      Question {{ questionData.id + 1 }}
    </h3>
    <h2 class="text-lg font-bold text-aliceblue">
      {{ questionData.query }}
    </h2>
    <slot></slot>
  </section>
</template>
