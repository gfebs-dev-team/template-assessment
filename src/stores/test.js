import { defineStore } from 'pinia'
import { ref } from 'vue'
import views from '../views'
import { storeDataValue } from '../assets/APIWrapper.js'

export const useTestStore = defineStore('test', () => {
  const current = ref(0)
  const questionList = ref(new Array())
  const slidesComp = Object.keys(views).map((key) => {
    return views[key]
  })
  
  const total = slidesComp.length-1
  const disclaimer = ref(false);
  const complete = ref(false)
  const next = ref(false)
  const prev = ref(true)

  function goNext() {
    //add check for if unanswered
    //add check for complete
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

  function getScore(){
    let correct = 0;
    let score = Math.round(correct/total)

    //Check for unanswered question
    //Add SCORM
    return score;
  }

  function addQuestion(q, t, o, a, v) {
    if (questionList.value[current.value] == null) {
      questionList.value[current.value] = {
        question: q,
        type: t,
        options: o,
        answer: a,
        viewed: v
      }
    }
  }

  function setInteractions() {
    const id = current.value
    const questionStart = new Date()
    const timestamp =
      questionStart.toISOString().slice(0, questionStart.toISOString().indexOf('.') + 2) + 'Z'
    questionList.value[id].startTime = new Date(questionStart)
    storeDataValue('cmi.interactions.' + id + '.id', 'question_' + id)
    storeDataValue('cmi.interactions.' + id + '.timestamp', timestamp)
    storeDataValue('cmi.interactions.' + id + '.type', questionList.value[id].type)
    questionList.value[id].answer.forEach((answer, i) => {
      storeDataValue('cmi.interactions.' + id + '.correct_responses.' + i + '.pattern', answer)
    })
  }

  function updateAnswer() {
    storeDataValue(
      'cmi.interactions.' + current.value + '.learner_response',
      questionList.value[current.value].user
    )
  }

  return {
    current,
    total,
    questionList,
    next,
    prev,
    disclaimer,
    complete,
    getScore,
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
