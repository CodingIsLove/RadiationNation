import express from 'express';
const resourceRouter = express.Router();


resourceRouter.use(()=>{
    console.log("This is a request for Users")
});

resourceRouter.get("/",(req,res)=>{
    console.log("This was request on the user")
});

export {resourceRouter};
