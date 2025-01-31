<script setup>
import { MatchingDropdown } from "#components/question/matching";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "#store/questions";

let questionData = {
  type: "matching",
  query:
    "This is a matching dropdown question. It uses the MatchingDropdown component.",
  pairs: [
    {
      a: "This is the first query",
      b: "This is the first answer",
    },
    {
      a: "This is the second query",
      b: "This is the second answer",
    },
    {
      a: "This is the third query",
      b: "This is the third answer",
    },
    {
      a: "This is the fourth query",
      b: "This is the fourth answer",
    },
  ],
};

const questions = useQuestionsStore();

onBeforeMount(() => {
  questionData = questions.addQuestion(questionData);
});
</script>
<template>
  <MatchingDropdown aID="B04T2" :questionData />
</template>
