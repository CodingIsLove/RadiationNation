import express from 'express';
import {credentials} from '../misc/credentials'
import mongoose from 'mongoose';
import app from '../main'
import {userSchema} from '../schema/userSchema'
const userRouter = express.Router();
const User = mongoose.model('User',userSchema);
let opts = {
    server:{
        socketOptions:{ keepAlive:true}
    }};

switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString);
        break;
    default:
        throw new Error (`Unknown execution environment: ${app.get('env')}`);
}



// todo: will be used for email import {credentials} from '../misc/credentials'
// todo: implement later: import nodeMailer from 'nodeMailer'

userRouter.use((req,res,next)=>{
    // todo: implement middleware stuff here if necessary
    // todo: remove this middleware if it is not required anymore
    console.log(`You made a user request`);
    next();
});

// todo: delete the "/" call... i only needed it to understand how to generate a test
userRouter.post("/",(req,res)=>{
    // todo: implement this shit
    res.json({
        userId: "123",
        username: "chrisiBoy",
        password: "secret",
        email: "chris@mail.com"
    });
});

// Returns the user date for the user with id:userId
userRouter.post("/getUserData",(req,res)=>{
    // todo: implement this shit
    res.send('not implemented yet')
});

userRouter.post("/login",(req,res)=>{
    // TODO: implement
    res.send('not implemented yet')
});

userRouter.post("/register",(req,res)=>{
    // TODO: IMPLEMENT
    res.send('not implemented yet')
 });

userRouter.post("/getVerificationMail",(req,res)=>{
       // todo: implement this method
    res.send('called the getVerificationMail method... not implemented yet')
 });

userRouter.put('/updateUser',(req,res)=>{
    // TODO: IMPLEMENT
    res.send('not implemented yet')
});

export {userRouter};


