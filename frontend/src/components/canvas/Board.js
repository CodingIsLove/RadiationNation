const Tile = require('./Tile');

module.exports = class Board{
    constructor(canvas,amountOfTiles) {
        this.canvas = canvas
        this.backgroundColor = 'blue'
        this.grid = Array()
        this.amountOfTiles = amountOfTiles
        this.boardPadding = 50;
        this.ctx = canvas.getContext('2d')

        // Setup functions
        this.setupBackground()
        this.setupGrid()
    }


    setupGrid(){
        for(let i = 0; i<this.amountOfTiles;i++){
            for(let j = 0; j <this.amountOfTiles; j++){
                this.grid.push(new Tile(i,j,this.amountOfTiles,this.canvas,this.boardPadding,"PLANAR"))
                // this.grid.push( new Tile( i*this.tileSize +this.boardPadding, j*this.tileSize, this.tileSize,this.canvas)) todo: delete later => this is just the easiest approach to draw a grid
                // => But we want to create a transformation based on the coordinates of the grid
            }
        }
    }

    setupBackground(){
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
    }

    drawGrid(){
        this.grid.forEach((tile)=>{
            tile.drawTile()
        })
    }
}