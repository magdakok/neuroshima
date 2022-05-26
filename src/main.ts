import { createApp } from "vue";
// !FPINIA1: Setup
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

createApp(App).use(createPinia()).use(router).mount("#app");
