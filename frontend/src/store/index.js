import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

const http = axios.create({baseURL: "http://localhost:8081"});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: "Random Random RAndom",
            email: null,
            roomId: 'global',
            currentPlayerPosition: 1
        },
        chatRooms: [],
        amountOfClients:0
    },
    getters: {
        user: state => {
            return state.user;
        },
        chatRooms: (state) => {
            return state.chatRooms;
        },
        roomId: (state) => {
            return state.user.roomId
        },
        amountOfClients: (state) => {
            return state.amountOfClients
        },
        userName: state => {
            return state.user.username;
        },
        playerPosition: state =>{
            return state.user.currentPlayerPosition
        }
    },
    mutations: {
        initializeUser(state, userPayload) {
            state.user.username = userPayload.username;
            state.user.email = userPayload.email;
        },
        initializeChatRooms(state, payload) {
            state.chatRooms = payload;
        },
        updateChatroomData(state, userPayload) {
            state.chatRooms = userPayload
        },
        updateRoomId(state, userPayload) {
            state.user.roomId = userPayload
        },
        updateAmountOfClients(state, userPayload) {
            state.amountOfClients = userPayload
        },
        updateCurrentPlayerPosition(state, userPayload){
            state.user.currentPlayerPosition = userPayload
        }

    },
    actions: {
        updateChatroomData: (context) => {
            http.get('/api/game/allGameRooms').then(({data}) => {
                let sorted = data.sort((a, b) => a.roomId - b.roomId);
                console.log('sorted');
                context.commit('updateChatroomData', sorted);
            })
        },
        updateAmountOfClients: (context) => {
            http.get(`/api/socket_data/clientAmount/${this.$store.getters.roomId}`).then(({data}) => {
                context.commit('updateAmountOfClients', data.amountOfClients)
            })
        }
    },
    modules: {}
});
