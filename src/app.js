import Vue from "vue";
import router from "./router";
import App from './App.vue';

// Entry point for project

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");