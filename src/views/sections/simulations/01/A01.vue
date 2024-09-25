<script setup>
import { SlideContent } from "$components/slide";
import { SimulationWeb } from "$components/simulation";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";
import {
  RiFolderFill,
  RiArrowDropRightFill,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiArrowDownSFill,
} from "@remixicon/vue";

const questionData = {
  type: "content",
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>
<template>
  <SlideContent title="Scenario Introduction">
    <p>
      This is a <code>SlideContent</code> component. Use this with the
      <code class="bg-[#fff] bg-opacity-30">SimulationWeb</code> component to
      create a non-interactable introduction slide.
    </p>
    <SimulationWeb
      url="https://simulations.army.mil/scenario_introduction/"
      title="Scenario Introduction">
      <div
        class="pointer-events-none flex h-full w-full cursor-none flex-row flex-wrap items-center justify-center gap-4 overflow-clip bg-[#e8e8e8] p-4">
        <!-- ENTER SIM WEB CONTENT HERE -->
        <p class="w-1/2 rounded bg-[#fff] p-4 shadow-md">
          This is a <code>SimulationWeb</code> component. The content here can
          be copied from <code>Simulation</code> components or written from
          scratch.
        </p>
      </div>
    </SimulationWeb>
  </SlideContent>
</template>
