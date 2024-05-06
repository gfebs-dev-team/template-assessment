<script setup>
import AppButton from "$components/AppButton.vue";
import AppHeader from "$components/AppHeader.vue";

const progress = "40%";

defineProps(["courseData"]);
</script>

<template>
  <main>
    <AppHeader/>
    <!-- Header -->
    <nav class="w-screen flex flex-col items-center justify-between p-4 gap-4">
      <!-- <div class="flex w-full items-center gap-4 py-2">
        <img class="h-24" src="/assets/crest.svg" />
        <div class="">
          <h1 class="text-aliceblue text-md font-bold uppercase">
            Financial Management School
          </h1>
          <h2 class="text-saffron font-bold text-sm uppercase">
            GFEBS {{ courseData.courdeCode }} {{ courseData.courseTitle }}
          </h2>
        </div>
      </div> -->
      <!-- Heading -->

      <div class="absolute bottom-0 left-0 w-full h-2 bg-masblue">
        <div class="bg-saffron h-full" :style="`width: ${progress}`"></div>
      </div>
      <div class="flex w-full gap-4">
        <AppButton class="bg-oxfordblue py-2 text-sm text-aliceblue w-full">
          Submit
        </AppButton>
        <AppButton class="bg-oxfordblue py-2 text-sm text-aliceblue w-full">
          Exit
        </AppButton>
      </div>
    </nav>
    <!-- Slide Container -->
    <component />
  </main>
</template>
