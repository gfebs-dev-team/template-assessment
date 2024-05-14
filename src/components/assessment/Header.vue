<script setup>
import AppButton from "$components/AppButton.vue";
import AppHeader from "$components/AppHeader.vue";
import { RiMenuLine } from "@remixicon/vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import {useQuestionsStore} from "$store/questions.js";

const questions = useQuestionsStore();
const props = defineProps(["courseData"]);
const emits = defineEmits(["toggleSidebar"]);

function quit() {
  SCORM.save();
  SCORM.quit();
}


</script>

<template>
  <AppHeader :courseData @exit="quit()">
    <div
      class="flex h-16 w-full items-center gap-4 border-t border-masblue p-4 shadow-md transition">
      <RiMenuLine
        @click="$emit('toggleSidebar')"
        class="size-6 fill-coolgrey p-1 hover:cursor-pointer"></RiMenuLine>
      <h2 class="text-balance text-xs font-bold uppercase text-coolgrey">
        GFEBS {{ courseData.courseCode }}:
        {{ courseData.courseTitle }}
      </h2>
      <AppButton v-if="questions.current == questions.total-1" class="text-xs px-2 p-1 border-2 border-saffron text-saffron">Submit</AppButton>
    </div>
  </AppHeader>
</template>
