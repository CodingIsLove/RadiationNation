import express from 'express';
const resourceRouter = express.Router();

resourceRouter.get("/",(req,res)=>{
    console.log("This was request on the user")
});

export {resourceRouter};
