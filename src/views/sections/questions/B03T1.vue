<script setup>
import { QuestionMultipleCheck } from "#components/question";
import { onBeforeMount } from "vue";

import { useQuestionsStore } from "#store/questions";
const questionData = {
  type: "choice",
  query:
    "This is a multiple check question. It uses the QuestionMultipleCheck component.",
  responses: [
    {
      content: "One",
      value: "a",
      correct: false,
    },
    {
      content: "Two",
      value: "b",
      correct: false,
    },
    {
      content: "Three [true]",
      value: "c",
      correct: true,
    },
    {
      content: "Four [true]",
      value: "d",
      correct: true,
    },
  ],
};

const questions = useQuestionsStore();

onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>

<template>
  <QuestionMultipleCheck aID="B03T1" :questionData />
</template>
