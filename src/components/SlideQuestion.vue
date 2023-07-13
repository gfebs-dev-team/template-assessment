<script setup>
import UnitHeader from './UnitHeader.vue'
import { useTestStore } from '../stores/test'
import { watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'

const test = useTestStore()
const { current, questionList } = storeToRefs(test)
const currentQuestion = questionList.value[current.value]
const answer = inject('answer')

onMounted(() => {
  //console.log(questionList.value[current.value].user);
  if (currentQuestion.user != '') {
    answer.value = currentQuestion.user
  }
})

watch(answer, () => {
  questionList.value[current.value].user = answer.value
  test.updateAnswer()
})

defineProps(['title', 'unit'])
</script>

<template>
  <UnitHeader :unit="unit"></UnitHeader>
  <div class="slide">
    <h2 class="slide-header">{{ title }}</h2>
    <div class="content">
      <ul class="options">
        <slot name="options"></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide {
  display: flex;
  flex-direction: column;
  padding: 3em;
  gap: 1em;

  h2 {
    font-weight: bold;
    font-size: 1.8em;
    color: red;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1em;
    font-size: 1.2em;
    .options {
      display: flex;
      gap: 0.5em;
      flex-direction: column;
      list-style-type: none;
      margin-left: -1rem;
      margin-right: 1rem;
      :slotted(.choice) {
        display: flex;
        padding: 0.5em;
        width: 100%;
        gap: 1em;
        input[type='radio']:checked + label {
          color: rgba(11, 69, 194, 1);
          font-weight: bold;
        }
        label {
          width: 100%;
          &:hover {
            color: rgba(11, 69, 194, 1);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
@/stores/test
