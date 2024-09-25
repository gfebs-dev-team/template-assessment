<script setup>
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiRestartLine,
  RiAccountCircleFill,
  RiQuestionAnswerFill,
  RiCloseLine,
} from "@remixicon/vue";
defineProps(["url", "title", "className"]);
</script>

<template>
  <div
    class="flex h-full w-full flex-col overflow-auto bg-[#DFE1E5] text-richblack"
    ref="target">
    <div class="flex h-10 w-full flex-col p-4">
      <div class="relative flex h-6 justify-between gap-2 bg-[#DFE1E5]">
        <div class="min-w-48 rounded-t-md bg-[#fff] p-1 px-2">
          <div
            class="grid h-full min-w-48 grid-cols-[auto_1fr_auto] items-center gap-2">
            <RiQuestionAnswerFill class="size-3" />
            <div class="h-fit w-full text-xs">{{ title }}</div>
            <RiCloseLine class="size-3 justify-self-end" color="#5F6367" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex h-fit items-center gap-2 border-b-2 border-[#adadad65] bg-[#fff] p-2">
      <RiArrowLeftLine color="#5F6367" class="size-4" />
      <RiArrowRightLine color="#5F6367" class="size-4" />
      <RiRestartLine color="#5F6367" class="size-4" />
      <div
        class="flex h-full w-full items-center rounded-full bg-[#F0F3F4] px-2 text-xs">
        {{ url }}
      </div>
      <RiAccountCircleFill color="#5F6367" class="size-4" />
      <div class="flex flex-col gap-[.1rem]">
        <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
        <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
        <div class="size-[.2rem] rounded-full bg-[#5F6367]"></div>
      </div>
    </div>
    <div class="relative h-full w-full overflow-auto" :class="className">
      <slot></slot>
    </div>
  </div>
</template>
