<template>
  <v-app class="gameView">
    <Navbar/>
    <v-container id="container">
      <v-row align="center">
        <v-col align-self="start" cols="8">
          <Game/>
        </v-col>
        <v-col align-self="end" cols="4">
          <Chat/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
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
  .gameView{
    background-image: url("../assets/battle_background.jpg");
    background-position: center;
  }
</style>
