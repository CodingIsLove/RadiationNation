import express from 'express';
import mongoose from 'mongoose';
import {User} from '../schema/userSchema'
const userRouter = express.Router();




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
    // define guard, to see if user is already logged in or not
    mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        User.findById()
    });
});

userRouter.post("/login",(req,res)=>{
    // 1, Check, if Profile already exists or not
    // 2. If profile exists, log in :)
    // TODO: implement
    res.send('not implemented yet')
});

userRouter.post("/register",(req,res)=> {
    // Check if username is not already taken

    mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        new User({
            userId: req.body.userId,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).save((err, user) => {
            if (err) res.send('Missing parameters in the request')
            res.send(user)
        });
    });
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


