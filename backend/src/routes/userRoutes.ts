import express from 'express';
const userRouter = express.Router();


userRouter.use(()=>{
    console.log("This is a request for Users")
});

userRouter.get("/",(req,res)=>{
    console.log("This was request on the user")
});

export {userRouter};


