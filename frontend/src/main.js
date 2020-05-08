import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import vuetify from "./plugins/vuetify";

const base = axios.create({
  baseUrl:"http://localhost:8080"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
