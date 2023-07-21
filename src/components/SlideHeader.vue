<script setup>
    defineProps(['topic'])
</script>

<template>
  <div class="unit-header">
    <h1>{{ topic }}</h1>
  </div>
</template>

<style scoped lang="scss">
.unit-header {
  width: 100%;
  background-color: #414141;
  padding: 0.2em 2em;
  h1 {
    color: white;
    text-align: right;
    font-weight: 400;
  }
}
</style>
