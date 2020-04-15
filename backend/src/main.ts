import dotenv from 'dotenv';
import express, {Request, Response} from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {credentials} from './misc/credentials'
import expressSession from 'express-session';
// import cors from 'cors'

// Import all the different routes
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';
import {gameRouter} from './routes/gameInstanceState';

// Set up mongo as a session store
// const MongoSessionStore = require('session-mongoose')(require('connect'));
// const sessionStore = new MongoSessionStore({url: credentials.mongo.production.connectionString});

// ---- initialize configuration
const app = express();
dotenv.config();
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession());
app.use(bodyParser.json());
// app.use(cors() => could prevent Cross-Origin Resource Sharing... currently not necessary, but could be important for late

// ---- primary page routing
app.get('/',(req,res)=>{
        res.send('Main thing of requests is working')
});

// ---- configure API
app.use('/api/user', userRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/chat', chatRouter);
app.use('/api/game', gameRouter);

app.get('/*',(req,res)=>{
   res.send('uuups something went wrong');
});

// ---- Start the server
app.listen(app.get('port'),()=>{
    console.log(`app is listening on port: ${app.get('port')}`);
});

// Export the application for testing purposes
export default app;


