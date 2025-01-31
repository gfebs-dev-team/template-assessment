<script setup>
import { ref } from "vue";

const toggleState = ref(false);

function toggleSize() {
  toggleState.value = !toggleState.value;
}

defineProps(["src", "className", "alt"]);
</script>

<template>
  <img @click="toggleSize" :src="src" :class="className" :alt="alt" />

  <Teleport to="body">
    <div
      v-if="toggleState"
      @click="toggleSize"
      class="bg-richblack/20 absolute inset-0 z-10 flex h-full w-full items-center justify-center p-20 backdrop-blur-md">
      <img
        :src="src"
        class="contain h-full w-auto object-center xl:max-w-[1200px]"
        :class="className"
        :alt="alt" />
    </div>
  </Teleport>
</template>
