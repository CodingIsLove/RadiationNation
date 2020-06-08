import express from 'express';
const chatRouter = express.Router();

chatRouter.post("/connectToGameInstance",(req,res)=>{
    // TODO: IMPLEMENT

    res.send('not implemented yet');
});

chatRouter.post("/killChatInstance",(req,res)=>{
    // TODO: IMPLEMENT
    res.send('not implemented yet');
});

chatRouter.post("/connect2globalChat",(req,res)=>{
    // TODO: IMPLEMENT
    res.send('not implemented yet');
});

chatRouter.post("/disconnectGlobalChat",(req,res)=>{
    // TODO: IMPLEMENT
    res.send('not implemented yet');
});

chatRouter.post("/sendMessage", (req, res) => {

    res.send('to be done');
});

export {chatRouter};
