<script setup>
import { onMounted, watch } from 'vue'
import { storeDataValue, Initialize, doExit, SetIncomplete } from  '../assets/APIWrapper'
import { storeToRefs } from 'pinia'
import { useTestStore } from '../stores/test'
import ContentHeader from '../components/ContentHeader.vue'
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
const { current, next, prev, disclaimer} = storeToRefs(test)
const { goPrev, goNext, total} = test

watch(current, () => {
  disclaimer.value = false;
  current.value <= 0
    ? prev.value = true
    : prev.value = false
  current.value >= total - 1
    ? next.value = true
    : next.value = false
})

defineProps(['unit', 'courseCode', 'courseTitle'])

</script>

<template>
  <main>
    <ContentHeader>GFEBS {{ courseCode }} {{ courseTitle }}</ContentHeader>
    <div class="layout">
      <button class="nav-btn" id="prev" @click="goPrev" :disabled="prev" v-if="current != total">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div class="content-box">
        <component :is="slidesComp[current]" v-bind="{'unit' : unit }"></component>
        <p id="disclaimer" v-if="disclaimer">Note: All questions must be answered to receive credit. Assessments with unanswered questions will be marked as a fail.</p>
      </div>
      <button class="nav-btn" id="next" @click="goNext" :disabled="next" v-if="current != total">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
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
  button {
    font-weight: bold;
    color: white;
    background-color: #1ea3de;
    height: 129px;
    border-width: 1px;
    &:disabled {
      background-color: gray;
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