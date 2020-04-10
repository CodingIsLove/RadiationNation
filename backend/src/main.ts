import dotenv from 'dotenv';
import express, {Request, Response} from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {credentials} from './misc/credentials'
import expressSession from 'express-session';

// Import all the different routes
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';
import {errorRouter} from './routes/errorRoutes'



// ---- initialize configuration
const app = express();
dotenv.config();
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession());

app.use(bodyParser.json());

// ---- configure all the routes
app.use('/api/user', userRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/chat', chatRouter);
// todo: the last rout should be error handling, but not sure how to implement this
// app.use("/*", errorRouter);

app.get('/',(req,res)=>{
        res.send('Main thing of requests is working')
});

// ---- Start the server
app.listen(app.get('port'),()=>{
    console.log(`app is listening on port: ${app.get('port')}`);
});



