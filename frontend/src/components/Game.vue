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
                rectCPTileWidth: 0,
                map: new Array(this.amountOfColumns)
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
            // ---- GS FUNCTIONS
            initializeGS: function() {
                // 1. Draw Grid
                // ---- Canvas Setup
                this.initializeMap();

                // ---- Add Event Listener
                // Onmousemove-Event on the GS
                this.vueCanvasGS.addEventListener('mousemove', (event) => {
                    this.gsMouseHover(event)
                });

                // Onclick-Event for clicking on the GS
                this.vueCanvasGS.addEventListener('click',(event)=>{
                    this.gsClick(event);
                });
            },
            gsMouseHover: function(event) {
                const x = event.clientX - this.rectGS.left;
                const y = event.clientY - this.rectGS.top;
                console.log('x: ' + x + ' y: ' + y);
                // Calculate Row (Height)
                let row = Math.ceil(y / this.rectGSTileHeight) -1;

                // Calculate Column (Width)
                let column = Math.ceil(x / this.rectGSTileWidth) -1;

                const coordX = column * this.rectGSTileWidth;
                const coordY = row * this.rectGSTileHeight;

                console.log(`Hovering over: (${coordX}, ${coordY})`)

            },
            gsClick: function(event) {

                // Calculate X and Y Position clicked
                const x = event.clientX - this.rectGS.left;
                const y = event.clientY - this.rectGS.top;
                let row = Math.ceil(y / this.rectGSTileHeight) -1;
                let column = Math.ceil(x / this.rectGSTileWidth) -1;
                console.log(`Clicked on: (${x},${y})`);
                this.drawTile(row, column, 2);


            },
            // ---- CP FUNCTIONS
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
            },
            // ---- MAP SETUP
            initializeMap() {
                for(let i = 0; i < this.amountOfColumns; i++) {
                    this.map[i] = new Array(this.amountOfRows);
                    for (let j = 0; j < this.amountOfRows; j++) {
                        if (i <= 2) {
                            this.map[i][j] = 0;
                        }
                        else if (i === 5 && j === 0) {
                            this.map[i][j] = 3;
                        }
                        else if (i === 5 && j === 7) {
                            this.map[i][j] = 4;
                        }
                        else if (i === 5) {
                            this.map[i][j] = 2;
                        }
                        else {
                            this.map[i][j] = 1;
                        }
                    }
                }
                this.drawMap();
            },
            drawMap(){
                for(let i=0; i< this.amountOfColumns; i++) {
                    for (let j= 0; j < this.amountOfRows; j++) {
                        this.drawTile(i,j,this.map[i][j]);
                    }
                }
                console.log(this.map)
            },
            drawTile(row,column,type){
                const coordX = column * this.gsTileWidth;
                const coordY = row * this.gsTileHeight;

                var img = new Image;

                switch (type) {
                    case 0:
                        img.src = require('@/assets/tiles/sky.png');
                        break;
                    case 1:
                        img.src = require('@/assets/tiles/grass.png');
                        break;
                    case 2:
                        img.src = require('@/assets/tiles/path.png');
                        break;
                    case 3:
                        img.src = require('@/assets/tiles/russia_base.png');
                        break;
                    case 4:
                        img.src = require('@/assets/tiles/usa_base.png');
                        break;
                    default:
                        break;
                }

                img.onload = ()=> {
                    console.log(this.gsTileWidth);
                    document.getElementById("gameScreen").getContext('2d').drawImage(img, coordX, coordY, this.gsTileWidth , this.gsTileHeight);
                };
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
