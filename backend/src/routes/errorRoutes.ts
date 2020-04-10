import express from 'express';
const errorRouter = express.Router();

errorRouter.get("/*",(req,res)=>{
    res.send(`This route does not exist. The used ip was ${req.ip}`)
});

export {errorRouter};
