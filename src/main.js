import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AppLink from "./components/AppLink.vue";

import "./assets/main.css";

const app = createApp(App);

app.component(AppLink)

app.use(router);

app.mount("#app");
