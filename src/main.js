import { createApp } from "vue";
import { createPinia } from "pinia";
import './assets/tailwind.css';
import App from "./App.vue";
import router from "@/router/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faInfoCircle,
  faBars, faTimes,faFileExport,  
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faInfoCircle, faBars, faTimes,faFileExport );



const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
app.component("font-awesome-icon", FontAwesomeIcon);


axios.defaults.baseURL = 'http://10.164.58.18/my-projects/helpdesk-system-be/public/api'