import express from 'express';
const chatRouter= express.Router();


chatRouter.use(()=>{
    console.log("This is a request for Users")
});

chatRouter.get("/",(req,res)=>{
    console.log("This was request on the user")
});

export {chatRouter};
