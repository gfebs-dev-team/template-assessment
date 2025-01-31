<script setup>
import { Simulation } from "#components/simulation";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "#store/questions";

const questionData = {
  scenario: 1,
  question: 1,
  query: "This is a click question demo. Use this area to add the query.",
  type: "performance",
  responses: ["{order_matters=true}[.]clicked button"],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>
<template>
  <Simulation
    :questionData
    aID="S0101"
    url="https://simulations.army.mil/scenario_1/q1"
    title="Question 1">
    <div
      class="flex h-full w-full flex-shrink flex-col items-center justify-center gap-4 overflow-auto bg-[#e8e8e8] p-4">
      <p class="w-1/2 rounded bg-[#fff] p-4 shadow-md">
        This is a click simulation question. The <code>actionHandler</code> can
        be added to any HTML tag, but common items are <code>buttons</code>,
        <code>links</code> and <code>inputs</code>. The
        <code>actionHandler</code> should be attached to the
        <code>@click</code> event, with an <code>action</code> and
        <code>value</code> as the parameter. Click the elements below to see
        what they log to the console.
      </p>
      <div class="flex items-center gap-4">
        <!-- Make Sure to Add data-name for answer key + selenium automation -->
        <button
          data-name="button"
          @click="questions.actionHandler('clicked', 'button')"
          class="w-fit self-center rounded bg-oxfordblue p-2 font-bold text-[#fefefe] transition active:translate-y-0.5">
          Click Here
        </button>
        <a
          data-name="link"
          class="text-[#00f] underline"
          @click="questions.actionHandler('clicked', 'link')"
          href="#"
          >Click here</a
        ><input
          data-name="textBox"
          class="border border-[#d8d8d8] p-1"
          @click="questions.actionHandler('clicked', 'textBox')"
          href="#"
          placeholder="Click here" />
      </div>
    </div>
  </Simulation>
</template>
