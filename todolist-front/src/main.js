import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios"; // ⭐ 추가

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

createApp(App).use(router).mount("#app");
