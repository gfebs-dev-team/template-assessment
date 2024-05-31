import { defineStore } from "pinia";
import { ref, markRaw, reactive, shallowRef } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import questions from "$/views/sections/questions";
import simulations from "$views/sections/simulations";

export const useQuestionsStore = defineStore("questions", () => {
  const questionsComp = ref(
    markRaw(
      Object.keys(questions).map((key) => {
        return questions[key];
      }),
    ),
  );
  const simsComp = ref(
    markRaw(
      Object.keys(simulations).map((k) => {
        return simulations[k];
      }),
    ),
  );

  const currIndex = ref(0);
  const current = shallowRef(simsComp.value[0]);
  const questionsList = ref(new Array());
  const total = questionsComp.value.length + simsComp.value.length;
  const sidebarState = ref(false);
  const next = ref(true);
  const prev = ref(false);
  const disclaimer = ref(false);
  const showModal = ref(true);
  const sessionTime = reactive({
    start: 0,
    end: 0,
  });

  // function current() {
  //   const simL = simsComp.value.length;
  //   const questL = questionsComp.value.length;

  //   if (currIndex.value <= simL) {
  //     return simsComp.value[currIndex.value];
  //   } else if (currIndex.value - simL < questL) {
  //     return questionsComp[currIndex.value - simL];
  //   }
  // }

  function goNext() {
    const simL = simsComp.value.length;
    const questL = questionsComp.value.length;

    // console.log(currIndex.value);
    // console.log(simL);
    // console.log(questL);

    if (currIndex.value < simL) {
      saveLearnerActions();
    }

    if (currIndex.value + 1 < simL) {
      console.log("Simualtion");
      if (needsDisclaimer()) {
        disclaimer.value = true;
      } else {
        disclaimer.value = false;
        currIndex.value++;
        current.value = simsComp.value[currIndex.value];
      }
    } else if (currIndex.value - simL < questL) {
      console.log("Question");
      if (needsDisclaimer()) {
        disclaimer.value = true;
      } else {
        disclaimer.value = false;
        currIndex.value++;
        current.value = questionsComp.value[currIndex.value - simL];
      }
    }
  }

  function goPrev() {
    const simL = simsComp.value.length;
    const questL = questionsComp.value.length;
    disclaimer.value = false;

    if (currIndex.value < simL) {
      saveLearnerActions();
    }

    if (currIndex.value - 1 < simL) {
      console.log("Simualtion");
      currIndex.value--;
      current.value = simsComp.value[currIndex.value];
    } else if (currIndex.value - simL < questL) {
      console.log("Question");
      disclaimer.value = false;
      currIndex.value--;
      current.value = questionsComp.value[currIndex.value - simL];
    }
  }

  function goToQuestion(i) {}

  function disableNext() {
    next.value = false;
  }

  function enableNext() {
    next.value = true;
  }

  function disablePrev() {
    prev.value = false;
  }

  function enablePrev() {
    prev.value = true;
  }

  function inSimulation(n) {
    if (questionsList.value[n] != undefined)
      return questionsList.value[n].type == "performance";
  }

  function addQuestion(obj) {
    let data = obj;
    if (obj.type == "performance") {
      data.actions = new Array();
    }
    if (questionsList.value[data.id] == null) {
      questionsList.value.push(data);
      //console.log(questionsList.value[data.id].actions);
    }
  }

  function getQuestion(index) {
    return questionsList.value[index];
  }

  function toggleSidebar() {
    sidebarState.value = !sidebarState.value;
  }

  function needsDisclaimer() {
    return (
      disclaimer.value == false &&
      (!getQuestion(currIndex.value) ||
        getQuestion(currIndex.value).learnerResponse == undefined)
    );
  }

  function getTitle() {
    return questionsList.value[currIndex.value].title;
  }

  function setSession(time) {
    if (time == "start") {
      sessionTime.start = new Date();
    } else if (time == "end") {
      sessionTime.end = new Date();
    }
  }

  function getSession(time) {
    if (time == "start") {
      return sessionTime.start;
    } else if (time == "end") {
      return sessionTime.end;
    }
  }

  function actionHandler(a, v) {
    const action = {
      action: a,
      value: v,
    };
    console.log(action);
    questionsList.value[currIndex.value].actions.push(action);
    console.log(questionsList.value[currIndex.value].actions);
  }

  function saveLearnerActions() {
    let lr = "";
    questionsList.value[currIndex.value].actions.forEach((a, i) => {
      lr += `${i > 0 ? "[,]" : ""}[.]${a.action} ${a.value}`;
    });
    console.log(lr);
    questionsList.value[currIndex.value].learnerResponse = lr;
    SCORM.set(
      "cmi.interactions." + (currIndex.value + 1) + ".learner_response",
      lr,
    );
    console.log(lr);
  }

  function shuffleQuestions() {
    let array = questionsComp.value;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    questionsComp.value = array;
  }

  return {
    currIndex,
    total,
    questionsComp,
    simsComp,
    questionsList,
    disclaimer,
    next,
    prev,
    sidebarState,
    sessionTime,
    current,
    shuffleQuestions,
    getQuestion,
    inSimulation,
    actionHandler,
    saveLearnerActions,
    getSession,
    setSession,
    needsDisclaimer,
    getTitle,
    toggleSidebar,
    addQuestion,
    disableNext,
    disablePrev,
    enableNext,
    enablePrev,
    goNext,
    goPrev,
  };
});
