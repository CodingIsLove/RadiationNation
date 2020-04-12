import express from 'express';
const chatRouter= express.Router();

chatRouter.use((req,res,next)=>{
    console.log("Middleware: This is a request for Users")
    next()
});

chatRouter.post("/connectToGameInstance",(req,res)=>{
    //TODO: IMPLEMENT
    res.send('not implemented yet');
});

chatRouter.post("/killChatInstance",(req,res)=>{
    //TODO: IMPLEMENT
    res.send('not implemented yet');
});

chatRouter.post("/connect2globalChat",(req,res)=>{
    //TODO: IMPLEMENT
    res.send('not implemented yet');
});

chatRouter.post("/disconnectGlobalChat",(req,res)=>{
    //TODO: IMPLEMENT
    res.send('not implemented yet');
});

export {chatRouter};
