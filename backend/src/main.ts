import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
// import cors from 'cors'

// Import all the different routes
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';
import {gameRouter} from './routes/gameInstanceState';
import path from "path";
import './db/database' // This is complete DB setup, after that you can just use the mongoose models

// Set up mongo as a session store
// const MongoSessionStore = require('session-mongoose')(require('connect'));
// const sessionStore = new MongoSessionStore({url: credentials.mongo.production.connectionString});

// ---- initialize configuration
const app = express();
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession());
app.use(bodyParser.json());
// app.use(cors() => could prevent Cross-Origin Resource Sharing... currently not necessary, but could be important for late

// ---- primary page routing
app.get('/',(req,res)=>{
        res.send('Main thing of requests is working')
});

// ---- configure API
app.use('/static',express.static(path.join(__dirname, 'public')));
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
