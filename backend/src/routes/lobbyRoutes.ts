import express from 'express';
const lobbyRouter = express.Router();
import {GameRoom} from '../model/GameRoom'

lobbyRouter.get('/getLobbyRooms',(req,res)=>{
    GameRoom.find({},(err,rooms)=>{
        if(err){
            res.status(409).json({message:err})
        }
       res.json(rooms) ;
    })
});

export {lobbyRouter};
