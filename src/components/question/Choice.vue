<script setup>
import Base from "./Base.vue";
import Radio from "./Radio.vue";
import { provide, ref, onBeforeUnmount, onMounted } from "vue";
import { useQuestionsStore } from "$store/questions";

const props = defineProps(["questionData", "courseData"]);

const questions = useQuestionsStore();
const { questionsList } = questions;

const answer = ref();
const checked_el = ref(-1);

provide("answer", answer);
provide("checked_el", checked_el);

function setInput(v, i) {
  checked_el.value = i;
  v.index = i;
  answer.value = v;
  questionsList[props.questionData.id].learnerResponse = answer.value;
  console.log(questionsList[props.questionData.id].learnerResponse);
}

onMounted(() => {
  if (questionsList[props.questionData.id].learnerResponse) {
    answer.value = questionsList[props.questionData.id].learnerResponse;
    checked_el.value = answer.value.index;
  }
});

onBeforeUnmount(() => {
  if (answer.value) {
    questionsList[props.questionData.id].learnerResponse = answer.value;
  }
  if (answer.correct) {
    questionsList[props.questionData.id].correct = true;
  } else {
    questionsList[props.questionData.id].correct = false;
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
