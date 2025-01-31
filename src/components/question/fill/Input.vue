<script setup>
const props = defineProps(["index"]);
const model = defineModel();

function update(e) {
  model.value = e.target.value;
  debug.log(model.value);
}
</script>

<template>
  <input
    :data-index="index"
    @input="update"
    class="bg-transparent font-bold text-saffron outline-none" />
</template>
