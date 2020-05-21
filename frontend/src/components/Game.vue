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
                rectCP: undefined,
                rectTileWidth: 0
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
            // Canvas / CP is used for drawing only
            this.cpTileWidth = this.vueCanvasCP.width / this.amountCpTiles;
            // Rect is the actual size (used for position events, e.g. X and Y)
            this.rectCP = this.vueCanvasCP.getBoundingClientRect();
            this.rectTileWidth = this.rectCP.width / this.amountCpTiles;
            this.initializeCP();
        },
        methods: {
            initializeCP: function () {
                // 1. Draw 4 fields
                // 2. Color the fields and make them clickable
                // 3. Set images into the fields
                // 4. Add the price tag for each element

                // ---- Canvas Setup
                // Setup the panel fields - use Canvas / CP for drawing
                for (let i = 0; i < this.vueCanvasCP.width; i += this.cpTileWidth) {
                    this.ctxCP.rect(i, 0, this.cpTileWidth, this.vueCanvasCP.height);
                    this.ctxCP.fillStyle = 'orange';
                    this.ctxCP.lineWidth = 1;
                    this.ctxCP.strokeStyle = 'black';
                    this.ctxCP.fill();
                    this.ctxCP.stroke()
                }

                // ---- Add Event Listener
                // Onmousemove-Event on the CP
                this.vueCanvasCP.addEventListener('mousemove', (event) => {
                    this.move(event)
                });

                // Onclick-Event for clicking on the CP
                this.vueCanvasCP.addEventListener('click',(event)=>{
                    this.cpClick(event);
                });

                // Re-Calculate CP Width and Tile Width after Window resizing
                window.addEventListener('resize',()=>{
                    this.rectCP = this.vueCanvasCP.getBoundingClientRect();
                    this.rectTileWidth = this.rectCP.width / this.amountCpTiles;
                })


            },
            move:function(event){
                const x = event.clientX - this.rectCP.left;
                const y = event.clientY - this.rectCP.top;
                console.log('x: ' + x + ' y: ' + y);
            },
            cpClick:function(event){
                const x = event.clientX - this.rectCP.left;
                const y = event.clientY - this.rectCP.top;
                console.log(`You clicked at Position: (${x},${y})`);
                console.log('The Tile width / Total width is: ' + this.rectCP.width / this.amountCpTiles + ' / ' + this.rectCP.width + '.');
                if (x < this.rectTileWidth) {
                    alert('You pressed on Tile 1  (Left most Tile)');
                }
                else if (x < this.rectTileWidth * 2) {
                    alert('You pressed on Tile 2 (Second from Left)');
                }
                else if (x < this.rectTileWidth * 3) {
                    alert('You pressed on Tile 3 (Third from Left)');
                }
                else if (x < this.rectTileWidth * 4) {
                    alert('You pressed on Tile 4 (Right most Tile)');
                }
                else {
                    alert('Something went wrong! You pressed outside of the Canvas!');
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
