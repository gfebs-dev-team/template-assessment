<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { useQuestionsStore } from "$store/questions";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiRestartLine,
  RiAccountCircleFill,
  RiPushpinFill,
  RiCloseLine,
  RiLoopLeftLine,
} from "@remixicon/vue";

const questions = useQuestionsStore();
const { getQuestion } = questions;
const props = defineProps(["questionData", "url", "title"]);
const emits = defineEmits(["resetSim"]);
let questionStart, questionEnd;

onMounted(() => {
  const { id, type } = props.questionData;
  const responses = props.questionData.responses;
  questionStart = new Date();
  const timestamp =
    questionStart
      .toISOString()
      .slice(0, questionStart.toISOString().indexOf(".") + 2) + "Z";

  SCORM.set("cmi.interactions." + (id + 1) + ".id", "question_" + (id + 1));
  SCORM.set("cmi.interactions." + (id + 1) + ".timestamp", timestamp);
  SCORM.set("cmi.interactions." + (id + 1) + ".type", type);
  responses.forEach((r, i) => {
    SCORM.set(
      "cmi.interactions." + (id + 1) + ".correct_responses." + i + ".pattern",
      r,
    );
  });
});

onBeforeUnmount(() => {
  questionEnd = new Date();
  const lT = (Math.round((questionEnd - questionStart) / 1000) * 100) / 100;
  const latency = "PT" + lT + "S";

  SCORM.set(
    "cmi.interactions." + (props.questionData.id + 1) + ".latency",
    latency,
  );
});

const responseHistory = ref(false);
function toggleResponseHistory() {
  responseHistory.value = !responseHistory.value;
}
</script>

<template>
  <section
    class="flex h-full w-full flex-col gap-2 rounded-none p-8 xl:gap-3 xl:px-12 xl:py-8">
    <h3 class="text-base font-bold text-saffron xl:text-lg">
      Scenario {{ questionData.scenario }}: Question {{ questionData.id + 1 }}
    </h3>
    <div class="flex items-center gap-4">
      <h2 class="text-lg font-bold text-aliceblue xl:text-xl">
        {{ questionData.query }} Click
        <span
          class="text-md rounded-sm bg-saffron p-1 font-bold text-oxfordblue"
          >Next</span
        >
        to submit.
      </h2>
      <!-- <div class="group relative flex items-center gap-2">
        <RiLoopLeftLine
          class="size-8 rounded-md bg-saffron fill-oxfordblue p-1"
          @click="$emit('resetSim')" />
        <span
          class="pointer-events-none font-bold text-saffron opacity-0 transition-opacity group-hover:opacity-100">
          Reset Answer</span
        >
      </div> -->
    </div>
    <!-- Mock Web Browswer -->
    <div class="flex h-full w-full flex-col overflow-auto bg-[#DFE1E5]">
      <div class="flex h-10 w-full flex-col p-4">
        <div class="relative flex h-6 justify-between gap-2 bg-[#DFE1E5]">
          <div class="min-w-48 rounded-t-md bg-[#fff] p-1">
            <div
              class="grid h-full min-w-48 grid-cols-[auto_1fr_auto] items-center gap-2">
              <RiPushpinFill class="size-3" />
              <div class="h-fit w-full text-xs">{{ title }}</div>
              <RiCloseLine class="size-3 justify-self-end" color="#5F6367" />
            </div>
          </div>
          <div
            class="absolute -right-2 -top-3 flex h-full gap-2 rounded-t-md p-1">
            <button
              class="h-fit w-full rounded-sm border border-spacecadet border-opacity-30 p-1 text-center text-xs font-bold text-spacecadet active:translate-y-[.1rem]"
              @click="toggleResponseHistory">
              <p>Review Response</p>
            </button>
            <div>
              <div class="group relative w-max">
                <button @click="$emit('resetSim')"><RiLoopLeftLine /></button>
                <span
                  class="z-100 before: pointer-events-none absolute right-0 top-9 flex w-max rounded-md bg-masblue p-1 px-2 text-xs text-aliceblue opacity-0 transition-opacity group-hover:opacity-100">
                  Click here to reset actions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex h-fit items-center gap-2 border-b-2 border-[#adadad65] bg-[#fff] p-2">
        <RiArrowLeftLine color="#5F6367" class="size-4" />
        <RiArrowRightLine color="#5F6367" class="size-4" />
        <RiRestartLine color="#5F6367" class="size-4" />
        <div
          class="flex h-full w-full items-center rounded-full bg-[#F0F3F4] px-2 text-xs">
          {{ url }}
        </div>
        <RiAccountCircleFill color="#5F6367" class="size-4" />
        <div class="flex flex-col gap-[.1rem]">
          <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
          <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
          <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
        </div>
      </div>
      <div class="relative h-full w-full overflow-auto">
        <slot></slot>
        <div
          :data-toggle="responseHistory"
          @click.self="toggleResponseHistory"
          class="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-[#000] bg-opacity-20 backdrop-blur-sm data-[toggle=true]:flex">
          <div
            class="flex h-1/2 w-1/2 flex-col rounded-md bg-spacecadet px-4 py-2">
            <table
              class="text-surface w-full table-fixed border-collapse text-left text-sm font-light text-aliceblue">
              <thead class="border-b border-lavendar border-opacity-40">
                <th scope="col" class="px-6 py-4">#</th>
                <th scope="col" class="px-6 py-4">Action</th>
                <th scope="col" class="px-6 py-4">Value</th>
              </thead>
              <tbody>
                <tr
                  class="border-b border-lavendar border-opacity-40"
                  v-for="(action, index) in getQuestion(questionData.id)
                    ? getQuestion(questionData.id).actions
                    : ['']">
                  <td class="whitespace-nowrap px-6 py-4">{{ index + 1 }}</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ action.action }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ action.value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
