<script setup>
import { MatchingSequence } from "@components/question/matching";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "@store/questions";

const questions = useQuestionsStore();

let questionData = {
  type: "sequencing",
  query: "This is a Sequence question. It uses the MatchingSequence component.",
  sequence: [
    "This is step 1",
    "Next is step 2",
    "Step 3 is this one",
    "Now for step 4",
    "Lastly, for step 5, we end here",
  ],
};

onBeforeMount(() => {
  questionData = questions.addQuestion(questionData);
});
</script>
<template>
  <MatchingSequence aID="B06T4" :questionData></MatchingSequence>
</template>
