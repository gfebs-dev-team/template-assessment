<script setup lang="ts">
</script>

<template>
  <main>
    <div class="border">
      <button id="header-exit">X</button>
    </div>
    <div class="test-heading">
      <h1 id="heading-title">Financial Management School</h1>
      <h2 id="heading-subtitle">
        GFEBS
        <!--COURSE TITLE HERE-->
        Assessment
      </h2>
      <img id="heading-shield" src="/shield-01.png" />
    </div>
    <section id="test-content">
      <p>
        Welcome to the post assessment for General Fund Enterprise Business System (GFEBS)
        Finanicals Process Overview. This assessment will determine your knowledge of the concepts
        and procedures of GFEBS Financials Process Overview
      </p>
      <strong>
        NOTE: You may not communicate with other students, give or receive assistance, make a
        personal record of your answers, and pass on information about the tests to other students.
        Failure to follow these instructions will result in the appropriate disciplinary actions
        being taken.
      </strong>
      <h3>Select the Start button to continue</h3>
      <slot></slot>
    </section>
  </main>
</template>

<style scoped lang="scss">

main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.border {
  background-color: #1ea3de;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2%;
}
</style>
