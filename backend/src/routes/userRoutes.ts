import express from 'express';
import {User} from '../model/User'
import {authMiddleware} from '../config/auth';
import {mockData} from "../misc/mockData";

const userRouter = express.Router();

userRouter.post("/getUserData", (req, res) => {
    User
        .find({
            username: req.body.username // search query
        })
        .then(userData => {
            res.send(userData)
        })
        .catch(err => {
            res.status(404).send(err)
        })
});

userRouter.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({
                message: "Login failed! Check authentication credentials!"
            })
        }
        const token = await user.generateAuthToken();
        res.status(201).json({user, token})
    } catch (err) {
        res.status(400).json({message: "Shit something went wrong at User routes"})
    }
});

userRouter.get("/me", authMiddleware, async (req, res) => {
    // @ts-ignore
    await res.json(req.userData);
});

userRouter.post("/register", async (req, res) => {
    try {
        const userList = await User.find({email: req.body.email});
        const userName = await User.find({username: req.body.username});
        if (userList.length >= 1) {
            return res.status(409).json({message: "email already in use"});
        } else if (userName.length >= 1) {
            return res.status(409).json({message: "username already in use"})
        } else {
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
        res.status(201).json({data, token});
    } catch (err) {
        err.message = "something went wrong";
        res.status(400).json({err})
    }

});

userRouter.put('/updateUser', (req, res) => {
    // TODO: IMPLEMENT
    res.send('not implemented yet')
});

userRouter.delete('/delete', (req, res) => {
    User
        .findOneAndRemove({
            email: req.body.email
        })
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err)
        })
});

userRouter.delete('/allUsers', (req, res) => {
    User.deleteMany({}, (err) => {
        if (err) res.status(423).send(`DeleteAllUser failed with error: ${err}`)
        res.status(200).send('Sucessfully deleted all Users')
    })
});

userRouter.get('/allUsers', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(404).send('Error when requesting all the users')
        res.status(200).send(users)
    })
});


export {userRouter};

