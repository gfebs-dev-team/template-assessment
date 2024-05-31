<script setup>
import { Simulation } from "$components/simulation";
import { onBeforeMount } from "vue";
import { useQuestionsStore } from "$store/questions";

const questionData = {
  id: 0,
  scenario: 1,
  query: "Select the first step.",
  type: "performance",
  responses: ["{order_matters=true}[.]clicked I accept"],
};

const questions = useQuestionsStore();
onBeforeMount(() => {
  questions.addQuestion(questionData);
});
</script>
<template>
  <Simulation :questionData url="blahblahblah.army.mil/sk2947710" title="AKO">
    <div
      class="flex h-full w-full flex-shrink items-center justify-center overflow-auto bg-[#fff] p-4">
      <div
        class="flex h-full w-[70%] max-w-[600px] flex-col gap-2 overflow-auto border-2 border-[#cbcbcb91] bg-gradient-to-b from-[#ffffff] via-[#e9ecf0] to-[#ededf5ba] p-4 text-xs font-bold">
        <h2 class="font-bold uppercase">
          You are accessing a u.s. government (usg) information system (is) that
          is provided for USG-Authorized use only.
        </h2>
        <p class="font-normal">
          By using this IS (which is includes device attached to this IS), you
          consent to the following conditions:
        </p>
        <ul class="ml-2 flex list-['►'] flex-col font-normal">
          <li class="p-1">
            The USG routinely intercepts and monitors communications on this IS
            for purposes including, but not limited to, penetration testing,
            COMSEC monitoring, network operations and defense, personnel
            misconduct (PM), law enforcement (LE), and counterintelligence (CI)
            investigations.
          </li>
          <li class="p-1">
            At any time, the USG may ispect and seize data stored on this IS.
          </li>
          <li class="p-1">
            Communications using, or data stored on, this IS are not private,
            are subject to routine monitoring, interception, and search and may
            be disclosed or used for any USG-authorized purpose.
          </li>
          <li class="p-1">
            This IS includes security measures (e.g., authentication and access
            controls) to protect USG interests--not for your personal benefit or
            privacy.
          </li>
          <li class="p-1">
            Notwithstanding the above, using this IS does not constitute consent
            to PM, LE or CI investigative searching or monitoring of the content
            of privileged communications, or work product, related to personal
            representation or services by attorneys, psychotherapists, or
            clergy, and their assistants. Such communications and work product
            are private and confidential. See <a href="">User Agreement</a> for
            details.
          </li>
        </ul>
        <button
          @click="questions.actionHandler('clicked', 'I Accept')"
          class="w-fit self-center border-2 border-[#14141486] bg-[#4ead41] p-2 font-bold text-[#fefefe] transition active:translate-y-0.5">
          I Accept
        </button>
      </div>
    </div>
  </Simulation>
</template>
