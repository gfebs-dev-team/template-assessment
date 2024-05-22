import { defineStore } from "pinia";
import { ref, markRaw } from "vue";
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

  function addQuestion(obj) {
    if (questionsList.value[obj.id] == null) {
      questionsList.value.push(obj);
    }
    //console.log(questionsList.value);
  }

  function toggleSidebar() {
    sidebarState.value = !sidebarState.value;
  }

  function goNext() {
    current.value++;
    console.log(current.value);
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

  return {
    current,
    total,
    questionsList,
    checkpoint,
    next,
    prev,
    sidebarState,
    glossaryState,
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
