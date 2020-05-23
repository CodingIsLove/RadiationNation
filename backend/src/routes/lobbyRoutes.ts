import express from 'express';
const lobbyRouter = express.Router();
import {GameRoom} from '../model/GameRoom'

lobbyRouter.use((req,res,next)=>{
    console.log("Middleware: This is a request for LobbyRouter");
    next()
});

lobbyRouter.get('/getLobbyRooms',(req,res)=>{
    GameRoom.find({},(err,rooms)=>{
        if(err){
            res.status(409).json({message:err})
        }
       res.json(rooms) ;
    })
});

export {lobbyRouter};
