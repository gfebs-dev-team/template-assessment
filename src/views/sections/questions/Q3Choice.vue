<script setup>
import { QuestionChoice } from "$components/question";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";

let questionData = {
  type: "true-false",
  query:
    "The United States Treasury is one of the key financial organizations interacting with GFEBS by serving as the central bank for all government agencies.",
  responses: [
    { content: "True", value: "true", correct: true },
    { content: "False", value: "false" },
  ],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questionData = questions.addQuestion(questionData);
});
</script>
<template>
  <QuestionChoice :questionData />
</template>
