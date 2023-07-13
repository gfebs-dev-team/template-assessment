<script setup>
import ContentContainer from './components/ContentContainer.vue'
import TitlePage from './components/TitlePage.vue';
import { storeDataValue, Initialize, doExit, SetIncomplete } from './assets/APIWrapper'
import { onMounted, shallowRef } from 'vue'

onMounted(() => {
  Initialize();
  console.log(`the component is now mounted.`)

  const terminationEvent = "onpagehide" in self ? "pagehide" : "unload";

      window.addEventListener(terminationEvent, () => {
        SetIncomplete();
        storeDataValue("cmi.success_status", "unknown");
        storeDataValue("cmi.exit", "normal");
        doExit();
      });
})

const current = shallowRef(TitlePage);
const course = {
  "unit": "Finance",
  "courseCode": "L210E",
  "courseTitle": "Financials Process Overview"
}
</script>

<template>
    <component :is="current" v-bind="course">
        <button id="content-start" class="btn-med" @click="current = ContentContainer">Start</button>
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