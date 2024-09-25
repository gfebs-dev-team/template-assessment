<script setup>
import Base from "./Base.vue";
import Checkbox from "./Checkbox.vue";
import { provide, ref, onBeforeUnmount, onMounted } from "vue";
import { useQuestionsStore } from "$store/questions";
import { SCORM } from "pipwerks-scorm-api-wrapper";

const props = defineProps(["questionData", "courseData"]);

const questions = useQuestionsStore();
const { getQuestion } = questions;

const answer = ref([]);
const checked_el = ref([]);

provide("answer", answer);
provide("checked_el", checked_el);

function setInput(v, i) {
  checked_el.value = arrayToggle(checked_el.value, i);
  answer.value = arrayToggle(answer.value, v);
  getQuestion(props.questionData.id).checked = checked_el.value;
  getQuestion(props.questionData.id).learnerResponse = answer.value;
  //console.log(answer.value);
  //console.log(checked_el.value);
}

function arrayToggle(a, v) {
  let array = a;
  const temp = a.map((i) => JSON.stringify(i));
  let i = temp.indexOf(JSON.stringify(v));
  //console.log(v.content + ": " + i);
  if (i != -1) {
    array.splice(i, 1);
  } else {
    array.push(v);
  }
  return array;
}

onMounted(() => {
  if (
    getQuestion(props.questionData.id) &&
    getQuestion(props.questionData.id).learnerResponse
  ) {
    checked_el.value = getQuestion(props.questionData.id).checked;
    answer.value = checked_el.value
      ? checked_el.value.map((i) =>
          JSON.parse(
            JSON.stringify(getQuestion(props.questionData.id).responses[i]),
          ),
        )
      : [];
  }
  //console.log(answer.value);
  //console.log(checked_el.value);
});

onBeforeUnmount(() => {
  const { id, sID } = props.questionData;
  let scoAnswer = "";

  getQuestion(id).checked = checked_el.value;

  if (answer.value.length > 0) {
    getQuestion(id).learnerResponse = answer.value;
    JSON.parse(JSON.stringify(answer.value)).forEach((a) => {
      if (scoAnswer !== "") {
        scoAnswer += "[,]";
      }
      scoAnswer += a.value;
    });
    //console.log(scoAnswer);
    SCORM.set("cmi.interactions." + (sID + 1) + ".learner_response", scoAnswer);
  }

  if (scoAnswer == getQuestion(id).correctResponse) {
    getQuestion(id).correct = true;
    SCORM.set("cmi.interactions." + (sID + 1) + ".result", "correct");
  } else {
    getQuestion(id).correct = false;
    SCORM.set("cmi.interactions." + (sID + 1) + ".result", "incorrect");
  }
});
</script>

<template>
  <Base :questionData>
    <template v-for="(response, index) in questionData.responses" :key="index">
      <Checkbox
        @selected="setInput(response, index)"
        :responses="questionData.responses"
        :value="response"
        :id="`question_${questionData.id}_${index}`"
        :index>
        {{ response.content }}
      </Checkbox>
    </template>
  </Base>
</template>
