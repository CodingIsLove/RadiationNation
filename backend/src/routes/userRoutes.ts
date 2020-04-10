import express from 'express';
import mongoose from 'mongoose';
import {userSchema} from '../schema/userSchema'
import {credentials} from '../misc/credentials'
import nodeMailer from 'nodeMailer'
const userRouter = express.Router();
const User = mongoose.model('User',userSchema);


userRouter.use((req,res,next)=>{
    console.log(`You made a user request`);
    next();
});

userRouter.get("/",(req,res)=>{
    console.log("This was request on the user")
    res.send('At least the get request is working fine')
});

userRouter.post("/getUserData",(req,res)=>{
    console.log(`the userId is: `)
});

userRouter.post("/getVerificationMail",(req,res)=>{
    const mailTransport = nodeMailer.createTransport('SMTP',{
       service: 'Gmail',
       auth: {
        user: credentials.gmail.user,
        pass: credentials.gmail.password
       }
   });

   mailTransport.sendMail({
    from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
    to: 'joecustomer@gmail.com',
    subject: 'Your Meadowlark Travel Tour',
    text: 'Thank you for booking your trip with Meadowlark Travel. ' +
    'We look forward to your visit!',
    },
    (err)=>{
    if(err) console.error( 'Unable to send email: '+ err );
    });

    res.send('Mail was published');
 });

// Todo: write this here clean
userRouter.put('/:userId',(req,res)=>{
    console.log(`the userId is:${req.params.userId} `);
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.Mongo_PASSWORD}@radiationnation-zusae.mongodb.net/test?retryWrites=true&w=majority`,{ useUnifiedTopology: true, useNewUrlParser:true});
    const db = mongoose.connection;

    db.on('error',console.error.bind(console, 'connection-error:'));
    db.once('open',()=>{
        const newUser = new User({
            userId:'1233',
            username: 'Gmann',
            password:'bliblablu',
            email:'christopher.germann@bliblablu.com'
        });

        // Save the user to the database
        newUser.save((err)=>{
            if(err) return console.error(err);
            console.log('new user was saved to the database')
        });

        // find all the users in the database
        User.find((err, users)=>{
            if(err) return console.error(err);
            console.log(users)
        });

        // Search for a specific user
        User.find({"userId": /1233/},()=>{
            console.log('found ya :P.')
        });
    })
});

export {userRouter};


