<script setup>
import { Assessment } from "$components/assessment";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";

const questions = useQuestionsStore();
const { current, questionsComp } = storeToRefs(questions);

defineProps(["courseData"]);
defineEmits(["exit"]);
</script>

<template>
  <Assessment :courseData @exit="$emit('exit')">
    <TransitionGroup
      name="fade"
      enter-active-class="transition-opacity duration-500 ease-in-out"
      leave-active-class="transition-opacity duration-500 ease-in-out"
      enter-from-class="absolute opacity-0"
      leave-to-class="absolute opacity-0">
      <template v-for="(question, index) in questionsComp" :key="index">
        <component :is="question" v-if="index == current && question" />
      </template>
    </TransitionGroup>
  </Assessment>
</template>
