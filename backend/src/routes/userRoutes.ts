import express from 'express';
import {User} from '../model/User'
const userRouter = express.Router();

userRouter.use((req,res,next)=>{
    // todo: implement middleware stuff here if necessary
    // todo: remove this middleware if it is not required anymore
    console.log(`You made a user request`);
    next();
});


userRouter.post("/getUserData",(req,res)=>{
   User
        .find({
            username: req.body.username // search query
        })
        .then(userData=>{
            res.send(userData)
        })
        .catch(err=>{
            res.send(err)
        })
});

userRouter.post("/login",(req,res)=>{
    // 1, Check, if Profile already exists or not
    // 2. If profile exists, log in :)
    // TODO: implement
    res.send('not implemented yet')
});

userRouter.post("/registerNewUser",async (req,res)=> {
    // Check if username is not already taken
    try{
        const userList = await User.find({email:req.body.email});
        if(userList.length >=1){
            return res.status(409).json({message:"email already in use"})
        }else{
            console.log("This user does not exist already")
        }
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        const data = await user.save();
        const token = await user.generateToken();
        console.log(token);
        res.status(201).json({data,token});
    }
    catch (err) {
       res.status(400).json({err})
    }

});

userRouter.post("/getVerificationMail",(req,res)=>{
       // todo: implement this method
    res.send('called the getVerificationMail method... not implemented yet')
 });

userRouter.put('/updateUser',(req,res)=>{
    // TODO: IMPLEMENT
    res.send('not implemented yet')
});

userRouter.put('/delete',(req,res)=>{
   User
        .findOneAndRemove({
            email: req.body.email
        })
        .then(response=>{
            res.send(response)
        })
        .catch(err=>{
            res.send(err)
        })
});

export {userRouter};

