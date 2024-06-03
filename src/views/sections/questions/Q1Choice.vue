<script setup>
import { QuestionChoice } from "$components/question";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";

let questionData = {
  type: "choice",
  query: "How does the Army manage the General Fund GL?",
  responses: [
    { content: "a. Process JVs", value: "a" },
    { content: "b. Maintain GL accounts", value: "b" },
    { content: "c. Execute period-end/year closing", value: "c" },
    { content: "d. All of the above", value: "d", correct: true },
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
