import express from 'express';
import {GameState} from '../model/GameState'
const gameRouter = express.Router();

gameRouter.get("/getGameState/:gsessionId", (req, res) => {
    // todo: implement
    res.send('not implemented yet');
});

gameRouter.post("/newGame", async (req, res) => {
    try {
        const gameState = new GameState({
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

gameRouter.post("/updateGameState", async (req, res) => {
    try {
        const gameStateList = await GameState.find({socketId: req.body.socketId});
        if (gameStateList.length > 1) {
            return res.status(409).json({message: "shit... it looks like this socket has more than one instance!"})
        } else if (gameStateList.length === 0) {
            return res.status(409).json({message: "It looks, like there does not exist any instance of this socketId"})
        } else {
            console.log("Looks good to this point")
        }

        const gameState = new GameState({
            map: req.body.map,
            player1: req.body.player1,
            player2: req.body.player2,
            socketId: req.body.socketId
        });

        const data = await gameState.save();
        res.status(201).json(data)
    } catch (err) {
        res.status(400).json({err})

    }

});

gameRouter.delete("/killGameInstance", (req, res) => {
    // todo: implement
    res.send('not implemented yet');
});

export {gameRouter};
