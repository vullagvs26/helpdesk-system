import { createApp } from "vue";
import { createPinia } from "pinia";
import './assets/tailwind.css';
import App from "./App.vue";
import router from "@/router/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faInfoCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faInfoCircle, faBars);


const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
app.component("font-awesome-icon", FontAwesomeIcon);
