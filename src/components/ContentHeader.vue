<script setup>
import { ref, watch } from 'vue'
import { useTestStore } from '../stores/test';
import { storeToRefs } from 'pinia';
import { doExit } from '../assets/APIWrapper';

const test = useTestStore();
const { current } = storeToRefs(test);
const { totalSlides } = test;
let progress = `width: ${(current.value+1/totalSlides)*100}%`;

watch (current, () => {
  progress = `width: ${((current.value+1)/totalSlides)*100}%`;
  document.getElementById("progress")?.setAttribute("style", `${progress}`);
});

function windowClose() {
  doExit();
}
</script>

<template>
  <div class="border"></div>
  <nav>
    <div class="heading">
      <h1 id="heading-title">
        Financial<br />
        Management School
      </h1>
      <h2 id="heading-subtitle">
        <slot></slot>
      </h2>
    </div>
    <img id="heading-shield" src="../assets/shield-01.png" />
    <div class="progress-bar">
      <div id="progress" :style = "progress"></div>
    </div>
    <button id="heading-exit" class="btn-med" @click="windowClose()">X EXIT</button>
  </nav>
</template>

<style scoped lang="scss">
.border {
  background-color: #1ea3de;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2%;
}
nav {
  color: white;
  display: grid;
  grid-template-areas: 'a b d d' 'a b f f';
  grid-template-columns: 120px 1fr repeat(2, 0.3fr);
  justify-content: left;
  margin: 2em 4em;

  #heading-shield {
    grid-area: a;
    width: 100px;
    height: auto;
    align-self: center;
    margin: auto;
  }

  .progress-bar {
    grid-area: d;
    align-self: end;
    width: 100%;
    height: 2em;
    border: 1px solid #ffffff81;
    background-color: #005870;
    border-radius: 10px;
    overflow: hidden;
    #progress {
      height: 100%;
      background-color: #bbcf3e;
    }
  }

  .heading {
    grid-area: b;
    margin: 0% 2%;
    align-self: center;
    #heading-title {
      font-size: 17px;
      letter-spacing: 5px;
      font-weight: bold;
      text-transform: uppercase;
    }
    #heading-subtitle {
      font-weight: bold;
      color: #f5d755;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }

  #heading-index {
    grid-area: e;
    margin-right: 1em;
  }

  #heading-exit {
    display: block;
    grid-area: f;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
@/stores/test../assets/APIWrapper.cjs