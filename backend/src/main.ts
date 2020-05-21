import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import socket from 'socket.io'

// Import all the different routes
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';
import {gameRouter} from './routes/gameInstanceState';
import path from "path";

// This is complete DB setup, after that you can just use the mongoose models
import './config/database'

// todo: Set up mongo as a session store

// ---- initialize configuration
const app = express();
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());


// ---- Socket Setup
// @ts-ignore
const server = http.Server(app);
const io = socket.io(server);

server.listen(3001);

io.on('connection', (webSocket) => {
    console.log('Server connection worked')
    webSocket.emit('news', { hello: 'world'});
    webSocket.on('my other event', (data) => {
        console.log(data);
    });
});


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
