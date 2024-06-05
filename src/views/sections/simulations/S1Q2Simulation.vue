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
      <div class="max-w-2/3 flex h-full flex-col justify-center">
        <ul class="flex">
          <li
            class="flex flex-shrink-0 border border-richblack border-b-[#fff] border-opacity-30 bg-[#fff] px-4 py-2 text-sm font-bold">
            CAC/PIV Login
          </li>
          <li
            class="h-full w-2 border-b border-richblack border-opacity-30"></li>
          <li
            class="flex flex-shrink-0 border border-richblack border-opacity-30 bg-[#dedbd4] px-4 py-2 text-sm font-bold">
            I don't have a CAC/PIV
          </li>
          <li class="w-full border-b border-richblack border-opacity-30"></li>
        </ul>
        <div
          class="flex w-full gap-4 border border-t-0 border-richblack border-opacity-30 bg-[#fff] p-6">
          <RiIdCardFill class="size-14 fill-[#848382]" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <h2 class="text-xl font-bold text-[#51524d]">
                Sign in using your CAC/PIV
              </h2>
              <p>
                <span class="border-b border-dashed text-[#666a4e]"
                  >Insert your CAC/PIV</span
                >
                into the
                <span class="border-b border-dashed text-[#666a4e]"
                  >card reader</span
                >, then Sign In.
              </p>
              <div class="flex gap-2">
                <button
                  @click="questions.actionHandler('clicked', 'Sign In')"
                  class="w-fit self-center border-2 border-[#14141486] bg-gradient-to-b from-[#737760] to-[#4c4e41] px-4 py-2 text-sm font-bold text-[#fefefe] transition active:translate-y-0.5">
                  Sign In
                </button>
                <div class="flex flex-col">
                  <div class="flex items-center gap-2">
                    <RiCheckboxBlankLine class="size-4" />
                    <p>Low Bandwidth</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <RiCheckboxBlankLine class="size-4 fill-richblack" />
                    <p>Sign in directly to Webmail</p>
                  </div>
                </div>
              </div>
              <p>
                <span class="border-b border-dashed text-[#666a4e]"
                  >Having trouble accessing AKO?</span
                >
              </p>
            </div>

            <div class="mt-4 w-full border-b border-dashed border-richblack" />
            <div class="flex flex-col gap-2">
              <h2 class="text-xl font-bold text-[#51524d]">
                New to AKO? <span>Sign up</span>
              </h2>
              <div
                class="w-fit border-2 border-[#14141486] bg-gradient-to-b from-[#737760] to-[#4c4e41] px-4 py-2 text-sm font-bold text-[#fefefe]">
                Create Account with CAC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Simulation>
</template>
