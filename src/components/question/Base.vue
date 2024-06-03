<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";

const props = defineProps(["questionData"]);
let questionStart, questionEnd;

onMounted(() => {
  questionStart = new Date();
  const { id, type } = props.questionData;
  const responses = props.questionData.responses;
  const timestamp =
    questionStart
      .toISOString()
      .slice(0, questionStart.toISOString().indexOf(".") + 2) + "Z";

  SCORM.set("cmi.interactions." + (id + 1) + ".id", "question_" + (id + 1));
  SCORM.set("cmi.interactions." + (id + 1) + ".timestamp", timestamp);
  SCORM.set("cmi.interactions." + (id + 1) + ".type", type);
  responses.forEach((r, i) => {
    let correctID = 0;
    if (r.correct) {
      SCORM.set(
        "cmi.interactions." +
          (id + 1) +
          ".correct_responses." +
          correctID +
          ".pattern",
        r.value,
      );
      correctID++;
    }
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
  <section class="flex flex-col gap-2 p-8 xl:gap-3 xl:p-12">
    <h3 class="text-base font-bold text-saffron xl:text-lg">
      Question {{ questionData.id + 1 }}
    </h3>
    <h2 class="text-lg font-bold text-aliceblue xl:text-xl">
      {{ questionData.query }}
    </h2>
    <slot></slot>
  </section>
</template>
