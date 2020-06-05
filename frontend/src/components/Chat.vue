<template>
    <v-app class="chat">
        <h2>{{chat.username}}</h2>
        <div class="card bg-info">
            <div class="card-header grey text--white">
                <h4>My Chat App <span class="float-right">{{chat.connections}} connections</span></h4>
            </div>
            <ul class="list-group list-group-flush text-right">
                <li class="list-group-item" v-for="message in chat.messageTable" :key="message.id">
                    <span>{{message.message}}
                        <small>:{{message.username}}</small>
                    </span>
                </li>
            </ul>

            <div class="card-body">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="chat.message" placeholder="Enter Message...">
                    <v-btn class="v-btn black white--text float-right" value="Send" @click="sendMessage"></v-btn>
                </div>
            </div>

        </div>
    </v-app>
</template>

<script>
    import io  from 'socket.io-client'
    export default {
        data() {
            return {
                chat: {
                    message: "",
                    messageTable: [],
                    username: "",
                    connections: 0,
                },
                chatSocket: null,
                //todo: add lobby socket
            }
        },
        methods: {
            newSocket() {
                this.chatSocket = io.connect('localhost:8081/chat',{origin: '*:*'});
                this.chatSocket.on('welcome',(data)=>{
                    console.log(`The received data is: ${data}`)
                });
                this.chatSocket.on('connect', () => {
                    this.chatSocket.emit('fuck', "Seems to work i gues")
                });
                this.chatSocket.on('hello',()=>{
                    console.log("Finally this shit is working")
                });
                this.chatSocket.on('newMessage',(data)=>{
                    this.chat.messageTable.push(data)
                });
            },
            sendMessage() {
                this.chatSocket.emit('sendMessage', this.chat);
                this.chat.messageTable.push({
                    message: this.message,
                    username: this.username,
                });
                console.log('Sent message to socket')
            },
            fuckOff: function () {
                console.log("Fuck was called");
                this.chatSocket.emit('fuck', {msg: "fuck"});
            }
        },
        mounted() {
            this.newSocket()
        }
    };
</script>

<style scoped>
    .chat {
        height: 100%;
        background-color: white;
    }
</style>
