<script setup>
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import { watch, onMounted } from "vue";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
} from "@remixicon/vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";

const props = defineProps(["sidebarState"]);
const questions = useQuestionsStore();
const { current, checkpoint, questionsList, questionsComp } = storeToRefs(questions);

let links = questionsComp.value;

function goToQuestion(i) {
  current.value = i;
  questions.toggleSidebar();
}

function getCompletion(i) {
  if (questionsList.value[i] && questionsList.value[i].learnerResponse) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <section
    id="sidebar"
    class="flex absolute h-full w-64 bg-spacecadet p-6 transition z-10"
    v-bind:class="{ '-translate-x-64': !sidebarState }">
    <div class="links w-full overflow-auto flex flex-col gap-2">
      <div
        class="hover:m-y-2 flex w-full items-center justify-between"
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
