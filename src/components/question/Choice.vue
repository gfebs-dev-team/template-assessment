<script setup>
import Base from "./Base.vue";
import Radio from "./Radio.vue";
import { provide, ref, onBeforeUnmount, onMounted } from "vue";
import { useQuestionsStore } from "@store/questions";
import { SCORM } from "pipwerks-scorm-api-wrapper";
import { storeToRefs } from "pinia";

const props = defineProps([
  "questionData",
  "courseData",
  "aID",
  "img",
  "imgGridClass",
  "className",
]);

const questions = useQuestionsStore();
const { current, questionsList } = storeToRefs(questions);
const { getQuestion } = questions;

const answer = ref();
const checked_el = ref(-1);

provide("answer", answer);
provide("checked_el", checked_el);

function setInput(v, i) {
  checked_el.value = i;
  v.index = i;
  answer.value = v;
  getQuestion(props.questionData.id).learnerResponse = answer.value;
}

onMounted(() => {
  if (
    getQuestion(props.questionData.id) &&
    getQuestion(props.questionData.id).learnerResponse
  ) {
    answer.value = getQuestion(props.questionData.id).learnerResponse;
    checked_el.value = answer.value.index;
  }
});

onBeforeUnmount(() => {
  const { id, sID } = props.questionData;
  if (answer.value) {
    getQuestion(id).learnerResponse = answer.value;
    SCORM.set(
      "cmi.interactions." + (sID + 1) + ".learner_response",
      answer.value.value,
    );
  }
  if (answer.value && answer.value.correct) {
    getQuestion(id).correct = true;
    SCORM.set("cmi.interactions." + (sID + 1) + ".result", "correct");
  } else {
    getQuestion(id).correct = false;
    SCORM.set("cmi.interactions." + (sID + 1) + ".result", "incorrect");
  }
});
</script>

<template>
  <Base :questionData :aID="aID">
    <div class="h-full min-h-0 w-full" :class="className">
      <div class="flex w-full flex-col gap-1">
        <template
          v-for="(response, index) in questionData.responses"
          :key="index">
          <Radio
            @selected="setInput(response, index)"
            :value="response"
            :id="`${aID}_${index}`"
            :index
            v-if="!img">
            {{ response.content }}
          </Radio>
        </template>
      </div>
      <div
        v-if="img"
        class="grid h-full min-h-0 w-full gap-2"
        :class="imgGridClass">
        <Radio
          @selected="setInput(response, index)"
          :value="response"
          img="true"
          :id="`${aID}_${index}`"
          className="min-h-0 min-w-0 flex gap-2 w-full h-full data-[checked=true]:bg-opacity-35 data-[checked=true]:border-2 data-[checked=true]:border-saffron "
          :index
          v-for="(response, index) in questionData.responses">
          <img
            :src="response.content"
            :alt="response.content"
            class="h-full min-h-0 w-full min-w-0 bg-transparent object-cover object-left-top" />
        </Radio>
      </div>
      <slot></slot>
    </div>
  </Base>
</template>
