<template>
    <v-app>
        <h1>Here will be the Game view</h1>
        <div class="ratioContainer">
            <canvas id="radiationNation" height="600px" width="900px" />
        </div>
        <v-btn @click="hello">Random Background Color</v-btn>
        <v-btn>draw random circle</v-btn>
        <v-btn @click="square">draw random square</v-btn>
    </v-app>
</template>

<script>
    const Board = require('./canvas/Board')
   //const GameInstance = require('./canvas/GameInstance')
export default {
  name: "Game",
    data: function(){
     return {
         gameField: Object,
         gameInstance: Object,
         canvas: Object
     }
    },
    methods:{
     hello: function () {
         console.log('Hello world fuckers')
     },
        square: function () {
         this.gameField.drawGrid()
        }
    },
    mounted() {
      console.log("Instance was mounted")
        this.canvas = document.getElementById('radiationNation')
        this.gameField= new Board(this.canvas,15);
        //this.gameInstance = new GameInstance('radiationNation');
        //this.gameInstance.checkCompatibility()
    }
};
</script>

<style scoped>
    .ratioContainer{
        display:flex;
        justify-content: center;
    }

    #radiationNation{
        width: 100%;
    }
</style>
