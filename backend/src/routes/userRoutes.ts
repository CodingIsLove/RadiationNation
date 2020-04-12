import express from 'express';
import mongoose from 'mongoose';
import {userSchema} from '../schema/userSchema'
const userRouter = express.Router();
const User = mongoose.model('User',userSchema);

// todo: will be used for email import {credentials} from '../misc/credentials'
// todo: implement later: import nodeMailer from 'nodeMailer'

userRouter.use((req,res,next)=>{
    // todo: implement middleware stuff here if necessary
    console.log(`You made a user request`);
    next();
});

// Returns the user date for the user with id:userId
userRouter.post("/getUserData",(req,res)=>{
    //todo: implement this shit
    res.send('not implemented yet')
});

userRouter.post("/login",(req,res)=>{
    //TODO: implement
    res.send('not implemented yet')
});

userRouter.post("/getVerificationMail",(req,res)=>{
    // todo: implement this method
    res.send('not implemented yet')
 });

userRouter.post("/register",(req,res)=>{
    //TODO: IMPLEMENT
    res.send('not implemented yet')
 });

userRouter.put('/updateUser',(req,res)=>{
    //TODO: IMPLEMENT
    res.send('not implemented yet')
});

userRouter.post("/getVerificationMail",(req,res)=>{
       // todo: implement this method
    res.send('called the getVerificationMail method... not implemented yet')
 });

export {userRouter};


