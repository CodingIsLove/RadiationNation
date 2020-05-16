import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import LobbyView from "../views/LobbyView.vue";
import GameView from "../views/GameView.vue";
import RegisterView from "../views/RegisterView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: LoginView
    },
    {
        path:"/register",
        name:"register",
        component:RegisterView
    },
    {
        path: "/lobby",
        name: "lobby",
        component: LobbyView
    },
    {
        path: "/game",
        name: "game",
        component: GameView
    }
];

const router = new VueRouter({
    mode:"history",
    base: process.env.BASE_URL,
    routes: routes
});

export default router;
