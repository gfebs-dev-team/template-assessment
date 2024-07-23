<script setup>
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
  RiLockFill,
} from "@remixicon/vue";

const props = defineProps(["sidebarState"]);
const questions = useQuestionsStore();
const { current, simsComp, questionsComp, viewed } = storeToRefs(questions);
const { getQuestion, goToQuestion } = questions;

let links = simsComp.value.concat(questionsComp.value);

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
    class="absolute z-20 flex h-full w-64 bg-spacecadet p-6 pt-0 transition xl:bg-masblue xl:py-2"
    v-bind:class="{ '-translate-x-64': !sidebarState }">
    <div class="links flex w-full flex-col gap-2 overflow-auto">
      <h2 class="py-2 text-lg font-bold text-saffron">Question Bank</h2>
      <template v-for="(question, index) in links">
        <div
          class="link hover:m-y-2 flex w-full items-center justify-between gap-2 pl-3"
          :key="index"
          v-if="
            !question.__name.includes('Simulation') &&
            !question.__name.startsWith('A')
          ">
          <a
            class="w-full text-sm font-bold text-aliceblue xl:text-base"
            :class="{
              'text-saffron': current == index,
              'text-coolgrey': index > viewed + 1,
            }"
            @click="goToQuestion(index)">
            Question {{ index + 1 }}
          </a>
          <RiCheckboxBlankCircleFill
            class="size-4"
            v-if="!getCompletion(index) && index <= viewed + 1"
            color="#C91D1D" />
          <RiCheckboxCircleFill
            class="size-4"
            v-if="getCompletion(index) && index <= viewed + 1"
            color="#5EB234" />
          <RiLockFill class="size-4 fill-aliceblue" v-if="index > viewed + 1" />
        </div>
      </template>
    </div>
  </section>
</template>
