<script setup>
import AppButton from "@components/AppButton.vue";
import AppHeader from "@components/AppHeader.vue";
import { ref } from "vue";
import essentialsGraphic from "@assets/essentials-introduction-slide01-multiple.svg";

const page = ref(0);

defineEmits(["start", "exit"]);
defineProps(["courseData"]);
</script>

<template>
  <section class="flex h-dvh flex-col bg-oxfordblue md:gap-0">
    <AppHeader :course-data :isexit="true" @exit="$emit('exit')"></AppHeader>
    <!--PAGE CONTENT-->
    <div
      class="flex h-full flex-col justify-center gap-4 scroll-auto bg-oxfordblue p-4 md:absolute md:w-screen md:items-center md:gap-8">
      <!-- PAGE 1 -->
      <div
        v-show="page === 0"
        class="space-y-4 p-2 md:grid md:max-w-screen-lg md:grid-cols-[25rem_auto] md:gap-6 xl:h-full xl:items-center">
        <img
          class="hidden h-96 object-contain md:block"
          src="/assets/crest.svg"
          alt="crest" />
        <div class="flex flex-col items-center justify-center gap-2 md:gap-6">
          <p class="text-md text-center text-aliceblue md:text-xl">
            Welcome to the
            <span class="font-bold text-harvestgold">{{
              courseData.topic
            }}</span>
            for General Fund Enterprise Business System
            {{ courseData.courseCode }}
            {{ courseData.courseTitle }}. This assessment will determine your
            knowledge of the concepts and procedures of GFEBS
            {{ courseData.courseTitle }}.
          </p>
          <p class="text-md text-center text-aliceblue md:text-xl">
            Select the Next button to continue
          </p>

          <p class="md:text-md text-center text-sm font-bold text-coolgrey">
            NOTE: You may not communicate with other students, give or receive
            assistance, make a personal record of your answers, and pass on
            information about the tests to other students. Failure to follow
            these instructions will result in the appropriate disciplinary
            actions being taken.
          </p>
          <AppButton
            class="md:text-md mt-4 w-min flex-grow-0 border-transparent bg-spacecadet px-4 py-1 text-sm text-aliceblue md:px-6 md:py-2"
            @click="page = 1"
            >Next</AppButton
          >
        </div>
      </div>

      <!-- PAGE 2 -->
      <div
        v-show="page === 1"
        class="data-[page!=0]:hidden space-y-4 p-2 md:grid md:max-w-screen-lg md:grid-cols-[25rem_auto] md:gap-6 xl:h-full xl:items-center">
        <img
          class="hidden h-96 object-contain md:block"
          :src="essentialsGraphic"
          alt="crest" />
        <div
          class="flex flex-col items-center justify-center gap-2 text-center text-base text-aliceblue md:gap-6 md:text-lg">
          <p>
            You will be asked a series of scenario-based questions and should
            choose the best reponse to each question.
          </p>
          <p>
            The passing grade for this
            <span class="font-bold text-harvestgold">{{
              courseData.topic
            }}</span>
            is 80 percent. You will have unlimited attempts, but you must pass
            the test to complete the course.
          </p>

          <p>You will receive your grade at the end of the test.</p>
          <p>Click <span class="font-bold">START</span> button to begin</p>
          <AppButton
            class="md:text-md mt-4 w-min flex-grow-0 border-transparent bg-spacecadet px-4 py-1 text-sm text-aliceblue md:px-6 md:py-2"
            @click="$emit('start')"
            >Start</AppButton
          >
        </div>
      </div>
    </div>
  </section>
</template>
