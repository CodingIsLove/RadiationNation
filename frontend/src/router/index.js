import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from '../views/LoginView.vue'
import LobbyView from '../views/LobbyView.vue'
import GameView from '../views/GameView.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component:LoginView
    },{
        path:"/lobby",
        name:"Lobby",
        component: LobbyView
    },{
        path: "/game",
        name:"Game",
        component: GameView
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    routes: routes
});

export default router;
