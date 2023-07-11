<script setup lang="ts">
import SlideQuestion from '@/components/SlideQuestion.vue'
import { provide, ref} from 'vue';
import { useTestStore } from '@/stores/test'

const answer = ref<string>();
provide("answer", answer);

const question = "What is the answer to this question?";
const options = ["true", "false"];

const test = useTestStore();
test.addQuestion(question, "true-false", options, ["true"]);
test.setInteractions(options);

</script>

<template>
  <SlideQuestion :title=question unit="Introduction to Financials">
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
