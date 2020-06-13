import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vuei18n from "vue-i18n";
import en from "./locales/en.json";
import de from "./locales/de.json";
import ru from "./locales/ru.json";
import zh from "./locales/zh.json";
import ch from "./locales/ch.json";

const base = axios.create({
    baseURL: "http://localhost:8081"
});

const messages = {
    en, ru, zh, de, ch
};

Vue.prototype.$http = base;
Vue.config.productionTip = false;
Vue.use(vuei18n);

const i18n = new vuei18n({
    locale: 'zh', // set locale
    messages, // set locale messages
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    i18n,
}).$mount("#app");
