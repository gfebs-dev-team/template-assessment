<script setup>
defineProps(["color"]);
</script>

<template>
  <button class="grid max-h-6 w-max grid-cols-[auto_auto] items-start">
    <svg class="h-full min-w-5" viewBox="3 0 19.109528 23.354145">
      <g transform="translate(-12.059554,-3.0032949)">
        <g>
          <path :fill="color" d="M 15,27.093915 H 34.237752 V 3.2668201 Z" />
          <path
            fill="none"
            stroke="#000"
            stroke-width=".7"
            stroke-opacity=".3"
            d="M 35.169082,3.4032949 15,27.093915 " />
        </g>
      </g>
    </svg>
    <p
      class="-ml-[1px] h-full text-nowrap rounded-[.2rem] border border-b-0 border-l-0 border-[#000] border-opacity-30 p-1"
      :style="`background-color: ${color}`">
      <slot></slot>
    </p>
  </button>
</template>
