<script setup>
import AppButton from "$components/AppButton.vue";
import { RiCloseLine } from "@remixicon/vue";

const props = defineProps(["courseData"]);
const emit = defineEmits(["exit"]);
</script>

<template>
  <div
    class="z-10 box-content flex w-full flex-col items-center justify-end bg-spacecadet">
    <div
      class="grid h-20 w-full grid-cols-[auto_auto_1fr] items-center gap-4 p-4 xl:h-24 xl:p-6">
      <img class="h-10 md:h-12" src="/assets/crest.svg" />
      <div class="flex flex-col gap-1">
        <h1
          class="max-w-56 text-balance text-sm font-bold uppercase text-aliceblue md:text-base">
          Financial Management School
        </h1>
      </div>
      <AppButton
        class="max-w-32 justify-self-end border-transparent bg-oxfordblue p-1 px-2 text-xs text-aliceblue md:text-sm"
        @click="$emit('exit')">
        <RiCloseLine class="size-6 fill-aliceblue" /> EXIT
      </AppButton>
    </div>
    <slot />
  </div>
</template>
