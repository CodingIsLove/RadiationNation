<template>
    <v-content class="lobbyView">
        <Navbar/>
        <v-container fluid class="lobbyContainer">
            <v-row align="start">
                <v-col align-self="start" cols="8">
                    <Lobby/>
                </v-col>
                <v-col align-self="end" cols="4">
                    <Chat/>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import Lobby from "../components/Lobby";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
export default {
  name: "LobbyView",
  components: { Navbar, Lobby,Chat },
    methods:{
      joinGame(){
         console.log("Hello hello, time to join a game")
      }
    }
};
</script>

<style scoped>

    .lobbyContainer {

    }

    .lobbyView{
        height: 100vh;
        background-image: url("../assets/battle_background.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
