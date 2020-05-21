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
                ctxGS: {},
                amountOfColumns: 8,
                amountOfRows: 8,
                rectGS: undefined,
                rectGSTileWidth: 0,
                rectGSTileHeight: 0,
                gsTileHeight: 0,
                gsTileWidth: 0,

                vueCanvasCP: {},

                ctxCP: {},
                cpTileWidth: 0,
                amountCpTiles: 4,
                rectCP: undefined,
                rectCPTileWidth: 0
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
            // CP
            this.cpTileWidth = this.vueCanvasCP.width / this.amountCpTiles;
            // GS
            this.gsTileWidth = this.vueCanvasGS.width / this.amountOfRows;
            this.gsTileHeight = this.vueCanvasGS.height / this.amountOfColumns;
            // Rect is the actual size (used for position events, e.g. X and Y)
            // CP
            this.rectCP = this.vueCanvasCP.getBoundingClientRect();
            this.rectCPTileWidth = this.rectCP.width / this.amountCpTiles;
            // GS
            this.rectGS = this.vueCanvasGS.getBoundingClientRect();
            this.rectGSTileWidth = this.rectGS.width / this.amountOfColumns;
            this.rectGSTileHeight = this.rectGS.height / this.amountOfRows;

            // Initialize Canvas
            this.initializeCP();
            this.initializeGS();
        },
        methods: {
            initializeGS: function() {
                // 1. Draw Grid
                // ---- Canvas Setup
                for (let j = 0; j < this.vueCanvasGS.width; j += this.gsTileWidth) {
                    for (let k = 0; k < this.vueCanvasGS.height; k += this.gsTileHeight) {
                        // Draw Tiles
                        console.log('Drawing GS');
                        this.ctxGS.rect(j, k, this.gsTileWidth, this.gsTileHeight);
                        this.ctxGS.fillStyle = 'blue';
                        this.ctxGS.lineWidth = 1;
                        this.ctxGS.strokeStyle = 'green';
                        this.ctxGS.fill();
                        this.ctxGS.stroke()
                    }
                }
                // 2. Fill the Grid Tiles with the corresponding Tile img/layout/status
                // 3. Spawn Figures
                // 4. Add Game functions: Wincondition, Fight, etc.
            },
            initializeCP: function () {
                // 1. Draw 4 fields
                // 2. Color the fields and make them clickable
                // 3. Set images into the fields
                // 4. Add the price tag for each element

                // ---- Canvas Setup
                // Setup the panel fields - use Canvas / CP for drawing
                for (let i = 0; i < this.vueCanvasCP.width; i += this.cpTileWidth) {
                    console.log('Drawing CS');
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
                    // CP
                    this.rectCP = this.vueCanvasCP.getBoundingClientRect();
                    this.rectCPTileWidth = this.rectCP.width / this.amountCpTiles;
                    // GS
                    this.rectGS = this.vueCanvasGS.getBoundingClientRect();
                    this.gsTileWidth = this.vueCanvasGS.width / this.amountOfRows;
                    this.gsTileHeight = this.vueCanvasGS.height / this.amountOfColumns;
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
                if (x < this.rectCPTileWidth) {
                    alert('You pressed on Tile 1  (Left most Tile)');
                }
                else if (x < this.rectCPTileWidth * 2) {
                    alert('You pressed on Tile 2 (Second from Left)');
                }
                else if (x < this.rectCPTileWidth * 3) {
                    alert('You pressed on Tile 3 (Third from Left)');
                }
                else if (x < this.rectCPTileWidth * 4) {
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
