<script setup>
import { useTestStore } from '../stores/test'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import UnitHeader from '../components/UnitHeader.vue'

const test = useTestStore()
const { getScore } = test
const { complete } = storeToRefs(test);
onMounted(()=>{
  complete.value = false;
})
defineProps(['unit'])
</script>

<template>
  <UnitHeader :unit="unit" />
  <section id="test-content">
    <h2>Assessment Results</h2>
    <p>
      You have completed the Financials Process Overview Course Assessment. Below is your assessment
      score. Click the <strong>Exit</strong> button to complete the test.
    </p>
    <h3>Score: {{ getScore() * 100 }}%</h3>
  </section>
</template>

<style scoped lang="scss">
#test-content {
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  padding: 3em;
  gap: 2em;
  height:100%;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  h2 {
    font-weight: bold;
    font-size: 2em;
    color: red;
  }
  p {
    width: 40em;
    font-size: 1.2em;
    strong {
      font-weight: bold;
    }
  }

  h3 {
    font-weight: bold;
    font-size: 1.6em;
  }
}
</style>
