<script setup>
import { QuestionChoice } from "$components/question";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";

const questionData = {
  id: 2,
  type: "true-false",
  query:
    "Manage GL accounts is the sub-process area responsible for maintaining the GL accounts in GFEBS.",
  responses: [
    { content: "True", value: "true", correct: true },
    { content: "False", value: "false" },
  ],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>
<template>
  <QuestionChoice :questionData />
</template>
