import express from 'express';
import {User} from '../model/User'
import {authMiddleware} from '../config/auth';
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

userRouter.post("/login",async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if(!user){
           return res.status(401).json({
               message:"Login failed! Check authentication credentials!"
           })
        }
        const token = await user.generateAuthToken();
        res.status(201).json({user,token})
    }catch (err) {
        res.status(400).json({message:"Shit something went wrong"})
    }
});

userRouter.get("/me",authMiddleware,async (req,res)=>{
    // @ts-ignore
    await res.json(req.userData);
});

userRouter.post("/register",async (req,res)=> {
    try{
        const userList = await User.find({email:req.body.email});
        const userName = await User.find({username:req.body.username});
        if(userList.length >=1 ){
            return res.status(409).json({message:"email already in use"});
        }else if(userName.length >=1){
            return res.status(409).json({message:"username already in use"})
        }else{
            console.log("This user does not exist already")
        }
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        const data = await user.save();
        const token = await user.generateAuthToken();
        console.log(token);
        res.status(201).json({data,token});
    }
    catch (err) {
        err.message = "something went wrong";
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

