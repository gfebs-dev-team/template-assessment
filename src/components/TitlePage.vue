<script setup>
import { doExit } from '../assets/APIWrapper'
defineProps(['courseTitle', 'courseCode'])
</script>

<template>
  <main>
    <div class="border">
      <button id="header-exit" @click="doExit">X</button>
    </div>
    <div class="heading">
      <h1>Financial Management School</h1>
      <h2>GFEBS {{ courseCode }} {{ courseTitle }}</h2>
      <img id="heading-shield" src="../assets/shield-01.png" />
    </div>
    <section id="test-content">
      <p>
        Welcome to the post assessment for General Fund Enterprise Business System (GFEBS)
        {{ courseTitle }}. This assessment will determine your knowledge of the concepts and
        procedures of GFEBS {{ courseTitle }}
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
  color: white;
  text-align: center;
  .heading {
    padding: 3em;
    h1 {
      font-size: 2.6em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h2 {
      font-size: 2em;
      font-weight: bold;
      color: #f5d755;
    }

    img#heading-shield {
      height: 200px;
    }
  }
  #test-content {
    padding: 0em 3em;
    font-size: 1.1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    strong {
      margin-top: 10px;
      color: rgb(247 222 154);
      font-weight: bold;
      font-size: 13px;
    }
  }
}
.border {
  background-color: #1ea3de;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#header-exit {
  font-weight: bold;
  font-size: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: 0 solid #000;
}

#header-exit:hover {
  cursor: pointer;
}
</style>
