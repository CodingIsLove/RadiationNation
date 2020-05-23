import mongoose from 'mongoose'

const gameRoomSchema = new mongoose.Schema({

    player1:{
        type:String,
        required:true
    },
    player2:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true,
        unique:true
    },
    map:{
        type:Array,
    },
});

const GameRoom = mongoose.model('GameRoom',gameRoomSchema);
export {GameRoom}

