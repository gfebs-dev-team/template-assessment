import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";
import { setDebug } from "#scripts/utils";

setDebug(true);

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
