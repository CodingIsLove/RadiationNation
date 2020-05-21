<template>
    <v-app>
        <div>Welcome {{userName}}</div>
        <v-btn @click="initializeCP">Some stupid content here</v-btn>
        <div id="gameContainer">
            <canvas id="gameScreen">Seems that your browser does not support canvas :(</canvas>
            <canvas id="controlPanel">Seems that your browser does not support canvas :(</canvas>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "Game",
        data() {
            return {
                vueCanvasGS: {},
                vueCanvasCP: {},
                ctxGS: {},
                ctxCP: {},
                cpTileWidth: 0,
                amountCpTiles: 4,
            }
        },
        computed: {
            userName() {
                return this.$store.state.user.username
            },
            drawGame() {
                return 0
            },
            drawControlPanel() {
                return 0
            }
        },
        mounted() {
            let canvasGS = document.getElementById("gameScreen");
            let ctxGS = canvasGS.getContext('2d');
            let canvasCP = document.getElementById('controlPanel');
            let ctxCP = canvasCP.getContext('2d');
            this.vueCanvasGS = canvasGS;
            this.vueCanvasCP = canvasCP;
            this.ctxGS = ctxGS;
            this.ctxCP = ctxCP;
            this.cpTileWidth = this.vueCanvasCP.width / this.amountCpTiles;
            this.initializeCP();
            this.method();
        },
        methods: {
            initializeCP: function () {
                // 1. Draw 4 fields
                // 2. Color the fields and make them clickabe
                // 3. Set images into the fields
                // 4. Add the price tag for each element

                // Setup the panel fields
                for (let i = 0; i < this.vueCanvasCP.width; i += this.cpTileWidth) {
                    this.ctxCP.rect(i, 0, this.cpTileWidth, this.vueCanvasCP.height);
                    this.ctxCP.fillStyle = 'orange';
                    this.ctxCP.lineWidth = 1;
                    this.ctxCP.strokeStyle = 'black';
                    this.ctxCP.fill();
                    this.ctxCP.stroke()
                }

                // Add Event Listener
                this.vueCanvasCP.addEventListener('mousemove', (event) => {
                    this.move(event)
                });

                this.vueCanvasCP.addEventListener('click',(event)=>{
                    this.cpClick(event);
                })
            },
            move:function(event){
                console.log(`Your current position is: (${event.clientX},${event.clientY})`)
            },
            cpClick:function(e){
                console.log(`You clicked at position is: (${e.clientX},${e.clientY})`);
                console.log("the tile width is:" +this.cpTileWidth);
                if(e.clientX < this.cpTileWidth) {
                    alert(`You pressed tile 1`)
                }else if(e.clientX < this.cpTileWidth*2) {
                    alert(`You pressed tile 2`)
                }else if(e.clientX < this.cpTileWidth*3) {
                    alert(`You pressed tile 3`)
                }else if(e.clientX < this.cpTileWidth*4) {
                    alert(`You pressed the tile 4`)
                }else{
                    alert(`Oh Geez this should not happen`)
                }
            }
        }
    };
</script>

<style scoped>
    #gameContainer {
        height: 90%;
    }

    #gameScreen {
        width: 100%;
        height: 70%;
        border: 1px solid black;
    }

    #controlPanel {
        width: 100%;
        height: 10%;
        border: 1px solid black;
    }
</style>
