import { defineStore } from "pinia";
import { ref, markRaw, reactive } from "vue";
import views from "$views/questions";

export const useQuestionsStore = defineStore("questions", () => {
  const current = ref(0);
  const questionsComp = ref(
    markRaw(
      Object.keys(views).map((key) => {
        return views[key];
      }),
    ),
  );
  const questionsList = ref(new Array());
  const total = questionsComp.value.length;
  const checkpoint = ref(total + 1);
  const sidebarState = ref(false);
  const glossaryState = ref(false);
  const next = ref(true);
  const prev = ref(false);
  const disclaimer = ref(false);
  const sessionTime = reactive({
    start: 0,
    end: 0,
  });

  function addQuestion(obj) {
    if (questionsList.value[obj.id] == null) {
      questionsList.value.push(obj);
    }
  }

  function toggleSidebar() {
    sidebarState.value = !sidebarState.value;
  }

  function needsDisclaimer() {
    if (
      disclaimer.value == false &&
      (!questionsList.value[current.value] ||
        questionsList.value[current.value].learnerResponse == undefined)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function goNext() {
    if (needsDisclaimer()) {
      disclaimer.value = true;
    } else {
      current.value++;
      disclaimer.value = false;
      console.log(current.value);
    }
  }

  function goPrev() {
    current.value--;
    console.log(current.value);
  }

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

  function getTitle() {
    return questionsList.value[current.value].title;
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

  return {
    current,
    total,
    questionsList,
    checkpoint,
    disclaimer,
    next,
    prev,
    sidebarState,
    glossaryState,
    sessionTime,
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
    questionsComp,
  };
});
