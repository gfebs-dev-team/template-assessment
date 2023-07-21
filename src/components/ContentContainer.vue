<script setup>
import { onMounted, watch } from 'vue'
import { storeDataValue, Initialize, doExit, SetIncomplete } from  '../assets/APIWrapper'
import { storeToRefs } from 'pinia'
import { useTestStore } from '../stores/test'
import ContentHeader from '../components/ContentHeader.vue'
import ContentNavigation from './ContentNavigation.vue'
import views from '../views'

var slidesComp = Object.keys(views).map((key) => {
  return views[key]
})

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

const test = useTestStore()
const { current, disclaimer} = storeToRefs(test)


defineProps(['topic', 'courseCode', 'courseTitle'])

</script>

<template>
  <main>
    <ContentHeader>GFEBS {{ courseCode }} {{ courseTitle }}</ContentHeader>
    <div class="layout">
      <ContentNavigation>
      <div class="content-box">
        <component :is="slidesComp[current]" v-bind="{'topic' : topic }"></component>
        <p id="disclaimer" v-if="disclaimer">Note: All questions must be answered to receive credit. Assessments with unanswered questions will be marked as a fail.</p>
      </div>
    </ContentNavigation>
    </div>
  </main>
  <!--<button id="dev" @click="current=total">Result Toggle</button>-->
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.layout {
  position: relative;
  display: grid;
  grid-gap: 1em;
  height: 100%;
  align-items: center;
  grid-template-columns: 2em 1fr 2em;
  grid-template-areas: 'a b c';
  padding: 0em 1em 3em 1em;
  .content-box {
    grid-area: b;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    #disclaimer {
      position: absolute;
      bottom: 1em;
      left: 2em;
    }
  }
}
button#dev {
    position: absolute;
    width: 5em;
    height: 4em;
    left: 6em;
    bottom: -6em;
 }
</style>