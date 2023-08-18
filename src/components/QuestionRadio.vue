<script setup>
import SlideHeader from './SlideHeader.vue'
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

defineProps(['title', 'topic'])
</script>

<template>
  <SlideHeader :topic="topic"></SlideHeader>
  <div class="slide">
    <h2 class="slide-header">{{ title }}</h2>
    <div class="content">
      <div class="options">
        <slot name="options"></slot>
      </div>
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
      margin-right: 1rem;
      :slotted(.choice) {
        display: flex;
        width: 100%;
        gap: 1em;
        border: 2px solid rgba(11, 69, 194, 0);
        border-radius: 10px;
        transition-duration: 0.2s;

        input[type='radio'] {
          margin-left: 0.5em;
        }

        label {
          width: 100%;
          height: 100%;
          padding: 0.5em;
        }

        &.checked {
          background-color: rgba(11, 69, 194, 0.1);
          border-radius: 10px;
          transition-duration: 0.2s;
          input[type='radio'] + label {
            color: rgba(11, 69, 194, 1);
            padding: 0.5em;
            font-weight: bold;
          }
        }

        &:hover {
          color: rgba(11, 69, 194, 1);
          border: 2px solid rgb(93, 114, 160);
          transition-duration: 0.2s;
          label {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
@/stores/test
