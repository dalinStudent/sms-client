import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import '@/assets/scss/styles.scss'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.mount("#app");
