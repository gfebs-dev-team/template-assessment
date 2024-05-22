<script setup>
import Header from "./Header.vue";
import Navigation from "./Navigation.vue";
import Sidebar from "./Sidebar.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import { ref } from "vue";

defineProps(["courseData"]);
defineEmits(["submit"]);

const questions = useQuestionsStore();
const { sidebarState } = storeToRefs(questions);
const { toggleSidebar } = questions;
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
      class="relative size-full overflow-hidden bg-oxfordblue lg:max-w-[1200px]">
      <Sidebar :sidebarState></Sidebar>
      <slot></slot>
    </section>

    <Navigation :course-data></Navigation>
    <!-- Bottom Nav -->
  </main>
</template>
