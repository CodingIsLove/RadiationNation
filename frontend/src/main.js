import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from 'vue-socket.io'
// import SocketIO from "socket.io-client"

const base = axios.create({
  baseURL:"http://localhost:8080"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8080',
  /*vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },*/
  //options: { path: "/my-app/" } //Optional options
}));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
