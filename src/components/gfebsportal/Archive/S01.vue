<script setup>
import { Simulation } from "@components/simulation";
import { onBeforeMount, ref } from "vue";
import { useQuestionsStore } from "@store/questions";

const questionData = {
  scenario: 1,
  question: 1,
  query:
    "To begin executing a transfer from a Command, to a level 3 Funds Center, enter the T-Code.",
  type: "performance",
  responses: ["{order_matters=true}[.]entered FMBB"],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
const inputRef = ref("");
</script>
<template>
  <Simulation
    :questionData
    url="https://simulations.army.mil/scenario_1/q1"
    title="Question 1"
    aID="S0101">
    <div class="origin-top-left scale-150 bg-[#eaeef1]">
      <div class="flex w-full">
        <div
          class="relative flex items-center justify-center overflow-clip text-nowrap border-b border-[#233866] border-opacity-25 bg-[#fff] bg-[url('/assets/BgTabArea00X.gif')] bg-[auto_100%] bg-left-top bg-repeat-x p-3 text-xs text-[#233866]">
          GFEBS Home
        </div>
        <div
          class="relative flex items-center justify-center overflow-clip text-nowrap bg-[#fff] bg-[url('/assets/TabDownForSubtabs10X_STab.gif')] bg-[auto_100%] bg-left-top bg-repeat-x text-xs text-[#233866] shadow-inner">
          <p
            class="flex items-center justify-center font-bold before:w-2 before:bg-[url('/assets/TabDownForSubtabs00_STab.gif')] before:content-[''] after:w-2 after:bg-[url('/assets/TabDownForSubtabs20_STab.gif')] after:content-['']">
            Functional
          </p>
        </div>
        <div
          class="relative flex items-center justify-center overflow-clip text-nowrap border-b border-[#233866] border-opacity-25 bg-[#fff] bg-[url('/assets/BgTabArea00X.gif')] bg-[auto_100%] bg-left-top bg-repeat-x p-3 text-xs text-[#233866] after:absolute after:right-0 after:top-2 after:h-min after:bg-cover after:bg-origin-content after:content-[url('/assets/TabDivider.gif')]">
          Training Sandbox
        </div>
        <div
          class="relative flex items-center justify-center overflow-clip text-nowrap border-b border-[#233866] border-opacity-25 bg-[#fff] bg-[url('/assets/BgTabArea00X.gif')] bg-[auto_100%] bg-left-top bg-repeat-x p-3 text-xs text-[#233866] after:absolute after:right-0 after:top-2 after:h-min after:bg-cover after:bg-origin-content after:content-[url('/assets/TabDivider.gif')]">
          cProjects
        </div>
        <div
          class="relative flex w-full items-center justify-center overflow-clip border-b border-[#233866] border-opacity-25 bg-[#fff] bg-[url('/assets/BgTabArea00X.gif')] bg-[auto_100%] bg-left-top bg-repeat-x p-3 text-xs text-[#233866] after:absolute after:right-0 after:top-2 after:h-min after:bg-cover after:bg-origin-content after:content-[url('/assets/TabDivider.gif')]"></div>
      </div>
      <div
        class="relative flex items-center justify-start overflow-clip text-nowrap bg-[#fff] bg-[url('/assets/BgTabArea00X.gif')] bg-[auto_100%] bg-left-top bg-repeat-x bg-origin-border text-xs text-[#233866] after:absolute after:right-0 after:top-2 after:h-min after:bg-cover after:bg-origin-content after:content-[url('/assets/TabDivider.gif')]">
        <div
          class="bg-[#fff] bg-[url(/assets/SubtabHoverDownX.gif)] bg-[auto_100%] bg-left-top bg-repeat-x p-1 px-3 font-bold text-[#233866]">
          TED-357
        </div>
      </div>
      <div
        class="flex w-full items-center gap-1 border border-[#233866] border-opacity-10 pl-1 text-[.6rem]">
        <p class="p-1 text-[#233866]">Institutional</p>
        <p>></p>
        <p class="p-1 text-[#233866]">TED-357</p>
      </div>
      <div class="h-full w-full p-2">
        <h1
          class="border border-[#233866] border-opacity-20 bg-[url('/assets/title_area_bg.gif')] bg-[auto_100%] bg-left-top bg-repeat-x p-2 pl-3 text-xl font-bold italic leading-none">
          SAP Easy Access - User Menu for John Doe
        </h1>
        <div
          class="mt-[1px] flex gap-1 border border-[#233866] border-opacity-20 bg-[#b9cedf] p-1 pl-3 text-xs leading-none">
          <button class="sim menu">Menu</button>
          <input
            type="text"
            class="sim"
            data-name="Command Box"
            @input="questions.actionHandler('entered', inputRef)"
            v-model="inputRef" />
          <button class="sim menu">Log off</button>
          <button class="sim menu">System</button>
          <button class="sim menu">User menu</button>
          <button class="sim menu">SAP menu</button>
          <button class="sim menu">SAP Business Workplace</button>
          <button class="sim menu">Add to Favorites</button>
        </div>
        <div class="flex h-full w-full gap-1 p-1 px-2 text-xs">
          <ul
            class="flex w-full flex-col border border-[#233866] border-opacity-20">
            <li class="flex items-center gap-1 bg-[#a2c8eb] p-1">
              <img class="size-3" src="/assets/ico12_pu_scr_down.gif" />
              <img class="size-3" src="/assets/s_opfold.gif" />
              <p>Favorites</p>
            </li>
            <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-8">
              <img class="size-3" src="/assets/s_clofol.gif" />
              <p>
                ME51N - Materials Management -> Purchasing -> Purchase
                Requisition -> Create
              </p>
            </li>
            <li class="flex items-center gap-1 bg-[#a2c8eb] p-1">
              <img class="size-3" src="/assets/ico12_pu_scr_down.gif" />
              <img class="size-3" src="/assets/s_opfold.gif" />SAP Menu
            </li>
            <ul class="flex flex-col justify-center">
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Office
              </li>
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Cross-Application Components
              </li>
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Collaboration Projects
              </li>
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Logistics
              </li>
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Accounting
              </li>
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Human Resources
              </li>
              <li class="flex items-center gap-1 bg-[#bdd4ea] p-1 pl-4">
                <img class="size-3" src="/assets/s_b_colr(2).gif" />
                <img class="size-3" src="/assets/s_clofol.gif" />
                Information Systems
              </li>
            </ul>
          </ul>
          <img src="/assets/ZWATEREDITED.gif" class="w-full" alt="water" />
        </div>
      </div>
    </div>
  </Simulation>
</template>
