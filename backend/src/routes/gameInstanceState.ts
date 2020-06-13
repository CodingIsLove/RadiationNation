import express from 'express';
import {GameRoom} from '../model/GameRoom'
import {gameRoomTemplates} from "../misc/roomTemplates";

const gameRouter = express.Router();

gameRouter.get("/gameState/:gsessionId", (req, res) => {
    GameRoom.findOne({roomId: req.params.gsessionId}, (err, docs) => {
        if (err) res.status(404).send(`Gamesession does not exist. raised error: ${err}`)
        res.status(200).json(docs)
    })
});

gameRouter.put('/joinGameRoom/:roomId', (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(402).send('To join a room, you have to provide User data in the body')
        } else {
            GameRoom.findOne({roomId: req.params.roomId}, async (err, doc) => {
                if (err) {
                    res.status(404).send(`joinGameRoom failed with error: ${err}`)
                } else if (doc.player1 === "freeSlot") {
                    doc.player1 = req.body.username
                    await doc.save()
                    res.status(201).send('Sucessfully updated Slot 1')
                } else if (doc.player2 === "freeSlot") {
                    if (req.body.username === doc.player1) {
                        res.status(400).send('This user already exists')
                    } else {
                        doc.player2 = req.body.username
                        await doc.save()
                        res.status(201).send('Sucessfully updated Slot 2')
                    }
                } else if (doc.player2 !== "freeSlot") {
                    res.status(400).send('GameRoom is already full')
                } else {
                    res.status(400).send('I have no fucking clue, how this happend')
                }
            })
        }
    } catch (err) {
        res.status(404).json({err})
    }
})

gameRouter.put('/updateMap/:roomId', async (req, res) => {
    try {
        const doc = await GameRoom.findOne({roomId: req.params.roomId})
        doc.map = req.body.map
        const data = await doc.save()
        res.status(201).send(data)
    } catch (err) {
        res.status(400).json(err)
    }
})


// todo: /updateGameState is something i think i will not need! remove this later if not necessary
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
})

gameRouter.put('/resetRoom/:roomId', (req, res) => {
    GameRoom.findOne({roomId: req.params.roomId}, async (err, doc) => {
        if (err) res.status(400).send(`Issues finding the room. Error: ${err}`)
        try {
            doc.player1 = gameRoomTemplates.defaultRoom.player1
            doc.player2 = gameRoomTemplates.defaultRoom.player2
            doc.map = gameRoomTemplates.maps.default_level.map
            await doc.save()
            res.status(201).send(doc)
        } catch (err) {
            res.status(400).send(`Error writing to db: ${err}`)
        }
    })
})

gameRouter.delete('/allRooms', (req, res) => {
    GameRoom.deleteMany({}, (err) => {
        if (err) res.status(400).send(`Could not del all rooms because of err: ${err}`)
        res.status(200).send('Sucessfully deleted all RoomInstances')
    })
})

export {gameRouter};
