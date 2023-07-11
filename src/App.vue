<script setup lang="ts">
import ContentContainer from './components/ContentContainer.vue'
import TitlePage from './components/TitlePage.vue';
import { Initialize, doExit, SetIncomplete } from './assets/scormJS.js'
import { storeDataValue } from  './assets/APIWrapper.js'
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
</script>

<template>
    <component :is="current">
        <button id="content-start" class="btn-med" @click="current = ContentContainer">Start</button>
    </component>
    <button id="dev" @click="current=TitlePage">Dev Toggle</button>
</template>

<style scoped lang="scss">
 button#dev {
    position: absolute;
    width: 5em;
    height: 4em;
    bottom: -6em;
 }
</style>
