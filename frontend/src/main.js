import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIoExt from 'vue-socket.io-extended'
import * as io from 'socket.io-client'

const base = axios.create({
    baseURL: "http://localhost:8081"
});

const socket = io('localhost:8081');

Vue.prototype.$http = base;
Vue.config.productionTip = false;
Vue.use(VueSocketIoExt,socket );

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
