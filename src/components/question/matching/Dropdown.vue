<script setup>
import Base from "./Base.vue";
import { QuestionSelect } from "$components/question";
import { onBeforeUnmount, onMounted, ref, provide } from "vue";
import { useQuestionsStore } from "$store/questions";
import { shuffleArray } from "$assets/script/utils";

const props = defineProps(["questionData", "aID"]);

const answer = ref([]);
provide("answer", answer);
const label = props.questionData.pairs.map((x) => x.a);
const value = ref(shuffleArray(props.questionData.pairs.map((x) => x.b)));
const questions = useQuestionsStore();
const { getQuestion } = questions;

onMounted(() => {
  if (
    getQuestion(props.questionData.id) &&
    getQuestion(props.questionData.id).learnerResponse
  ) {
    answer.value = getQuestion(props.questionData.id).learnerResponse;
    value.value = getQuestion(props.questionData.id).values;
  }
});

onBeforeUnmount(() => {
  const { id } = props.questionData;
  getQuestion(id).values = value.value;
});

function selectHandler() {
  getQuestion(props.questionData.id).learnerResponse = answer;
  //console.log(getQuestion(props.questionData.id).learnerResponse);
}
</script>
<template>
  <Base :questionData :answer :aID="aID">
    <QuestionSelect
      @change="selectHandler()"
      v-for="(l, index) in label"
      :index="index"
      :id="aID"
      :value
      :label="l" />
  </Base>
</template>
