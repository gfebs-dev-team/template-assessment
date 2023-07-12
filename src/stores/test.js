import { defineStore } from 'pinia'
import { ref } from 'vue'
import views from "../views";
import { storeDataValue } from '../assets/APIWrapper.js'

export const useTestStore = defineStore('test', () => {
  const current = ref(0)
  const questionList = ref(new Array)
  const slidesComp = Object.keys(views).map((key) => {
    return views[key]
  });
  const totalSlides = slidesComp.length;

  // This method only adds questions to scorm once they're loaded to the user. This reduces the amount of times we need to store the question data but may lead to problems in testing.
  
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

  function addQuestion(q, t, o , a, v) {
    questionList.value[current.value] = {
      "question": q,
      "type": t,
      "options": o,
      "answer": a,
      "viewed": v
    };
  }

  function setInteractions() {
    const id = current.value;
    const questionStart = new Date()
    const timestamp =
      questionStart.toISOString().slice(0, questionStart.toISOString().indexOf('.') + 2) + 'Z'
    questionList.value[id].startTime = new Date(questionStart);
    storeDataValue('cmi.interactions.' + id + '.id', 'question_' + id);
    storeDataValue('cmi.interactions.' + id + '.timestamp', timestamp);
    storeDataValue('cmi.interactions.' + id + '.type', questionList.value[id].type)
    questionList.value[id].answer.forEach((answer, i) => {
      storeDataValue('cmi.interactions.' + id + '.correct_responses.' + i + '.pattern', answer)
    })
  }

  function updateAnswer() {
    storeDataValue('cmi.interactions.'+ current.value +'.learner_response', questionList.value[current.value].user);
  }

  return {
    current,
    totalSlides,
    questionList,
    next,
    prev,
    updateAnswer,
    addQuestion,
    setInteractions,
    disableNext,
    disablePrev,
    enableNext,
    enablePrev,
    goNext,
    goPrev
  }
})
