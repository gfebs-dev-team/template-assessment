<script setup>
import { Simulation } from "$components/simulation";
import { onBeforeMount } from "vue";
import { RiIdCardFill, RiCheckboxBlankLine } from "@remixicon/vue";
import { useQuestionsStore } from "$store/questions";

const questionData = {
  scenario: 1,
  query: "Select the correct button to Sign In",
  type: "performance",
  responses: ["{order_matters=true}[.]clicked Sign In"],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>
<template>
  <Simulation
    :questionData
    url="loremipsum.army.mil/suite/login"
    title="Army Knowledge Online">
    <div class="flex h-full w-full flex-col items-center">
      <p
        class="w-full bg-gradient-to-b from-[#177915] via-[#0f5911] to-[#1a3e11] p-2 text-center text-xs text-[#fff]">
        This information system is approved for UNCLASSIFIED//???? data
      </p>
      <div class="flex h-full w-2/3 flex-col justify-center">
        <ul class="flex gap-1">
          <li
            class="flex border border-[#fff] border-b-[#fff] border-opacity-30 bg-[#fff] px-4 py-2 text-sm font-bold">
            CAC/PIV Login
          </li>
          <li
            class="flex border border-b-0 border-[#fff] border-opacity-30 bg-[#dedbd4] px-4 py-2 text-sm font-bold">
            I don't have a CAC/PIV
          </li>
        </ul>
        <div class="flex gap-2 bg-[#fff] p-4">
          <RiIdCardFill class="size-12 fill-[#848382]" />
          <div class="flex flex-col gap-2">
            <h2 class="font-bold text-[#51524d]">Sign in using your CAC/PIV</h2>
            <p>
              <span>Insert your CAC/PIV</span> into the
              <span>card reader</span>, then Sign In.
            </p>
            <div class="flex gap-4">
              <button
                @click="questions.actionHandler('clicked', 'Sign In')"
                class="w-fit self-center border-2 border-[#14141486] bg-[#737760] px-4 py-2 font-bold text-[#fefefe] transition active:translate-y-0.5">
                Sign In
              </button>
              <div class="flex flex-col">
                <div class="flex gap-2">
                  <RiCheckboxBlankLine class="size-4" />
                  <p>Low Bandwidth</p>
                </div>
                <div class="flex gap-2">
                  <RiCheckboxBlankLine class="size-4 fill-richblack" />
                  <p>Sign in directly to Webmail</p>
                </div>
              </div>
            </div>
            <p>Having trouble accessing AKO?</p>
            <div />
            <h2 class="font-bold text-[#51524d]">
              New to AKO? <span>Sign up</span>
              <div>Create Account with CAC</div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </Simulation>
</template>
