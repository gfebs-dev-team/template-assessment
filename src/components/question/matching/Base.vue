<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { useQuestionsStore } from "#store/questions";

const questions = useQuestionsStore();
const { getQuestion } = questions;
const props = defineProps(["questionData", "answer", "aID"]);
let questionStart, questionEnd;

onMounted(() => {
  questionStart = new Date();
  const { sID, type } = props.questionData;
  const correctResponse = props.questionData.correctResponse;
  const timestamp =
    questionStart
      .toISOString()
      .slice(0, questionStart.toISOString().indexOf(".") + 2) + "Z";

  SCORM.set("cmi.interactions." + (sID + 1) + ".id", "question_" + (sID + 1));
  SCORM.set("cmi.interactions." + (sID + 1) + ".timestamp", timestamp);
  SCORM.set("cmi.interactions." + (sID + 1) + ".type", type);

  SCORM.set(
    "cmi.interactions." + (sID + 1) + ".correct_responses.0.pattern",
    correctResponse,
  );
});

onBeforeUnmount(() => {
  questionEnd = new Date();
  const answer = props.answer;
  const { id, sID } = props.questionData;
  let learnersResponse = "";

  //console.log(answer);
  if (answer.length > 0) {
    //console.log(answer);
    getQuestion(id).learnerResponse = answer;
    answer.forEach((r, i) => {
      if (i !== 0) {
        learnersResponse += "[,]";
      }
      learnersResponse += r;
    });

    SCORM.set(
      "cmi.interactions." + (sID + 1) + ".learner_response",
      learnersResponse,
    );
  }

  if (learnersResponse == getQuestion(id).correctResponse) {
    getQuestion(id).correct = true;
    SCORM.set("cmi.interactions." + (sID + 1) + ".result", "correct");
  } else {
    getQuestion(id).correct = false;
    SCORM.set("cmi.interactions." + (sID + 1) + ".result", "incorrect");
  }

  const lT = (Math.round((questionEnd - questionStart) / 1000) * 100) / 100;

  const latency = "PT" + lT + "S";

  SCORM.set(
    "cmi.interactions." + (props.questionData.sID + 1) + ".latency",
    latency,
  );
});
</script>

<template>
  <section
    :data-id="aID"
    class="flex h-full w-full flex-col gap-2 p-8 xl:gap-3 xl:px-12 xl:py-8">
    <h3 class="text-base font-bold text-saffron xl:text-lg">
      Question {{ questionData.id + 1 }}
    </h3>
    <h2 class="text-lg font-bold text-aliceblue">
      {{ questionData.query }}
    </h2>
    <slot></slot>
  </section>
</template>
