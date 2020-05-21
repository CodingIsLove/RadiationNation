<template>
    <v-app class="chat">

        <h2>{{chat.username}}</h2>
        <div class="card bg-info">
            <div class="card-header grey text--white">
                <h4>My Chat App <span class="float-right">{{chat.connections}} connections</span></h4>
            </div>
            <ul class="list-group list-group-flush text-right">
                <li class="list-group-item" v-for="message in chat.messageTable" :key="message">
                    <span>{{message.message}}
                        <small>:{{message.user}}</small>
                    </span>
                </li>
            </ul>

            <div class="card-body">
                <v-form @submit.prevent="sendMessage">
                    <div class="form-group+">
                        <input type="text" class="form-control" v-model="chat.message" placeholder="Enter Message...">
                        <input type="submit" class="v-btn black white--text float-right" value="Send" @click="sendMessage">
                    </div>
                </v-form>
            </div>

        </div>
    </v-app>
</template>

<script>
    export default {
        el: '#chat',
        data(){
            return{
                chat: {
                    message: null,
                    messageTable: [],
                    username: null,
                    connections: 0,
                },
                socket: isUndefined,
            }
        },
        methods: {
            sendMessage: function() {
                this.$socket.emit('sendMessage', this.chat)
            },
            userConnected: function () {
                this.$socket.emit('userConnected', this.chat.username)
            },
            configureSocket: function () {
                this.socket = io.connect('http//localhost');
                socket.on('news', (data) => {
                    console.log(data);
                    socket.emit('myotherevent', {my:'data'})
                });
            }
        },
        sockets: {
            connection: function () {
                console.log('socket connected');
            },
            /*customEmit: function (data) {
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }*/
        }
    };
</script>

<style scoped>
    .chat {
        height: 100%;
        background-color: white;
    }
</style>
