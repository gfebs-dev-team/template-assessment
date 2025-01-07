<script setup>
import { Simulation } from "@components/simulation";
import { onBeforeMount, ref } from "vue";
import { useQuestionsStore } from "@store/questions";
import HData from "@assets/images/HeaderData.svg";
import AData from "@assets/images/AdditionalData.svg";
import { ComboBox, ComboOption } from "@components/gfebsportal/ComboBox";

const questionData = {
  scenario: 1,
  query:
    "You have entered transaction code FMBB (Budgeting Workbench), and you are now on the Budgeting Workbench screen. ComboBox the drop down button for the Process field.",
  type: "performance",
  responses: ["{order_matters=true}[.]clicked dropdown"],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>
<template>
  <Simulation
    :questionData
    url="https://simulations.army.mil/scenario_1/q2"
    title="Question 2">
    <div class="p-1">
      <ul class="flex w-full items-center border-b border-b-[#83afd8]">
        <li class="flex w-fit items-center pl-2">
          <img :src="HData" alt="" class="max-h-full min-h-0 scale-110" />
        </li>
        <li class="ml-2 flex w-fit items-center">
          <img :src="AData" alt="" class="max-h-full min-h-0 scale-110" />
        </li>
      </ul>
      <div
        class="grid grid-cols-4 gap-4 border border-[#83afd8] bg-[#e0ebf5] p-2 px-4 text-sm">
        <ul class="col-span-2 grid grid-cols-subgrid grid-rows-5">
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Process</p>
            <ComboBox @click="questions.actionHandler('clicked', 'dropdown')" />
          </li>
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Budget Category</p>
            <ComboBox value="" class="sim w-28" />
          </li>
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Document Type</p>
            <ComboBox value="" class="sim w-32" />
          </li>
          <li class="col-span-2 row-start-5 grid grid-cols-subgrid">
            <p>Fiscal Year</p>
            <input type="text" class="sim w-8" />
          </li>
        </ul>
        <ul class="col-span-2 grid grid-cols-subgrid grid-rows-5">
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Total</p>
            <input type="text" class="sim bg-transparent" />
          </li>
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Budget Category</p>
            <input type="text" class="sim w-8" />
          </li>
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Document Type</p>
            <input type="text" class="sim w-16" />
          </li>
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Fiscal Year</p>
            <input type="text" class="sim w-16" />
          </li>
          <li class="col-span-2 grid grid-cols-subgrid">
            <p>Fiscal Year</p>
            <ComboBox value="" class="sim w-12" />
          </li>
        </ul>
      </div>
    </div>
  </Simulation>
</template>
