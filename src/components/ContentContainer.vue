<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTestStore } from '@/stores/test'
import ContentHeader from '../components/ContentHeader.vue'
import views from '../views'

var slidesComp = Object.keys(views).map((key) => {
  return views[key]
})

const totalSlides = slidesComp.length
const test = useTestStore()
const { current, next, prev} = storeToRefs(test)
const { goPrev, goNext} = test

watch(current, () => {
  current.value <= 0
    ? prev.value = true
    : prev.value = false
  current.value >= totalSlides
    ? next.value = true
    : next.value = false
})
</script>

<template>
  <main>
    <ContentHeader>GFEBS L210E Financials Process Overview</ContentHeader>
    <div class="layout">
      <button class="nav-btn" id="prev" @click="goPrev" :disabled="prev">
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
        <SideBar title="Introduction to Financials"></SideBar>
        <component :is="slidesComp[current]"></component>
      </div>
      <button class="nav-btn" id="next" @click="goNext" :disabled="next">
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
</style>
@/stores/test