<template>
    <v-app class="chat" app>
        <h2>{{chat.username}}</h2>
        <v-card class="card bg-info">
            <v-card-title>
                <h4>Radiation Nation Chat <span class="float-right">{{chat.connections}} {{ $t("message.Connections") }}</span></h4>
            </v-card-title>

            <v-list-group class="list-group list-group-flush text-right">
                <v-list-item-group class="list-group-item" v-for="message in chat.messageTable" :key="message.id">
                    <span>{{message.message}}
                        <small>:{{message.username}}</small>
                    </span>
                </v-list-item-group>
            </v-list-group>

            <v-card-actions class="card-body">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="chat.message" v-bind:placeholder="$t('message.EnterMessage')">
                    <v-btn class="v-btn black white--text float-right" v-bind:value="$t('message.Send')" @click="sendMessage"></v-btn>
                </div>
            </v-card-actions>

        </v-card>
    </v-app>
</template>

<script>
    import io from 'socket.io-client'

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
                roomId: this.$route.params.gameRoom || 'global'
            }
        },
        methods: {
            newSocket() {
                this.chatSocket = io.connect('localhost:8081/chat');
                this.chatSocket.on('connect', () => {
                    console.log('Chat socket is connected')
                    this.chatSocket.emit('room', this.roomId)
                });

                this.chatSocket.on('newMessage', (data) => {
                    this.chat.messageTable.push(data)
                });

                this.chatSocket.on('userUpdate',(data)=>{
                    this.chat.connections = data
                })
            },
            sendMessage() {
                this.chatSocket.emit('sendMessage', this.chat);
                this.chat.messageTable.push({
                    message: this.message,
                    username: this.username,
                });
                console.log('Sent message to socket')
            }
        },
        mounted() {
            this.newSocket()
            //todo: Get all the information from the VueX St
        }
    };
</script>

<style scoped>
    .chat {
        max-height: 93vh;
        background-color: green;
    }
</style>
