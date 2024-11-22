<script setup>
import { Simulation } from "@components/simulation";
import { onBeforeMount, ref } from "vue";
import { useQuestionsStore } from "@store/questions";

const questionData = {
  scenario: 1,
  question: 2,
  query:
    "This is a input question demo. Use this area to add the query. Extra words to pad the question for regex test.",
  type: "performance",
  responses: ["{order_matters=true}[.]entered bagles"],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});

// This is needed for input questions!!
const inputRef = ref("");
</script>
<template>
  <Simulation
    :questionData
    aID="S0102"
    url="https://simulations.army.mil/scenario_1/q2"
    title="Question 2">
    <div
      class="flex h-full w-full flex-shrink flex-col items-center justify-center gap-4 overflow-auto bg-[#e8e8e8] p-4">
      <p class="w-1/2 rounded bg-[#fff] p-4 shadow-md">
        This is an input simulation question. Create an
        <code>inputRef</code> and set the <code>v-Model</code> of the textBox to
        it. Attach the <code>actionHandler</code> to the
        <code>@input</code> event of the textBox, with 'entered' as the action
        and <code>inputRef</code> as the value. For case-insensitive answers
        make sure to add <code class="text-[#961396]">.toLowerCase()</code> to
        <code>inputRef</code>.
      </p>
      <div class="flex items-center gap-4">
        <label for="demo" class="font-bold">Input</label>
        <input
          data-name="textBox"
          placeholder="Answer is bagles"
          @input="questions.actionHandler('entered', inputRef)"
          id="demo"
          type="text"
          v-model="inputRef"
          class="border border-[#d8d8d8]" />
      </div>
    </div>
  </Simulation>
</template>
