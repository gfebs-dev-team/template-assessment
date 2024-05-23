<script setup>
import { onMounted } from "vue";
import { SCORM } from "pipwerks-scorm-api-wrapper";

const props = defineProps(["questionData"]);
//const {id, type, correctResponses, query } = questionData;

onMounted(() => {
  const questionStart = new Date();
  const { id, type } = props.questionData;
  const responses = props.questionData.responses;
  const timestamp =
    questionStart
      .toISOString()
      .slice(0, questionStart.toISOString().indexOf(".") + 2) + "Z";

  // SCORM.set("cmi.interactions." + id + ".id", "question_" + id);
  // SCORM.set("cmi.interactions." + id + ".timestamp", timestamp);
  // SCORM.set("cmi.interactions." + id + ".type", type);
  // responses.forEach((r, i) => {
  //   let correctID = 0;
  //   if (r.correct && !SCORM.get("cmi.interactions." + id + ".correct_responses." + correctID + ".pattern")) {
  //     SCORM.set(
  //       "cmi.interactions." + id + ".correct_responses." + correctID + ".pattern",
  //       r.value,
  //     );
  //     correctID++;
  //   }
  // });
});
</script>

<template>
  <section class="flex flex-col gap-2 p-8 py-12">
    <h3 class="text-md font-bold text-saffron">
      Question {{ questionData.id + 1 }}
    </h3>
    <h2 class="text-lg font-bold text-aliceblue">{{ questionData.query }}</h2>
    <slot></slot>
  </section>
</template>
