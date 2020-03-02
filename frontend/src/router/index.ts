import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/LoginView.vue'
import LobbyView from '../views/LobbyView.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component:Login
  },{
    path:"/lobby",
    name: "Lobby",
    component:LobbyView
  },{
    path:"/game",
    name:"Game",
    component: Game
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
