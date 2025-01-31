<script setup>
import { QuestionChoice } from "#components/question";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "#store/questions";

let questionData = {
  type: "true-false",
  query:
    "This is a true or false question. It uses the QuestionChoice component.",
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
  <QuestionChoice aID="B02T0" :questionData />
</template>
