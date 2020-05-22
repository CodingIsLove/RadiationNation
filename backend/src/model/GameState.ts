import mongoose from 'mongoose'


const gameStateSchema = new mongoose.Schema({
    map:{
        type:Array,
    },
    player1:{
        type:String,
        required:true
    },
    player2:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
        required:true
    }
});

const GameState = mongoose.model('GameState',gameStateSchema);
export {GameState}

