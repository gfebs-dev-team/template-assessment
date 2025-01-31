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
let dropItems = questionData.pairs.map((x) => x.b);

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
    <div
      class="grid h-full min-h-0 w-full grid-cols-[2fr_2fr_1fr] grid-rows-4 gap-4">
      <!-- DRAG ITEMS -->
      <div
        class="row-span-full flex h-full flex-col justify-center gap-2"
        style="
          --dragHeight: 5rem;
          --dragColor: var(--color-masblue);
          --dragText: var(--color-aliceblue);
        ">
        <MatchingDrag
          v-for="(__, index) in dragItems"
          data-testid="drag"
          :id="dragItems[index]"
          className="bg-(--dragColor) p-2 rounded font-bold text-sm justify-center text-center text-(--dragText) items-center flex w-full whitespace-pre-wrap h-(--dragHeight)">
          {{ dragItems[index] }}
        </MatchingDrag>
      </div>

      <!-- DROP AREAS -->
      <div class="row-span-full grid h-full grid-rows-subgrid gap-2">
        <MatchingDrop
          v-for="(__, index) in dragItems"
          data-testid="drop"
          :index="index"
          @data="dropHandle($event, index)"
          @drop="onDrop($event)"
          className="w-full h-full border-dashed border border-masblue bg-masblue/10 rounded"
          style="
            --dragHeight: 100%;
            --dragColor: var(--color-saffron);
            --dragText: var(--color-oxfordblue);
          "
          :id="dropItems[index]">
        </MatchingDrop>
      </div>

      <!-- DROP LABELS -->
      <div class="row-span-full grid h-full grid-rows-subgrid gap-2">
        <p
          v-for="(__, index) in dragItems"
          class="text-aliceblue flex h-full w-full items-center justify-center rounded p-2 text-center text-sm lg:block lg:overflow-auto">
          {{ dropItems[index] }}
        </p>
      </div>
    </div>
  </Matching>
</template>
