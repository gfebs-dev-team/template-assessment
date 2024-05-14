<script setup>
import { QuestionChoice } from "$components/question";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";

const questionData = {
  id: 0,
  type: "choice",
  query: "What is the answer to this question?",
  responses: [
    {
      content: "a. Process JVs",
      value: "a",
      correct: true,
    },
    { content: "b. Maintain GL accounts", value: "b" },
    { content: "c. Execute period-end/year closing", value: "c" },
    { content: "d. All of the above", value: "d" },
  ],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData, 0);
});

</script>
<template>
  <QuestionChoice :questionData/>
</template>
