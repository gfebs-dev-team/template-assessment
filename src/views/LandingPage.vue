<script setup>
import AppButton from "$components/AppButton.vue";
import AppHeader from "$components/AppHeader.vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { onMounted } from "vue";

onMounted(()=>{
  SCORM.init()
})

function quit() {
  
}

defineEmits(['start']);
defineProps(['courseData']);
</script>

<template>
  <div class="bg-oxfordblue h-[100dvh] flex flex-col md:gap-0">
    <AppHeader :course-data :isexit="true" @exit="quit()"></AppHeader>
    <!--PAGE CONTENT-->
    <section
      class="bg-oxfordblue h-full scroll-auto p-4 flex flex-col justify-center md:items-center md:gap-8 md:absolute md:w-screen"
    >
      <!-- <div class="flex flex-col items-center gap-2 md:gap-4">
        <h1
          class="text-aliceblue text-xl font-bold text-center uppercase md:text-4xl"
        >
          Financial Management School
        </h1>
        <h2
          class="text-saffron text-md font-bold text-center uppercase md:text-2xl"
        >
          GFEBS {{ courseData.courseCode }} {{ courseData.courseTitle }}
        </h2>
      </div> -->
      <div class="p-2 space-y-4 md:flex md:max-w-screen-lg">
        
        <div class="flex flex-col justify-center items-center gap-2 md:gap-6">
          <p class="text-aliceblue text-md text-center md:text-lg">
            Welcome to the <span class="font-bold text-harvestgold">{{ courseData.topic }}</span> for General Fund Enterprise Business
            System {{ courseData.courseCode }} {{ courseData.courseTitle }}. This assessment will
            determine your knowledge of the concepts and procedures of GFEBS {{ courseData.courseTitle }}.
          </p>
          <p class="text-coolgrey text-sm font-bold text-center md:text-md">
            NOTE: You may not communicate with other students, give or receive
            assistance, make a personal record of your answers, and pass on
            information about the tests to other students. Failure to follow
            these instructions will result in the appropriate disciplinary
            actions being taken.
          </p>
          <AppButton
            class="bg-spacecadet text-aliceblue text-sm py-1 px-4 w-min flex-grow-0 mt-4"
            @click="$emit('start')"
            >Start</AppButton
          >
        </div>
      </div>
    </section>
  </div>
</template>
