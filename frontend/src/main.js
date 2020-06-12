import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vuei18n from "vue-i18n";

const base = axios.create({
    baseURL: "http://localhost:8081"
});

const messages = {
    en: {
        message: {
            Yes: 'Yes',
            No: 'No',
            Connections: 'Connections',
            EnterMessage: 'Enter a Message',
            Send: 'Send',
            Welcome: 'Welcome'
        }
    },
    zh: {
        message: {
            Yes: '是的，是的',
            No: '没有',
            Connections: '连接',
            EnterMessage: '输入信息',
            Send: '发送',
            Welcome: '欢迎光临'
        }
    },
    ru: {
        message: {
            Yes: 'да',
            No: 'нет',
            Connections: 'связи',
            EnterMessage: 'введите сообщение',
            Send: 'послать',
            Welcome: 'приветствие'
        }
    },
    de: {
        message: {
            Yes: 'Ja',
            No: 'Nein',
            Connections: 'Verbindungen',
            EnterMessage: 'Gib eine Nachricht ein',
            Send: 'Senden',
            Welcome: 'Willkommen'
        }
    },
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
