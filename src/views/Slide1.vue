<script setup>
import SlideQuestion from '../components/SlideQuestion.vue'
import { provide, ref} from 'vue';
import { useTestStore } from '../stores/test'

const answer = ref();
const checked_el= ref(0);
provide("answer", answer);

const question = "What is the answer to this question?";
const options = ["true", "false"];

const test = useTestStore();
test.addQuestion(question, "true-false", options, ["true"], false);
test.setInteractions();

</script>

<template>
  <SlideQuestion :title=question :topic="topic">
    <template #options>
      <li class="choice" @click="checked_el=1" :class="{checked: checked_el == 1}">
        <input id="true" value="true" v-model="answer" type="radio" />
        <label for="true">True</label>
      </li>
      <li class="choice" @click="checked_el=2" :class="{checked: checked_el == 2}">
        <input id="false" value="false" v-model="answer" type="radio" />
        <label for="false">False</label>
      </li>
    </template>
  </SlideQuestion>
</template>
