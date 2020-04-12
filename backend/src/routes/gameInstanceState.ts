import express from 'express';
const gameRouter = express.Router();


gameRouter.use((req,res,next)=>{
    console.log("Middleware GameInstanceRouter: This is a request for Users")
    next()
});

gameRouter.post("/getGameState/:gsessionId",(req,res)=>{
    //todo: implement
    res.send('not implemented yet');
});

gameRouter.post("/newGame",(req,res)=>{
    //todo: implement
    res.send('not implemented yet');
});

gameRouter.put("/updateGameState",(req,res)=>{
    //todo: implement
    res.send('not implemented yet');
});

gameRouter.delete("/killGameInstance",(req,res)=>{
    //todo: implement
    res.send('not implemented yet');
});

export {gameRouter};
