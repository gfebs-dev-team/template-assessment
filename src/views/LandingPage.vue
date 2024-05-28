<script setup>
import AppButton from "$components/AppButton.vue";
import AppHeader from "$components/AppHeader.vue";

defineEmits(["start", "exit"]);
defineProps(["courseData"]);
</script>

<template>
  <section class="flex h-dvh flex-col bg-oxfordblue md:gap-0">
    <AppHeader :course-data :isexit="true" @exit="$emit('exit')"></AppHeader>
    <!--PAGE CONTENT-->
    <div
      class="flex h-full flex-col justify-center gap-4 scroll-auto bg-oxfordblue p-4 md:absolute md:w-screen md:items-center md:gap-8">
      <!-- <div class="flex flex-col items-center gap-2 md:gap-4">
        <h1
          class="text-aliceblue text-2xl text-balance font-bold text-center uppercase md:text-4xl"
        >
          Financial Management School
        </h1>
         <h2
        class="text-saffron text-lg text-balance font-bold text-center uppercase md:text-2xl"
      >
        GFEBS {{ courseData.courseCode }} {{ courseData.courseTitle }}
      </h2>
      </div> -->

      <div class="space-y-4 p-2 md:flex md:max-w-screen-lg">
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
          <p class="md:text-md text-center text-sm font-bold text-coolgrey">
            NOTE: You may not communicate with other students, give or receive
            assistance, make a personal record of your answers, and pass on
            information about the tests to other students. Failure to follow
            these instructions will result in the appropriate disciplinary
            actions being taken.
          </p>
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
