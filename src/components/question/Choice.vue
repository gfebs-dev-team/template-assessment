<script setup>
import Base from "./Base.vue";
import Radio from "./Radio.vue";
import { provide, ref, onBeforeUnmount, onMounted } from "vue";
import { useQuestionsStore } from "$store/questions";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { storeToRefs } from "pinia";

const props = defineProps(["questionData", "courseData"]);

const questions = useQuestionsStore();
const { current, questionsList } = storeToRefs(questions);

const answer = ref();
const checked_el = ref(-1);

provide("answer", answer);
provide("checked_el", checked_el);

function setInput(v, i) {
  checked_el.value = i;
  v.index = i;
  answer.value = v;
  questionsList.value[props.questionData.id].learnerResponse = answer.value;
}

onMounted(() => {
  if (questionsList.value[props.questionData.id].learnerResponse) {
    answer.value = questionsList[props.questionData.id].learnerResponse;
    checked_el.value = answer.value.index;
  }
});

onBeforeUnmount(() => {
  const { id } = props.questionData;
  if (answer.value) {
    questionsList.value[id].learnerResponse = answer.value;
    SCORM.set(
      "cmi.interactions." + id + ".learner_response",
      answer.value.value,
    );
  }
  if (answer.correct) {
    questionsList.value[id].correct = true;
    SCORM.set("cmi.interactions." + id + ".result", "correct");
  } else {
    questionsList.value[id].correct = false;
    SCORM.set("cmi.interactions." + id + ".result", "incorrect");
  }
});
</script>

<template>
  <Base :questionData>
    <template v-for="(response, index) in questionData.responses" :key="index">
      <Radio
        @selected="setInput(response, index)"
        :value="response"
        :id="`question_${questionData.id}_${index}`"
        :index>
        {{ response.content }}
      </Radio>
    </template>
  </Base>
</template>
