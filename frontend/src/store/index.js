import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{
      username:"Unknown user",
      email:""
    }
  },
  mutations: {
    initializeUser(state,userPayload){
      state.user.username = userPayload.username;
      state.user.email = userPayload.email;
    }
  },
  getters:{
    user: state => {
      return state.user;
    }
  },
  actions: {},
  modules: {}
});
