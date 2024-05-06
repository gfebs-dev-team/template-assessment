<script setup>
import AppButton from "$components/AppButton.vue";

const props = defineProps(["isexit", 'courseData']);
const emit = defineEmits(["exit"]);
</script>

<template>
  <div
    class="flex w-full min-h-16 bg-spacecadet justify-end items-center p-4 z-10"
  >
    <div class="flex w-full items-center gap-4 py-2">
      <img class="h-10" src="/assets/crest.svg" />
      <div class="">
        <h1 class="text-aliceblue text-sm font-bold uppercase">
          Financial Management School
        </h1>
        <h2 class="text-saffron font-bold text-xs uppercase">
          GFEBS {{ courseData.courseCode }} {{ courseData.courseTitle }}
        </h2>
      </div>
    </div>
    
  </div>
</template>
