<script setup>
import {
  Matching,
  MatchingDrag,
  MatchingDrop,
} from "#components/question/matching";
import { onBeforeMount, onMounted, ref } from "vue";
import { useQuestionsStore } from "#store/questions";
import {
  onDrop,
  dataHandler,
  setElems,
} from "#components/question/matching/dragndrop/draggable";
import { shuffleArray } from "#/scripts/utils";

let questionData = {
  type: "matching",
  query:
    "This is a matching drag and drop question. It uses the Matching, MatchingDrag, and MatchingDrop components. It additionally uses the draggable.js utility script.",
  pairs: [
    { a: "One", b: "1" },
    { a: "Two", b: "2" },
    { a: "Three", b: "3" },
    { a: "Four", b: "4" },
  ],
};

const answer = ref([]);
const questions = useQuestionsStore();
let dragItems = shuffleArray(questionData.pairs.map((x) => x.a));

let array = dragItems;
for (let i = array.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
dragItems = array;

function dropHandle(event, index) {
  const data = dataHandler(event);
  const clone = data;
  console.log(data);
  if (data[0]) {
    clone.shift();
    clone.forEach((a) => {
      answer.value[a.index] = a.value;
    });
  } else {
    console.log(index);
    answer.value[index] = data[1];
  }
  questions.getQuestion(questions.currIndex).learnerResponse = answer;
  //console.log(answer);
}

onBeforeMount(() => {
  questionData = questions.addQuestion(questionData);
});

onMounted(() => {
  if (questions.getQuestion(questionData.id).learnerResponse) {
    answer.value = questions.getQuestion(questionData.id).learnerResponse;
  }

  if (answer.value) {
    answer.value.forEach((s) => {
      console.log(s);
      setElems(s);
    });
  }
});
</script>
<template>
  <Matching aID="B05T3" :questionData :answer>
    <!-- INDEX SHOULD MATCH THE INDEX IN QUESTIONDATA.PAIRS -->
    <div class="grid h-1/3 grid-cols-4 justify-center gap-2">
      <MatchingDrop
        data-name="drop"
        :index="index"
        v-for="(b, index) in questionData.pairs.map((x) => x.b)"
        @data="dropHandle($event, index)"
        @drop="onDrop($event)"
        className="border-2 border-coolgrey border-dashed rounded-md p-4 text-coolgrey"
        :id="b">
        {{ b }}
      </MatchingDrop>
    </div>
    <div class="flex h-1/3 gap-4">
      <MatchingDrag
        data-name="drag"
        v-for="drag in dragItems"
        :id="drag"
        className="h-full rounded-md w-full flex items-center justify-center bg-spacecadet p-2 font-bold text-aliceblue">
        {{ drag }}
      </MatchingDrag>
    </div>
  </Matching>
</template>
