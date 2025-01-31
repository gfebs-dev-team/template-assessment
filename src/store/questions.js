import { defineStore } from "pinia";
import { ref, markRaw, reactive, shallowRef, computed } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import questions from "#/views/sections/questions";
import simulations from "#views/sections/simulations";

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
  const viewed = ref(0);
  const current = shallowRef(simsComp.value[0]);
  const questionsList = ref(new Array());
  const total = questionsComp.value.length + simsComp.value.length;
  const qtotal =
    questionsComp.value.length +
    simsComp.value.filter(
      (s) => s.__name.startsWith("Q") && !s.__name.endsWith("T"),
    ).length;
  const sidebarState = ref(false);
  const next = computed(() => currIndex.value < total - 1);
  const prev = computed(
    () => currIndex.value > 0 && !inSimulation(currIndex.value - 1),
  );
  const disclaimer = ref(false);
  const currInSimulation = computed(() => {
    return inSimulation(currIndex.value);
  });
  const sessionTime = reactive({
    start: 0,
    end: 0,
  });

  function addQuestion(obj) {
    let data = obj;
    data.id = currIndex.value;
    if (obj.type == "choice") {
      data.correctResponse = getChoiceCorrect(data.responses);
    }

    if (obj.type == "performance") {
      data.action = { action: "", value: "" };
    }

    if (obj.type == "matching") {
      let correctResp = "";
      data.pairs.forEach((p, index) => {
        if (index != 0) {
          correctResp += "[,]";
        }
        correctResp += p.a + "[.]" + p.b;
      });

      data.correctResponse = correctResp;
    }

    if (obj.type == "sequencing") {
      let correctResp = "";
      data.sequence.forEach((p, index) => {
        if (index != 0) {
          correctResp += "[,]";
        }
        correctResp += p;
      });

      data.correctResponse = correctResp;
    }

    if (obj.type == "fill-in") {
      data.correctResponse = `{case_matters=${data.responses.shift()}}{order_matters=${data.responses.shift()}}${data.responses.length > 1 ? data.responses.map((x) => x + "[,]") : data.responses[0]}`;
    }

    if (questionsList.value[data.id] == null) {
      questionsList.value.push(data);
    }
    return data;
  }

  function getQuestion(index) {
    return questionsList.value[index];
  }

  function goNext() {
    const simL = simsComp.value.length;
    const questL = questionsComp.value.length;
    const q = getQuestion(currIndex.value);
    console.log(questionsList.value[currIndex.value]);

    if (
      currIndex.value < simL - 1 &&
      !simsComp.value[currIndex.value].__name.startsWith("Q")
    ) {
      currIndex.value++;
      current.value = simsComp.value[currIndex.value];
      return;
    }

    if (q.type == "performance") {
      if (q.action) {
        saveLearnerActions();
      } else {
        q.learnerResponse = "";
      }
    }

    if (currIndex.value + 1 < simL) {
      if (needsDisclaimer()) {
        disclaimer.value = true;
      } else {
        disclaimer.value = false;
        currIndex.value++;
        current.value = simsComp.value[currIndex.value];
      }
    } else if (currIndex.value - simL < questL) {
      if (needsDisclaimer()) {
        disclaimer.value = true;
      } else {
        disclaimer.value = false;
        currIndex.value++;
        current.value = questionsComp.value[currIndex.value - simL];
      }
    }
    console.log(questionsList.value[currIndex.value].action);
  }

  function goPrev() {
    const simL = simsComp.value.length;
    const questL = questionsComp.value.length;
    disclaimer.value = false;

    if (currIndex.value - 1 < simL) {
      currIndex.value--;
      current.value = simsComp.value[currIndex.value];
    } else if (currIndex.value - simL < questL) {
      disclaimer.value = false;
      currIndex.value--;
      current.value = questionsComp.value[currIndex.value - simL];
    }
  }

  function goToQuestion(i) {
    const simL = simsComp.value.length;
    const questL = questionsComp.value.length;

    if (i > viewed.value + 1) {
      return;
    }

    if (currIndex.value < simL && simsComp[currIndex].__name.startsWith("Q")) {
      saveLearnerActions();
    }
    if (i < simL) {
      currIndex.value = i;
      current.value = simsComp.value[i];
    } else if (currIndex.value - simL < questL) {
      currIndex.value = i;
      current.value = questionsComp.value[i - simL];
    }
    toggleSidebar();
  }

  function inSimulation(n) {
    if (questionsList.value[n] != undefined) {
      // console.log(questionsList.value[n].type);
      console.log(`${n}: ${getQuestion(n).type}`);
      return (
        questionsList.value[n].type == "performance" ||
        questionsList.value[n].type == "content"
      );
    }
  }

  function toggleSidebar() {
    sidebarState.value = !sidebarState.value;
  }

  function needsDisclaimer() {
    if (getQuestion(currIndex.value).type == "content") {
      return false;
    } else {
      return (
        disclaimer.value == false &&
        (!getQuestion(currIndex.value) ||
          getQuestion(currIndex.value).learnerResponse == undefined)
      );
    }
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

  function getChoiceCorrect(responses) {
    let correct = "";
    responses.forEach((r) => {
      if (r.correct) {
        if (correct !== "") {
          correct += "[,]";
        }
        correct += r.value;
      }
    });

    return correct;
  }

  function actionHandler(a, v) {
    const action = {
      action: a,
      value: v,
    };
    questionsList.value[currIndex.value].action = action;
    console.log(currIndex.value + ": " + a + " " + v);
    return true;
  }

  function saveLearnerActions() {
    let currSim = questionsList.value[currIndex.value];
    if (currSim.action == undefined) {
      currSim.action = { action: "null", value: "null" };
    }
    let lr = `[.]${currSim.action.action} ${currSim.action.value}`;
    questionsList.value[currIndex.value].learnerResponse = lr;
    currSim.responses.forEach((r) => {
      let res = r.replace(/{.*}/, "");
      if (res == lr) {
        questionsList.value[currIndex.value].correct = true;
      }
    });
    SCORM.set(
      "cmi.interactions." + (currIndex.value + 1) + ".learner_response",
      lr,
    );
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

  function resetSim() {
    questionsList.value[currIndex.value].actions = new Array();
  }

  return {
    currIndex,
    total,
    questionsComp,
    simsComp,
    questionsList,
    disclaimer,
    currInSimulation,
    next,
    prev,
    sidebarState,
    sessionTime,
    current,
    viewed,
    qtotal,
    resetSim,
    goToQuestion,
    shuffleQuestions,
    getQuestion,
    getChoiceCorrect,
    inSimulation,
    actionHandler,
    saveLearnerActions,
    getSession,
    setSession,
    needsDisclaimer,
    getTitle,
    toggleSidebar,
    addQuestion,
    goNext,
    goPrev,
  };
});
