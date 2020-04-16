import express from 'express';
import {UserModel} from '../schema/userSchema'
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
    UserModel.find({},(err,users)=>{
        const userMap  = {};
        users.forEach(user => {
            userMap[user.id] = user;
        });
        res.send(userMap);
    })
});

userRouter.post("/login",(req,res)=>{
    // 1, Check, if Profile already exists or not
    // 2. If profile exists, log in :)
    // TODO: implement
    res.send('not implemented yet')
});

userRouter.post("/register",(req,res)=> {
    // Check if username is not already taken
        const user = new UserModel({
            userId: req.body.userId,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        user.save()
            .then(doc=>{res.send(doc)})
            .catch(err=>{console.error(err)})
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


