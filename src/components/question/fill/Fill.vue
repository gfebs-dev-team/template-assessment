<script setup>
import Base from "../Base.vue";
import { inject, onBeforeUnmount, onMounted, watchEffect } from "vue";
import { useQuestionsStore } from "#store/questions";
import { SCORM } from "pipwerks-scorm-api-wrapper";

const props = defineProps(["questionData", "courseData", "aID", "answers"]);
const answer = inject("answer");

const questions = useQuestionsStore();
const { getQuestion } = questions;

watchEffect(() => {
  getQuestion(props.questionData.id).learnerResponse = answer.value;
  debug.log(answer.value);
});

onMounted(() => {
  if (
    getQuestion(props.questionData.id) &&
    getQuestion(props.questionData.id).learnerResponse
  ) {
    debug.log(getQuestion(props.questionData.id).learnerResponse);
    answer.value = getQuestion(props.questionData.id).learnerResponse;
  }
});

onBeforeUnmount(() => {
  const { id, sID } = props.questionData;
  let responses = [...getQuestion(id).responses];
  const caseMatters = responses.shift();
  const orderMatters = responses.shift();
  let correctArray = responses;

  if (!caseMatters) {
    correctArray = correctArray.map((x) => x.toLowerCase());
    answer.value = answer.value.map((x) => x.toLowerCase());
    debug.log(JSON.stringify(answer.value));
  }

  let correct = true;
  if (orderMatters) {
    answer.value.forEach((x, index) => {
      if (x != correctArray[index]) {
        correct = false;
        return;
      }
    });
  } else {
    answer.value.forEach((x) => {
      if (!correctArray.includes(x)) {
        correct = false;
        return;
      }
    });
  }

  getQuestion(id).correct = correct;
  let lr = `orderMatters=${orderMatters}[,]caseMatters=${caseMatters}`;
  answer.value.forEach((x) => {
    lr += "[,]" + x;
  });

  if (answer.value.length > 0) {
    SCORM.set("cmi.interactions." + (sID + 1) + ".learner_response", lr);
  }
  SCORM.set(
    "cmi.interactions." + (sID + 1) + ".result",
    correct ? "correct" : "incorrect",
  );
});
</script>
<template>
  <Base :questionData :aID="aID" class="h-full">
    <p
      class="m-auto w-2/3 text-center text-2xl font-bold leading-10 text-aliceblue">
      <slot></slot>
    </p>
  </Base>
</template>
