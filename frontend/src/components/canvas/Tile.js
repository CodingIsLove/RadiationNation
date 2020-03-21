
module.exports = class Tile{
    /**
     * @param tileAmount defines the amount of tiles in x and y direction
     * @param canvas the canvas on which to draw
     * @param perspective you can choose between "PLANAR" or "ISOMETRIC"
     */
    constructor(x,y,tileAmount,canvas,margin,perspective) {
        this.x = x //Later apply transformation to this tile
        this.y = y
        this.margin = margin
        this.tileAmount = tileAmount
        this.canvas = canvas
        this.stdWidth = this.canvas.width// This can be any random value
        this.x_trafo =x
        this.y_trafo = y
        this.perspective = perspective
        this.ctx = this.canvas.getContext('2d')

        switch (perspective) {
            case "PLANAR":
                this.planarTransformation()
                break;
            case "ISOMETRIC":
                this.isometricTransformation()
                break
            default:
                throw "Your perspective is not defined!"
        }
    }

    drawTile(){
        console.log(`Drawing tile at position: (${this.x},${this.y})`)
        console.log(`Current perspective is: ${this.perspective}`)
        this.applyStandard()

        // Convert the base coordinates into coordinates of the choosen coordinate system
        if(this.perspective === "PLANAR"){
            this.ctx.fillRect(this.x_trafo,this.y_trafo,this.stdWidth-3,this.stdWidth-3)
            this.ctx.strokeRect(this.x_trafo,this.y_trafo,this.stdWidth-3,this.stdWidth-3)
        }else{
            console.log("Hello hello")
        }
    }

    //----------------------------------- Transformations ----------------------------------
    planarTransformation(){
        this.stdWidth = (this.canvas.height - this.margin) / this.tileAmount
        this.x_trafo = this.x*this.stdWidth + this.margin/2
        this.y_trafo = this.y*this.stdWidth + this.margin/2
        console.log(this.stdWidth)
    }

    isometricTransformation(){
        this.stdWidth = ((this.canvas.width-this.margin)/2)*Math.sqrt(2)
        let origin_x = this.margin
        //let origin_y = (this.canvas.height-this.margin)/2
        this.x_trafo = origin_x + this.stdWidth/Math.sqrt(2)*this.x
        this.y_trafo =


        this.x_trafo = origin_x
        this.stdWidth =(this.canvas . this.margin)/(2*Math.sqrt(2))
    }

    //----------------------------------- TileStates ----------------------------------
    applyStandard(){
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black'
        this.ctx.strokeStyle='white'
    }


}