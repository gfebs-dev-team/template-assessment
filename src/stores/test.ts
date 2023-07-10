import { defineStore } from 'pinia'
import { ref } from 'vue'
import questions from '../assets/questions.json'

export const useTestStore = defineStore('test', () => {
  const current = ref(0)
  const totalSlides = questions.length
  const questionList = ref(questions)
  const checkpoint = ref(totalSlides + 1)
  const next = ref(false)
  const prev = ref(true)

  function goNext() {
    current.value++
  }

  function goPrev() {
    current.value--
  }

  function disableNext() {
    next.value = true
  }

  function enableNext() {
    next.value = false
  }

  function disablePrev() {
    prev.value = true
  }

  function enablePrev() {
    prev.value = false
  }

  /**function setTrue() {
    questionList.value[current.value].viewed = true
    //console.log(slidesList.value[current.value]);
  }
  function setFalse() {
    questionList.value[current.value].viewed = false
    //console.log(slidesList.value[current.value].viewed);
  }

  function setCheckpoint() {
    for (let i = 0; i < totalSlides; i++) {
      if (questionList.value[i].type === 'question' && questionList.value[i].viewed === false) {
        checkpoint.value = i
        console.log(questionList.value[i].type)
        console.log(questionList.value[i].viewed)
        console.log('Checkpoint: ' + checkpoint.value)
        return
      }
    }
    checkpoint.value = totalSlides + 1
    console.log('Checkpoint: ' + checkpoint.value)
  }**/

  return {
    current,
    totalSlides,
    questionList,
    checkpoint,
    next,
    prev,
    disableNext,
    disablePrev,
    enableNext,
    enablePrev,
    goNext,
    goPrev
  }
})
