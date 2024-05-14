<script setup>
import Header from "./Header.vue";
import Navigation from "./Navigation.vue";
import Sidebar from "./Sidebar.vue";
import { useQuestionsStore } from "$store/questions";
import { storeToRefs } from "pinia";
import { ref } from "vue";

defineProps(["courseData"]);

const questions = useQuestionsStore();
const { sidebarState } = storeToRefs(questions);
const { toggleSidebar } = questions;
</script>

<template>
  <main class="flex h-[100dvh] flex-col justify-between">
    <Header :course-data @toggleSidebar="toggleSidebar()"></Header>
    <section class="relative size-full">
      <Sidebar :sidebarState></Sidebar>
      <slot></slot>
    </section>

    <Navigation :course-data></Navigation>
    <!-- Bottom Nav -->
  </main>
</template>
