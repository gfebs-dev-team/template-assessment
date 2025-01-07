<script setup>
const props = defineProps(["value", "index"]);
const model = defineModel();

function update(x) {
  model.value = x.replaceAll("\n", "");
}
</script>

<template>
  <span
    :data-index="index"
    @input="(event) => update(event.target.innerText)"
    contenteditable="true"
    class="border-b border-saffron px-2 text-saffron"
    >{{ value[index] }}</span
  >
</template>

<style lang="postcss" scoped>
[contenteditable="true"]:empty:before {
  content: "\00a0\00a0\00a0\00a0\00a0type response here\00a0\00a0\00a0\00a0\00a0\00a0";
  color: gray;
}

/* prevents the user from being able to make a (visible) newline */
[contenteditable="true"] br {
  display: none;
}
</style>
