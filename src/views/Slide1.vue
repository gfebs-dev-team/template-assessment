<script setup lang="ts">
import SlideQuestion from '@/components/SlideQuestion.vue'

import { provide, ref} from 'vue';
const answer = ref<string>();

provide("answer", answer);
</script>

<template>
  <SlideQuestion title="Welcome to Introduction to Financials" unit="Introduction to Financials">
    <template #question>What is the answer to this question?</template>
    <template #options>
      <li class="choice">
        <input id="true" value="true" v-model="answer" type="radio" />
        <label for="true">True</label>
      </li>
      <li class="choice">
        <input id="false" value="false" v-model="answer" type="radio" />
        <label for="false">False</label>
      </li>
    </template>
  </SlideQuestion>
</template>
