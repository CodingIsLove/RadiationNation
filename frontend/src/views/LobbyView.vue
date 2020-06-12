<template>
    <v-app class="lobbyView">
        <Navbar class="navigation"/>
        <v-container id="container">
            <v-row align="center">
                <v-col align-self="start" cols="8">
                    <Lobby class="lobbyComponent"/>
                </v-col>
                <v-col align-self="end" cols="4">
                    <Chat class="chatComponent"/>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
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
    #container{
        height: 93vh;
    }

    .navigation {
        height: 7vh;
    }

    .lobbyComponent {
        align-self: start;
    }

    .chatComponent {
        height: 93vh;
    }

    .lobbyView{
        height: 100%;
        background-image: url("../assets/battle_background.jpg");
        background-position: center;
    }
</style>
