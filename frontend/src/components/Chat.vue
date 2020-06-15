<template>
    <v-container fluid class="chat">
        <v-card
                class="card bg-info"
                id="chatContainer"
                min-height="100%">
            <v-card-title>
                <h4>Chat - <span class="text-right">{{connections}} {{ $t("connections") }}</span></h4>
            </v-card-title>

            <v-list class="list-group list-group-flush text-left" id="chatMessages">
                <v-list-item-group class="list-group-item" v-for="message in messageTable" :key="message.id">
                    <span>{{message.username}}: {{message.message}}</span>
                </v-list-item-group>
            </v-list>

            <v-card-actions class="card-actions" id="chatAction">
                <v-text-field class="float-left" id="textfield" type="text" v-model="message"
                              v-bind:placeholder="$t('enterMessage')"></v-text-field>
                <v-btn class="v-btn grey white--text float-right" @click="sendMessage">{{$t("send")}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import io from 'socket.io-client'

    export default {
        data() {
            return {
                chatSocket: null,
                roomId: this.$route.params.gameRoom || 'global',
                message:"",
                messageTable:[]
            }
        },
        computed: {
            connections: function () {
                return this.$store.getters.amountOfClients
            },
            username: function () {
                return this.$store.getters.userName
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
                    this.messageTable.push(data)
                });

                this.chatSocket.on('userUpdate', (data) => {
                    this.$store.commit('updateAmountOfClients', data.amountOfClients)
                });

                this.chatSocket.on('error', (data) => {
                    alert(`ChatSocket: Error in Backend with Socket: ${data}`)
                })
            },
            sendMessage() {
                if (this.message !== "") {
                    this.chatSocket.emit('sendMessage', {
                        message:this.message,
                        username:this.username
                    });
                    this.clearTextField();
                    console.log('Sent message to socket')
                }
            },
            clearTextField() {
                document.getElementById("textfield").value = "";
                this.message = "";
            }
        },
        mounted() {
            this.newSocket();

            console.log(this.connections)
        }
    };
</script>

<style scoped>
    .card-actions {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .chat {
        overflow-y: auto;
        height: 100%;
    }
</style>
