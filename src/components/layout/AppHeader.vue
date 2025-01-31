<script setup>
import AppButton from "#components/ui/AppButton.vue";
import { RiCloseLine } from "@remixicon/vue";

const props = defineProps(["courseData"]);
const emit = defineEmits(["exit"]);
</script>

<template>
  <div
    class="bg-spacecadet z-10 box-content flex w-full flex-col items-center justify-end">
    <div
      class="grid h-20 w-full grid-cols-[auto_auto_1fr] items-center gap-4 p-4 xl:h-28 xl:p-6">
      <img
        class="h-8 w-24 object-contain object-center md:h-12 xl:h-16"
        src="/assets/gfebs_white.png" />
      <div class="flex flex-col gap-1">
        <h1
          class="text-aliceblue text-sm font-bold text-balance uppercase md:text-base xl:text-xl">
          GFEBS {{ courseData.code }}
          {{ courseData.title }}
        </h1>
        <h2
          class="text-saffron text-sm font-bold text-balance uppercase xl:inline xl:text-base">
          {{ courseData.topic }}
        </h2>
      </div>
      <AppButton
        id="app_exit"
        class="bg-oxfordblue text-aliceblue max-w-32 justify-self-end border-transparent p-1 px-2 text-xs md:text-sm"
        @click="$emit('exit')">
        <RiCloseLine class="fill-aliceblue size-6" /> EXIT
      </AppButton>
    </div>
    <slot />
  </div>
</template>
