<template>
    <v-app class="lobby">
        <div class="chatRoomList" v-for="room in rooms" :key="room.roomId">
            <div class="chatRoom" >
                <div class="details">
                    <div>Player 1: {{room.player1}}</div>
                    <div>Player 2: {{room.player2}}</div>
                    <div>RoomId is: {{room.roomId}}</div>
                </div>
                <v-btn @click="join(room.roomId)" >Join Game Room {{room.roomId}}</v-btn>
            </div>
        </div>
    </v-app>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        name: "Lobby",
        data(){
            return{
                lobbySocket:null,
            }
        },
        computed:{
            rooms(){
                return this.$store.getters.chatRooms;
            }
        },
        methods: {
            join(roomId) {
                console.log(roomId)
                this.lobbySocket.emit('join');
                this.$router.push({path: `/game/${roomId}`})
            },
            newSockets(){
                this.lobbySocket = io.connect('localhost:8081/lobby');
                this.lobbySocket.on('connect',()=>{
                    this.$store.dispatch('updateChatroomData')
                });
                this.lobbySocket.on('userLeftChat',()=>{
                    console.log("Sweet some user left a fucking chat")
                    //this.store.dispatch('gameRoomUpdate',)
                });
            }
        },
        beforeMount(){
            console.log('Before Mount was called');
            this.$store.dispatch('updateChatroomData');
        },
        mounted(){
            this.newSockets()
        }
    };
</script>

<style scoped>
    .lobby {
        height: 95%;
        background-color: grey;
    }

    .chatRoom {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-color: blue;
        padding: 20px;
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .details {
        width: 70%;
    }


</style>
