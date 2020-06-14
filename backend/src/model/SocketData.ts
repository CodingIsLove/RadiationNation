import mongoose from 'mongoose'

const socketDataSchema = new mongoose.Schema({
    amountOfClients:{
        type:Number,
        default:0,
        required:true
    },
    roomId:{
        type:String,
        required:true,
        unique:true
    }
});

const SocketData = mongoose.model('SocketData',socketDataSchema);
export {SocketData}