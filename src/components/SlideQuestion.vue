<script setup>
import { useTestStore } from '../stores/test'
import { ref, watch, onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import { inject } from 'vue';

const test = useTestStore()
const { current, questionList } = storeToRefs(test)
const currentQuestion = questionList.value[current.value]

defineProps<{
  title?: string
  unit?: string
}>()

const answer: Ref<string> = inject("answer")!

onMounted(()=> {
  console.log(questionList.value[current.value].user);
  if (currentQuestion.user != "") {
    answer.value = currentQuestion.user!;
  }
})

watch(answer, ()=> {
  questionList.value[current.value].user = answer.value;
  test.updateAnswer();
});

</script>

<template>
  <div class="unit-header">
    <h1>{{ unit }}</h1>
  </div>
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
  padding: 3em;
  gap: 1em;

  h2 {
    font-weight: bold;
    font-size: 2em;
    color: red;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1em;
    font-size: 1.2em;
    .options {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin-left: -1rem;
      }
  }
}
</style>
@/stores/test