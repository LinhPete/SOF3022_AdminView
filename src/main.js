import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia";
import axiosPlugin from "../src/axios/plugins/axiosPlugin";

const app = createApp(App)

app.use(router);
app.use(createPinia());
app.use(axiosPlugin)
app.mount('#app');
