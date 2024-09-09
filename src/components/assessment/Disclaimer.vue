<script setup>
import { ref } from "vue";
import { RiCloseLine } from "@remixicon/vue";

const show = ref(true);
</script>
<template>
  <div
    v-if="show"
    class="absolute bottom-4 z-50 flex w-full items-center justify-center justify-self-end px-4 xl:h-min">
    <div
      class="relative flex w-full items-center justify-center gap-2 text-balance rounded-md bg-spacecadet p-2 px-4 text-center text-sm italic text-saffron">
      <p>
        <span class="font-bold">Note:</span> All questions must be answered to
        receive credit. Assessments with unanswered questions will be marked as
        a fail
      </p>
      <button class="absolute right-2 p-1" @click="show = false">
        <RiCloseLine class="text-aliceblue" />
      </button>
    </div>
  </div>
</template>
