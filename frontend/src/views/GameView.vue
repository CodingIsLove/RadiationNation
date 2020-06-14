<template>
  <v-container fluid class="gameView">
    <Navbar/>
    <v-container fluid id="container">
      <v-row align="center">
        <v-col align-self="start" cols="8">
          <Game/>
        </v-col>
        <v-col align-self="end" cols="4">
          <Chat/>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>


<script>
import Game from "../components/Game";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

export default {
  name: "GameView",
  components: { Game,Navbar,Chat }
};
</script>

<style scoped>
  #container{
    background-image: url("../assets/battle_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
