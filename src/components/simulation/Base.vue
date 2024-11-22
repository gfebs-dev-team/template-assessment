<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useMouseInElement } from "@vueuse/core";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { useQuestionsStore } from "@store/questions";
import { storeToRefs } from "pinia";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiRestartLine,
  RiAccountCircleFill,
  RiQuestionFill,
  RiCloseLine,
  RiMapPin2Fill,
} from "@remixicon/vue";

const props = defineProps(["questionData", "url", "title", "className", "aID"]);

const questions = useQuestionsStore();
const { getQuestion } = questions;
const emits = defineEmits(["resetSim"]);
let questionStart, questionEnd;
const target = ref(null);
const { x, y, isOutside } = useMouseInElement(target);

onMounted(() => {
  if (
    getQuestion(props.questionData.id) &&
    getQuestion(props.questionData.id).lastMouse
  ) {
    let lastMouse = getQuestion(props.questionData.id).lastMouse;
    let elem = document.getElementById("highlight");
    let style = `top: ${lastMouse.y - 25}px; left: ${lastMouse.x - 10}px;`;
    elem.setAttribute("style", style);
  }
  const { sID, type } = props.questionData;
  const responses = props.questionData.responses;
  questionStart = new Date();
  const timestamp =
    questionStart
      .toISOString()
      .slice(0, questionStart.toISOString().indexOf(".") + 2) + "Z";

  SCORM.set("cmi.interactions." + (sID + 1) + ".id", "question_" + (sID + 1));
  SCORM.set("cmi.interactions." + (sID + 1) + ".timestamp", timestamp);
  SCORM.set("cmi.interactions." + (sID + 1) + ".type", type);
  responses.forEach((r, i) => {
    SCORM.set(
      "cmi.interactions." + (sID + 1) + ".correct_responses." + i + ".pattern",
      r,
    );
  });
});

onBeforeUnmount(() => {
  questionEnd = new Date();
  const lT = (Math.round((questionEnd - questionStart) / 1000) * 100) / 100;
  const latency = "PT" + lT + "S";

  SCORM.set(
    "cmi.interactions." + (props.questionData.sID + 1) + ".latency",
    latency,
  );
});

function clicked() {
  let elem = document.getElementById("highlight");
  let style = `top: ${y.value - 25}px; left: ${x.value - 10}px;`;
  elem.setAttribute("style", style);

  if (!isOutside.value) {
    getQuestion(props.questionData.id).lastMouse = { x: x.value, y: y.value };
  }
  const coord = `[${x.value}, ${y.value}]`;

  if (!getQuestion(props.questionData.id).action) {
    questions.actionHandler("clicked", coord);
  } else if (
    getQuestion(props.questionData.id).action.value.startsWith("[") &&
    getQuestion(props.questionData.id).action.value.endsWith("]")
  ) {
    questions.actionHandler("clicked", coord);
  }
}
</script>

<template>
  <section
    :data-id="aID"
    class="flex h-full w-full flex-col gap-2 rounded-none p-8 xl:gap-3 xl:px-12 xl:py-8">
    <h3 class="text-base font-bold text-saffron">
      Scenario {{ questionData.scenario }}: Question {{ questionData.question }}
    </h3>
    <div class="flex items-center gap-4">
      <h2 class="text-base text-aliceblue">
        {{ questionData.query }} Click
        <span
          class="text-md rounded-sm bg-saffron p-1 font-bold text-oxfordblue"
          >Next</span
        >
        to submit.
      </h2>
    </div>
    <!-- Mock Web Browswer -->
    <div
      class="flex h-full w-full flex-col overflow-auto bg-[#DFE1E5]"
      ref="target"
      @click="clicked()">
      <Teleport to="#app">
        <RiMapPin2Fill
          id="highlight"
          v-show="
            getQuestion(props.questionData.id) &&
            getQuestion(props.questionData.id).lastMouse
          "
          class="stroke-charcoal pointer-events-none fixed z-50 fill-saffron stroke-2" />
      </Teleport>
      <div class="flex h-8 w-full flex-col p-2">
        <div class="relative flex h-6 justify-between gap-2 bg-[#DFE1E5]">
          <div class="min-w-48 rounded-t-md bg-[#fff] p-1 px-2">
            <div
              class="grid h-full min-w-48 grid-cols-[auto_1fr_auto] items-center gap-2">
              <RiQuestionFill class="size-3" />
              <div class="h-fit w-full text-[.7rem]">{{ title }}</div>
              <RiCloseLine class="size-3 justify-self-end" color="#5F6367" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex h-fit items-center gap-2 border-b-2 border-[#adadad65] bg-[#fff] p-2">
        <RiArrowLeftLine color="#5F6367" class="size-3" />
        <RiArrowRightLine color="#5F6367" class="size-3" />
        <RiRestartLine color="#5F6367" class="size-3" />
        <div
          class="flex h-full w-full items-center rounded-full bg-[#F0F3F4] px-2 text-[.65rem]">
          {{ url }}
        </div>
        <RiAccountCircleFill color="#5F6367" class="size-3" />
        <div class="flex flex-col gap-[.05rem]">
          <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
          <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
          <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
        </div>
      </div>
      <div class="relative h-full w-full overflow-auto" :class="className">
        <slot></slot>
      </div>
    </div>
  </section>
</template>
