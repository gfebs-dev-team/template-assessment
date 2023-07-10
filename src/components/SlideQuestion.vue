<script setup lang="ts">
import { useTestStore } from '@/stores/test'
import { ref, watch, onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import { inject } from 'vue';

const slides = useTestStore()
const { current, questionList } = storeToRefs(slides)
const image = ref('qanda.png');
const currentQuestion = questionList.value[current.value]

defineProps<{
  title?: string
  unit?: string
}>()

const answer: Ref<string> = inject("answer")

onMounted(()=> {
  if (currentQuestion.user != "") {
    answer.value = currentQuestion.user;
  }
  if (currentQuestion.viewed) {
    slides.enableNext()
  } else {
    slides.disableNext()
  }
})
watch(answer, ()=> {
  slides.setTrue();
  slides.setCheckpoint();
  if(answer.value === currentQuestion.answer) {
    image.value = 'correct.png'
    questionList.value[current.value].user = answer;
    slides.enableNext()
  } else {
    image.value = 'incorrect.png'
    slides.disableNext()
    questionList.value[current.value].user = answer;
  }
});

</script>

<template>
  <div class="unit-header">
    <h1>{{ unit }}</h1>
  </div>
  <div class="slide">
    <h2 class="slide-header">{{ title }}</h2>
    <div class="content">
      <div class="left-column">
        <h3><slot name="question"></slot></h3>

        <ul class="options">
          <slot name="options"></slot> 
        </ul>
      </div>

      <div class="right-column">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.unit-header {
  width: 100%;
  background-color: #414141;
  padding: 0.2em 2em;
  h1 {
    color: white;
    text-align: right;
    font-weight: 400;
  }
}
.slide {
  display: flex;
  flex-direction: column;
  padding: 2em;
  gap: 1em;

  h2 {
    font-weight: bold;
    font-size: 2em;
    color: red;
  }
  .content {
    display: flex;
    flex-direction: row;
    gap: 1em;
    font-size: 1.2em;

    .left-column {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 1em;
      .options {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin-left: -1rem;
      }
    }

    .right-column {
      width: 25em;
    }
  }
}
</style>
@/stores/test