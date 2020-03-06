<template>
  <div class="GameView">
    <h1>Welcome to the gameview</h1>
    <Game />
  </div>
</template>

<script>
import Game from "../components/Game";
export default {
  name: "GameView",
  components: { Game }
};
</script>

<style scoped></style>
