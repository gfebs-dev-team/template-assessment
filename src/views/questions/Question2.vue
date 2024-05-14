<script setup>
// import {QuestionChoice, }
import { useQuestionsStore } from "$store/questions";

const questionData = {
  id: 1,
  query: "What is the answer to this question?",
  type: "choice",
  correctResponses: ['a'],
};

const questions = useQuestionsStore();

questions.addQuestion(questionData, 1);

defineProps(["courseData"]);
</script>
<template>
  <h2 class="text-aliceblue">testing text pt 2</h2>
</template>
