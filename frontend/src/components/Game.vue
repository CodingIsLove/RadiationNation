<template>
    <v-app>
        <div class="text-center"><span class="float-left red--text">USA: {{this.usaGold}} {{$t("money")}} | {{this.usaHealth}} {{$t("life")}}</span>{{ $t('welcome') }} {{userName}}<span class="float-right blue--text">RUS: {{this.rusGold}} {{$t("money")}} | {{this.rusHealth}} {{$t("life")}}</span></div>
        <div id="gameContainer">
            <canvas id="gameScreen">Seems that your browser does not support canvas :(</canvas>
            <canvas id="controlPanel">Seems that your browser does not support canvas :(</canvas>
        </div>
    </v-app>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: "Game",
        data() {
            return {
                gameRoom: this.$route.params.gameRoom,
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
                map: new Array(this.amountOfColumns),
                gameSocket: null,
                xSpawn_One: this.gsTileWidth,
                imgToAnimate: new Image(),
                xSpawn_Two: this.gsTileWidth * 7,
                usaGold: 100,
                rusGold: 100,
                usaHealth: 50,
                rusHealth: 50
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
            // Setup Socket
            this.newSocket();

            // Setup Canvas
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
            newSocket() {
                this.gameSocket = io.connect('localhost:8081/game');
                this.gameSocket.on('connect',()=>{
                    console.log('shit was connected');
                    this.gameSocket.emit('room',2 ) //todo: replace 2 with the real mount of users
                });
                this.gameSocket.on('welcome', (data) => {
                    console.log(`The received data is: ${data}`)
                });
                this.gameSocket.on('newMap',(newMap)=>{
                    this.map = newMap;
                    this.drawMap();
                });
                this.gameSocket.on('currentPlayerPosition', (data)=>{
                    this.$store.commit('updateCurrentPlayerPosition',data.playerPosition)
                })
            },
            // ---- GS FUNCTIONS
            initializeGS: function() {
                // 1. Draw Grid
                // ---- Canvas Setup
                this.initializeMap();

                // ---- Add Event Listener
                // Onclick-Event for clicking on the GS
                this.vueCanvasGS.addEventListener('click',(event)=>{
                    this.gsClick(event);
                });
            },
            gsClick: function(event) {

                // Calculate X and Y Position clicked
                const x = event.clientX - this.rectGS.left;
                const y = event.clientY - this.rectGS.top;
                let row = Math.ceil(y / this.rectGSTileHeight) -1;
                let column = Math.ceil(x / this.rectGSTileWidth) -1;
                console.log(`Clicked on: (${x},${y})`);
                this.drawTile(row, column, 2);
                this.map[row][column] = 2;
                this.gameSocket.emit('updateGameState',this.map);
            },
            // ---- CP FUNCTIONS
            initializeCP: function () {

                var cp_warrior_1 = new Image();
                var cp_warrior_2 = new Image();
                var cp_warrior_3 = new Image();
                var cp_warrior_4 = new Image();
                var offset = 10;

                for (let i = 0; i < this.vueCanvasCP.width; i += this.cpTileWidth) {
                    if (i === 0) {
                        if (this.$store.getters.playerPosition === 1) {
                            cp_warrior_1.src = require('@/assets/sprites/warriors/cp_rus_warrior_1.png');
                        }
                        else if (this.$store.getters.playerPosition === 2) {
                            cp_warrior_1.src = require('@/assets/sprites/warriors/cp_usa_warrior_1.png');
                        }
                        cp_warrior_1.onload = () => {
                            document.getElementById("controlPanel").getContext('2d').drawImage(cp_warrior_1, i + offset/2, offset / 2, this.cpTileWidth - offset, this.vueCanvasCP.height - offset);
                        };
                    }
                    else if (i === this.cpTileWidth) {
                        if (this.$store.getters.playerPosition === 1) {
                            cp_warrior_2.src = require('@/assets/sprites/warriors/cp_rus_warrior_2.png');
                        }
                        else if (this.$store.getters.playerPosition === 2) {
                            cp_warrior_2.src = require('@/assets/sprites/warriors/cp_usa_warrior_2.png');
                        }
                        cp_warrior_2.onload = () => {
                            document.getElementById("controlPanel").getContext('2d').drawImage(cp_warrior_2, i + offset/2, offset / 2, this.cpTileWidth - offset, this.vueCanvasCP.height - offset);
                        };
                    }
                    else if (i === this.cpTileWidth * 2) {
                        if (this.$store.getters.playerPosition === 1) {
                            cp_warrior_3.src = require('@/assets/sprites/warriors/cp_rus_warrior_3.png');
                        }
                        else if (this.$store.getters.playerPosition === 2) {
                            cp_warrior_3.src = require('@/assets/sprites/warriors/cp_usa_warrior_3.png');
                        }
                        cp_warrior_3.onload = () => {
                            document.getElementById("controlPanel").getContext('2d').drawImage(cp_warrior_3, i + offset/2, offset / 2, this.cpTileWidth - offset, this.vueCanvasCP.height - offset);
                        };
                    }
                    else if (i === this.cpTileWidth * 3) {
                        if (this.$store.getters.playerPosition === 1) {
                            cp_warrior_4.src = require('@/assets/sprites/warriors/cp_rus_warrior_4.png');
                        }
                        else if (this.$store.getters.playerPosition === 2) {
                            cp_warrior_4.src = require('@/assets/sprites/warriors/cp_usa_warrior_4.png');
                        }
                        cp_warrior_4.onload = () => {
                            document.getElementById("controlPanel").getContext('2d').drawImage(cp_warrior_4, i + offset/2, offset / 2, this.cpTileWidth - offset, this.vueCanvasCP.height - offset);
                        };
                    }

                    this.ctxCP.rect(i, 0, this.cpTileWidth, this.vueCanvasCP.height);
                    this.ctxCP.fillStyle = 'grey';
                    this.ctxCP.lineWidth = 1;
                    this.ctxCP.strokeStyle = 'black';
                    this.ctxCP.fill();
                    this.ctxCP.stroke();
                }

                // ---- Add Event Listener
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
            cpClick:function(event){
                const x = event.clientX - this.rectCP.left;
                //const y = event.clientY - this.rectCP.top;

                if (x < this.rectCPTileWidth) {
                    this.spawnUnit('Swordfighter', 0);
                }
                else if (x < this.rectCPTileWidth * 2) {
                    this.spawnUnit('Knight', 0);
                }
                else if (x < this.rectCPTileWidth * 3) {
                    this.spawnUnit('Spearfighter', 0);
                }
                else if (x < this.rectCPTileWidth * 4) {
                    this.spawnUnit('Archer', 0);
                }
                else {
                    alert('Something went wrong! You pressed outside of the Canvas!');
                }
            },
            // ---- Game Functions
            spawnUnit(unitType) {
                var unitToSpawn = new Image();

                console.log(this.$store.getters.playerPosition);

                if (this.$store.getters.playerPosition === 1) {
                    switch(unitType) {
                        case 'Swordfighter':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_rus_warrior_1.png');
                            break;
                        case 'Knight':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_rus_warrior_2.png');
                            break;
                        case 'Spearfighter':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_rus_warrior_3.png');
                            break;
                        case 'Archer':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_rus_warrior_4.png');
                            break;
                        default:
                            return;
                    }
                    console.log('Player = RUS');
                    unitToSpawn.onload = () => {
                        this.rusGold -= 10;
                        this.imgToAnimate = unitToSpawn;
                        this.animateRightToLeft();
                    }
                }
                else if (this.$store.getters.playerPosition === 2) {
                    switch(unitType) {
                        case 'Swordfighter':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_usa_warrior_1.png');
                            break;
                        case 'Knight':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_usa_warrior_2.png');
                            break;
                        case 'Spearfighter':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_usa_warrior_3.png');
                            break;
                        case 'Archer':
                            unitToSpawn.src = require('@/assets/sprites/warriors/cp_usa_warrior_4.png');
                            break;
                        default:
                            return;
                    }
                    console.log('Player = USA');
                    unitToSpawn.onload = () => {
                        this.usaGold -= 10;
                        this.imgToAnimate = unitToSpawn;
                        this.animateLeftToRight();
                    }
                }
            },
            animateLeftToRight() {
                this.initializeMap();
                document.getElementById('gameScreen').getContext('2d').drawImage(this.imgToAnimate, this.xSpawn_One, 5 * this.gsTileHeight);
                this.xSpawn_One += 1;
                if (this.xSpawn_One < this.gsTileWidth * 7) {
                    requestAnimationFrame(this.animateLeftToRight);
                }
                else {
                    this.xSpawn_One = this.gsTileWidth;
                    this.rusHealth -= 10;
                    if (this.rusHealth === 0) {
                        this.playerWon('USA WON!');
                    }
                }
            },
            animateRightToLeft() {
                this.initializeMap();
                document.getElementById('gameScreen').getContext('2d').drawImage(this.imgToAnimate, this.xSpawn_Two, 5 * this.gsTileHeight);
                this.xSpawn_Two -= 1;
                if (this.xSpawn_Two > this.gsTileWidth) {
                    requestAnimationFrame(this.animateRightToLeft);
                }
                else {
                    this.xSpawn_Two = this.gsTileWidth * 7;
                    this.usaHealth -= 10;
                    if (this.usaHealth === 0) {
                        this.playerWon('RUSSIA WON!');
                    }
                }
            },
            playerWon(winner) {
                alert(winner)
            },
            // ---- MAP SETUP
            initializeMap() {
                this.selectMap(2);
                this.drawMap();
            },
            selectMap(int) {
              switch (int) {
                  // STANDARD MAP
                case 0:
                    for (let i = 0; i < this.amountOfColumns; i++) {
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
                            else if (i === 7 && j === 5 || i === 3 && j === 3) {
                                this.map[i][j] = 5;
                            }
                            else if (i === 3 && j === 4 || i === 7 && j === 3 || i === 6 && j === 4 || i === 4 && j === 2) {
                                this.map[i][j] = 6;
                            }
                            else {
                                this.map[i][j] = 1;
                            }
                        }
                    }
                    break;
                    //FOREST MAP
                case 1:
                    for (let i = 0; i < this.amountOfColumns; i++) {
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
                                this.map[i][j] = 6;
                            }
                        }
                    }
                    break;
                    // Forest vs Forest Map
                case 2:
                    for (let i = 0; i < this.amountOfColumns; i++) {
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
                            else if (i === 7 && j === 5 || i === 4 && j === 6 || i === 6 && j === 1 || i === 4 && j === 2) {
                                this.map[i][j] = 5;
                            }
                            else if (j === 0 || j === 1 || j === 2 || j === 5 || j === 6 || j === 7) {
                                this.map[i][j] = 6;
                            }
                            else {
                                this.map[i][j] = 1;
                            }
                        }
                    }
                    break;
              }
            },
            drawMap() {
                for (let i = 0; i < this.amountOfColumns; i++) {
                    for (let j = 0; j < this.amountOfRows; j++) {
                        this.drawTile(i, j, this.map[i][j]);
                    }
                }
            },
            drawTile(row, column, type) {
                const coordX = column * this.gsTileWidth;
                const coordY = row * this.gsTileHeight;

                var img = new Image;

                switch (type) {
                    case 0:
                        img.src = require('@/assets/sprites/background/sky.png');
                        break;
                    case 1:
                        img.src = require('@/assets/sprites/background/grass.png');
                        break;
                    case 2:
                        img.src = require('@/assets/sprites/background/path.png');
                        break;
                    case 3:
                        img.src = require('@/assets/sprites/background/castle.png');
                        break;
                    case 4:
                        img.src = require('@/assets/sprites/background/castle.png');
                        break;
                    case 5:
                        img.src = require('@/assets/sprites/background/house.png');
                        break;
                    case 6:
                        img.src = require('@/assets/sprites/background/forest.png');
                        break;
                    default:
                        break;
                }

                img.onload = ()=> {
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
