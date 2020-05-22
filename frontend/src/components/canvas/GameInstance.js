module.exports = class GameInstance{

    constructor(canvasId) {
        this.canvas= document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d')  //TODO: Export all those constant values in one configuration sheet
    }

    checkCompatibility(){
        if(this.canvas.getContext){
            console.log('Fuck yess... this garbage should work now')
            this.drawBackgroundColor('purple')
            this.drawTile()
        }else{
            console.log('ah geezzz... it seems, that canvas is not supported!')
        }
    }

    drawBackgroundColor(color){
        console.log("this function was called")
        this.ctx.fillStyle= color
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)
    }


    drawTile(){
        console.log("Drawing a tile")

        // Clean shit up
        this.ctx.beginPath()

        // apply styles
        this.ctx.fillStyle = 'black'
        this.ctx.strokeStyle = 'white'

        //Draw shit
        this.ctx.fillRect(20,20,50,50)
        this.ctx.strokeRect(20,20,50,50)
    }
}