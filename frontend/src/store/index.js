import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

const http = axios.create({baseURL: "http://localhost:8081"});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: "Unknown user",
            email: "",
        },
        chatRooms: []

            /*[{
                player1: "Christopher Germann",
                player2: "BeniWyss",
                roomId: 0
            },
            {
                player1: "Somebody who is not Chris",
                player2: "Somebody who is not Beni",
                roomId: 1
            }, {
                player1: "Ilir Fetai",
                player2: "En geile siach",
                roomId: 2
            }, {
                player1: "Mr. Robot",
                player2: "Ultrahäcker",
                roomId: 3
            }, {
                player1: "Christopher Germann",
                player2: "BeniWyss",
                roomId: 4
            }]
        /*
             */
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
            state.user.chatRoomId = userPayload.chatRoomId;
        },

    },
    getters: {
        user: state => {
            return state.user;
        },
        chatRooms: (state) => {
            return state.chatRooms;
        }
    },
    actions: {
        updateChatroomData: (context)=>{
            http.get('/api/lobby/getLobbyRooms').then(({data})=>{
                let sorted =data.sort((a,b)=> a.roomId - b.roomId )
                console.log('soerted');
               context.commit('updateChatroomData',sorted);

            })
        }

    },
    modules: {}
});
