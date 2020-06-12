import express from 'express';
import {GameRoom} from '../model/GameRoom'
import {gameRoomTemplates} from "../misc/roomTemplates";

const gameRouter = express.Router();

gameRouter.get("/gameState/:gsessionId", (req, res) => {
    GameRoom.findOne({roomId:req.params.gsessionId},(err,docs)=>{
        if(err) res.status(404).send(`Gamesession does not exist. raised error: ${err}`)
        res.status(200).json(docs)
    })
});

gameRouter.post("/newGame/:roomId", async (req, res) => {
    try {
        const gameState = new GameRoom({
            map: req.body.map,
            player1: req.body.player1,
            player2: req.body.player2,
            socketId: req.body.socketId
        });
        const data = await gameState.save();
        res.status(201).json(data);
    } catch (e) {
        res.status(400).json({message: "Could not create a new Game"})
    }
});

gameRouter.post("/updateGameState/:roomId", async (req, res) => {
    try {
        const gameStateList = await GameRoom.find({socketId: req.body.socketId});
        if (gameStateList.length > 1) {
            return res.status(409).json({message: "shit... it looks like this socket has more than one instance!"})
        } else if (gameStateList.length === 0) {
            return res.status(409).json({message: "It looks, like there does not exist any instance of this socketId"})
        } else {
            console.log("Looks good to this point")
        }

        const gameRoom = new GameRoom({
            map: req.body.map,
            player1: req.body.player1,
            player2: req.body.player2,
            socketId: req.body.socketId
        });

        const data = await gameRoom.save();
        res.status(201).json(data)
    } catch (err) {
        res.status(400).json({err})

    }
});

gameRouter.put("/resetAllRooms", async (req, res) => {
        try {
            // Clear all rooms
            GameRoom.deleteMany({}, (err) => {
                if (err) res.status(400).send(`Could not delete all rooms because of err: ${err}`)
            })

            // Fill room with default values
            for (let i = 0; i < 10; i++) {
                const someRoom = gameRoomTemplates.defaultRoom;
                someRoom.roomId = i
                const gameRoom = new GameRoom(someRoom)
                const data = await gameRoom.save();
            }
            res.status(201).send('sucessfully updated the db')
        } catch
            (err) {
            res.status(400).json({err})
        }
    }
)

gameRouter.delete('/allRooms',(req,res)=>{
    GameRoom.deleteMany({}, (err)=>{
        if(err) res.status(400).send(`Could not del all rooms because of err: ${err}`)
        res.status(200).send('Sucessfully deleted all RoomInstances')
    })
})

export {gameRouter};
