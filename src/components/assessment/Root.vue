<script setup>
import Header from "./Header.vue";
import Navigation from "./Navigation.vue";
import Sidebar from "./Sidebar.vue";
import Disclaimer from "./Disclaimer.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";

defineProps(["courseData"]);
defineEmits(["submit"]);

const questions = useQuestionsStore();
const { sidebarState, disclaimer, current } = storeToRefs(questions);
const { toggleSidebar, questionsList } = questions;
</script>

<template>
  <main
    class="flex h-dvh flex-col justify-between lg:items-center lg:bg-spacecadet lg:p-8 lg:px-12">
    <Header
      :course-data
      @toggleSidebar="toggleSidebar()"
      @submit="$emit('submit')"
      class="lg:max-w-[1200px]"></Header>
    <section
      class="relative flex size-full h-full flex-col justify-between overflow-hidden rounded-b-lg bg-oxfordblue lg:max-w-[1200px]">
      <Sidebar :sidebarState></Sidebar>
      <slot></slot>
      <Disclaimer v-if="disclaimer"></Disclaimer>
    </section>

    <Navigation :course-data></Navigation>
    <!-- Bottom Nav -->
  </main>
</template>
