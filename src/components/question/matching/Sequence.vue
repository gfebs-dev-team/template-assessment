<script setup>
import Base from "./Base.vue";
import Drag from "./Drag.vue";
import Drop from "./Drop.vue";
import { onDrop, setElems } from "$components/question/matching/draggable";
import { useQuestionsStore } from "$store/questions";
import { onMounted, ref } from "vue";
const props = defineProps(["questionData", "answer"]);

const answer = ref([]);
const questions = useQuestionsStore();

let array = props.questionData.sequence;
for (let i = array.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function dropHandle() {
  answer.value = [...document.getElementsByClassName("drag")].map((x) => x.id);
  questions.getQuestion(questions.currIndex).learnerResponse = answer;
  //console.log(answer);
}

onMounted(() => {
  if (questions.getQuestion(props.questionData.id).learnerResponse) {
    answer.value = questions.getQuestion(questionData.id).learnerResponse;
  }

  if (answer.value) {
    answer.value.forEach((s) => {
      //console.log(s);
      setElems(s);
    });
  }
});
</script>
<template>
  <Base :questionData :answer>
    <div class="flex h-full w-full flex-col gap-4">
      <Drop
        v-for="(item, index) in array"
        :id="index.toString()"
        :index="index"
        @data="dropHandle()"
        @drop="onDrop($event)"
        className="h-full">
        <template #item>
          <Drag
            :id="item"
            className="h-full rounded-sm flex items-center justify-center bg-saffron p-2 font-bold text-oxfordblue text-sm">
            {{ item }}
          </Drag>
        </template>
      </Drop>
    </div>
  </Base>
</template>
