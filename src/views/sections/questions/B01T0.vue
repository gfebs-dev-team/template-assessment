<script setup>
import { QuestionChoice } from "$components/question";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";

let questionData = {
  type: "choice",
  query:
    "This is a multiple choice question. It uses the QuestionChoice component",
  responses: [
    { content: "a. One", value: "a" },
    { content: "b. Two", value: "b" },
    { content: "c. Three", value: "c" },
    { content: "d. Correct", value: "d", correct: true },
  ],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questionData = questions.addQuestion(questionData);
});
</script>
<template>
  <QuestionChoice aID="B01T0" :questionData />
</template>
