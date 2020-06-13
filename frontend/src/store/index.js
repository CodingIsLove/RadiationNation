import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

const http = axios.create({baseURL: "http://localhost:8081"});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: null,
            email: null,
        },
        chatRooms: [],
    },
    mutations: {
        initializeUser(state, userPayload) {
            state.user.username = userPayload.username;
            state.user.email = userPayload.email;
        },
        initializeChatRooms(state,payload) {
            state.chatRooms = payload;
        },
        updateChatroomData(state, userPayload) {
            state.chatRooms= userPayload
        },
    },
    getters: {
        user: state => {
            return state.user;
        },
        chatRooms: (state) => {
            return state.chatRooms;
        },
    },
    actions: {
        updateChatroomData: (context)=>{
            http.get('/api/game/allGameRooms').then(({data})=>{
                let sorted =data.sort((a,b)=> a.roomId - b.roomId )
                console.log('sorted');
               context.commit('updateChatroomData',sorted);
            })
        },
    },
    modules: {}
});
