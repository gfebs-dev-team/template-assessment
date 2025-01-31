<script setup>
import { QuestionFill, QuestionInput } from "#components/question";
import { onBeforeMount, ref, provide } from "vue";
import { useQuestionsStore } from "#store/questions";

let questionData = {
  type: "fill-in",
  query: "Fill in the blank to complete the sentence.",
  responses: [true, true, "allotment"], //caseMatters, orderMatters, answers, ...
};
const answer = ref([""]);
provide("answer", answer);
const questions = useQuestionsStore();
onBeforeMount(() => {
  questionData = questions.addQuestion(questionData);
  // console.log(questionData.learnerResponse);
});
</script>
<template>
  <QuestionFill aID="B02T0" :questionData>
    At each level of funds distribution, an edit check is performed against the
    Annual Funding Program (AFP) to ensure that the
    <QuestionInput v-model="answer[0]" :value="answer[0]" /> transfer amount is
    not greater than the AFP at any point in the distribution process.
  </QuestionFill>
</template>
