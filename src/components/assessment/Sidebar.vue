<script setup>
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
} from "@remixicon/vue";

const props = defineProps(["sidebarState"]);
const questions = useQuestionsStore();
const { current, simsComp, questionsComp } = storeToRefs(questions);
const { getQuestion, goToQuestion } = questions;

let links = questionsComp.value;

function getCompletion(i) {
  if (getQuestion(i) && getQuestion(i).learnerResponse) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <section
    id="sidebar"
    class="absolute z-10 flex h-full w-64 bg-spacecadet p-6 transition xl:bg-masblue"
    v-bind:class="{ '-translate-x-64': !sidebarState }">
    <div class="links flex w-full flex-col gap-2 overflow-auto">
      <div
        class="link hover:m-y-2 flex w-full items-center justify-between"
        v-for="(question, index) in links"
        :key="index">
        <a
          class="text-sm font-bold text-aliceblue"
          :class="{ 'text-saffron': current == index }"
          @click="goToQuestion(index)">
          Question {{ index + 1 }}
        </a>
        <RiCheckboxBlankCircleFill
          class="size-4"
          v-if="!getCompletion(index)"
          color="#C91D1D" />
        <RiCheckboxCircleFill
          class="size-4"
          v-if="getCompletion(index)"
          color="#5EB234" />
      </div>
    </div>
  </section>
</template>
