<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";

const props = defineProps(["questionData", "actions"]);
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
  <section class="box flex h-full w-full flex-col rounded-none">
    <div class="m-2 p-2 text-lg text-aliceblue">
      <h3 class="text-md font-bold text-saffron">
        Scenario {{ questionData.scenario }}: Question {{ questionData.id }}
      </h3>
      <h2>{{ questionData.query }}</h2>
    </div>
    <slot></slot>
  </section>
</template>
