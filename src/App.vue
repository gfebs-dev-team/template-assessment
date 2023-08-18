<script setup>
import TheContainer from './components/TheContainer';
import LandingPage from './pages/LandingPage'
import { onMounted, shallowRef } from 'vue'
import { SCORM } from 'pipwerks-scorm-api-wrapper';

onMounted(() => {
  SCORM.init();

  console.log(`the component is now mounted.`);
  
  const terminationEvent = "onpagehide" in self ? "pagehide" : "unload";

      window.addEventListener(terminationEvent, () => {
        SCORM.set("cmi.completion_status", "incomplete");
        SCORM.set("cmi.success_status", "unknown");
        SCORM.set("cmi.exit", "normal");
        SCORM.save();
        SCORM.quit()
      });
})

const current = shallowRef(LandingPage);
const courseData = {
  "courseCode": "L210E",
  "courseTitle": "Financials Process Overview",
  "topic": "Finance"
}
</script>

<template>
    <component :is="current" v-bind="courseData">
        <button id="content-start" class="btn-med" @click="current = TheContainer">Start</button>
    </component>
    <!--<button id="dev" @click="current=TitlePage">Dev Toggle</button>-->
</template>

<style scoped lang="scss">
button#content-start{
 width: fit-content;
 align-self: center;
}
 button#dev {
    position: absolute;
    width: 5em;
    height: 4em;
    bottom: -6em;
 }
</style>