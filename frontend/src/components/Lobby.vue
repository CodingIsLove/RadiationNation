<template>
    <v-container fluid class="lobby">
        <div class="chatRoomList" v-for="room in rooms" :key="room.roomId">
            <v-card
                    class="v-card"
                    raised="true"
                    hover="true"
                    ripple="true"
                    rounded="true"
                    @click="join(room.roomId)"
            >
                <v-card-title
                       text-xl
                >GameRoom: {{room.roomId}}</v-card-title>
                <v-card-text>
                    <div>Player One is: {{room.player1}}</div>
                    <div>Player One is: {{room.player2}}</div>

                    <v-card-actions v-if="room.player1">
                        <v-btn
                                text
                                @click="join(room.roomId)"
                                color="deep-purple accent-4"
                        >Join Game
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    import io from 'socket.io-client'

    export default {
        name: "Lobby",
        data() {
            return {
                lobbySocket: null,
            }
        },
        computed: {
            rooms() {
                return this.$store.getters.chatRooms;
            },
            roomIsFull() {
                console.log(this.room.player1 === "freeSlot" && this.room.player2 === "freeSlot")
                return this.room.player1 === "freeSlot" && this.room.player2 === "freeSlot"
            }
        },
        methods: {
            join(roomId) {
                console.log(roomId)
                this.lobbySocket.emit('join', {
                    roomId: roomId,
                    username: this.$store.getters.userName
                });
                this.lobbySocket.emit('')
                this.$router.push({path: `/game/${roomId}`})
            },
            newSockets() {
                this.lobbySocket = io.connect('localhost:8081/lobby');
                this.lobbySocket.on('connect', () => {
                    console.info('Socket connected')
                });
                this.lobbySocket.on('userLeftChat', () => {
                    console.log("Sweet some user left a fucking chat")
                    //this.store.dispatch('gameRoomUpdate',)
                });

                this.lobbySocket.on('updateLobby', () => {
                    this.$store.dispatch('updateChatroomData')
                })

                this.lobbySocket.on('error', (data) => {
                    alert(`LobbySocket: Error in Backend with Socket: ${data}`)
                })
            }
        },
        beforeMount() {
            console.log('Before Mount was called');
            this.$store.dispatch('updateChatroomData');
        },
        mounted() {
            this.newSockets()
        }
    };
</script>

<style scoped>
    .lobby {
        background-color: rgba(0, 0, 0, 0);
    }

    .v-card {
        margin: 20px;
        padding: 5px;
        transition: all .2s ease-in-out;
        background: radial-gradient(circle, transparent 10%, slategray 10%, slategray 80%, transparent 80%, transparent) 0% 0% / 100px 100px, radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent) 50px 50px / 100px 100px, linear-gradient(rgb(168, 177, 187) 8px, transparent 8px) 0px -4px / 50px 50px, linear-gradient(90deg, rgb(168, 177, 187) 8px, transparent 8px) -4px 0px / 50px 50px slategray;
        --darkreader-inline-bgimage: radial-gradient(circle, rgba(0, 0, 0, 0) 20%, #394451 20%, #394451 80%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0)), radial-gradient(circle, rgba(0, 0, 0, 0) 20%, #394451 20%, #394451 80%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0)), linear-gradient(#252d37 8px, rgba(0, 0, 0, 0) 8px), linear-gradient(90deg, #252d37 8px, rgba(0, 0, 0, 0) 8px);
        --darkreader-inline-bgcolor: #394451;
    }

    .v-card:hover {
        transform: scale(1.05);
    }

    .v-application--wrap {
        min-height: 83vh;
    }

</style>
