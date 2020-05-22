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
                    <v-btn @click="fuckOff"></v-btn>


                </div>
            </div>

        </div>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                chat: {
                    message: "",
                    messageTable: [],
                    username: "",
                    connections: 0,
                },
                socket: undefined,
            }
        },
        sockets: {
            connect: function () {
                console.log('Connected to Socket');
            },
            hello:function(){
                console.log("Finally this shit is working")
            },
            newMessage: function(data){
                this.chat.messageTable.push(data)
            }
        },
        methods: {
            sendMessage: function () {
                this.$socket.client.emit('sendMessage', this.chat);
                this.chat.messageTable.push({
                    message:this.message,
                    username:this.username,
                });
                console.log('Sent message to socket')
            },
            fuckOff: function () {
                console.log("Fuck was called");
                this.$socket.client.emit('fuck', {msg: "fuck"});
            }
        },
    };
</script>

<style scoped>
    .chat {
        height: 100%;
        background-color: white;
    }
</style>
