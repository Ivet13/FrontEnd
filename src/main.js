import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AppLink from "./components/AppLink.vue";

import "./../node_modules/bulma/css/bulma.css";

//import "./assets/main.css";

//CREATING APP INSTANCE 
const app = createApp(App);

app.component(AppLink)

app.use(router);

//MOUNTING TO THE DOM
app.mount("#app");
