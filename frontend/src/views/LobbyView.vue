<template>
    <v-app class="lobbyView">
        <Navbar/>
        <v-container id="container">
            <v-row align="center">
                <v-col align-self="start" cols="8">
                    <Lobby/>
                </v-col>
                <v-col align-self="end" cols="4">
                    <Chat/>
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
  components: {Navbar, Lobby,Chat },
    methods:{
      joinGame(){
         console.log("Hello hello, time to join a game")
      }
    }
};
</script>

<style scoped>
    #container{
        height: 100%;
    }
    #joinBttn{
        width: 100%;
    }

    .lobbyView{
        background-image: url("../assets/battle_background.jpg");
        background-position: center;
    }
</style>
