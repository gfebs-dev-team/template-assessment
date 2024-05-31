<script setup>
import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiRestartLine,
  RiAccountCircleFill,
  RiPushpinFill,
  RiCloseLine,
} from "@remixicon/vue";

const props = defineProps(["questionData", "actions", "url", "title"]);
let questionStart, questionEnd;
//const {id, type, correctResponses, query } = questionData;

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
      r.value,
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
</script>

<template>
  <section class="flex h-full w-full flex-col gap-2 rounded-none p-8">
    <h3 class="text-md font-bold text-saffron">
      Scenario {{ questionData.scenario }}: Question {{ questionData.id + 1 }}
    </h3>
    <h2 class="text-lg font-bold text-aliceblue">
      {{ questionData.query }} Click
      <span class="text-md rounded-sm bg-saffron p-1 font-bold text-oxfordblue"
        >Next</span
      >
      to submit.
    </h2>
    <!-- Mock Web Browswer -->
    <div class="flex h-full w-full flex-col overflow-auto bg-[#DFE1E5]">
      <div class="flex h-8 w-full flex-col p-2">
        <div class="flex h-6 bg-[#DFE1E5]">
          <div class="min-w-48 rounded-t-md bg-[#fff] p-1">
            <div
              class="grid h-full min-w-48 grid-cols-[auto_1fr_auto] items-center gap-2">
              <RiPushpinFill class="size-3" />
              <div class="h-fit w-full text-xs">{{ title }}</div>
              <RiCloseLine class="size-3 justify-self-end" color="#5F6367" />
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
      <slot></slot>
    </div>
  </section>
</template>
