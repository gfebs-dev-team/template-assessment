<script setup>
import { twMerge } from "tailwind-merge";
import { ref } from "vue";
import { RiArrowDownSFill } from "@remixicon/vue";
const model = defineModel();
const props = defineProps(["className", "options", "openProp", "def", "name"]);
defineEmits(["click"]);

const open = ref(false);

function update(value) {
  model.value = value;
  open.value = false;
}

function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <div class="relative h-full" @click.prevent>
    <div
      :class="
        twMerge(
          'relative box-border h-full overflow-hidden border border-black border-opacity-50 bg-white',
          className,
        )
      ">
      <button
        @click="$slot != undefined ? toggleOpen() : $emit('click')"
        class="absolute right-0 flex h-full items-center border-l border-x-black border-opacity-50 bg-[#c5d2dd]">
        <RiArrowDownSFill class="size-4" />
      </button>
      <p class="text-ellipsis text-nowrap px-1">
        {{ def != undefined ? def : model }}
      </p>
    </div>
    <div
      v-if="open || openProp"
      class="absolute inset-x-0 top-full z-20 grid w-max min-w-full -translate-y-[1px] grid-cols-[auto_auto] border border-black border-opacity-50 bg-white">
      <slot />
    </div>
  </div>
</template>
