import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import socketio from 'socket.io'
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';
import {gameRouter} from './routes/gameInstanceState';
import path from "path";
import './config/database'

// ---- initialize configuration
const app = express();

const http = require('http').Server(app);
const io = require("socket.io")(http);

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

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

/*
const io = skt(server,{
    path:'/globalChat'
});
 */

io.on('connection', (socket)=> {
    const chatmsg = [];
    console.log('Server connection worked');
    console.log('Fucking nice m8t');

    // Connection events
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
    socket.on('sendMessage',(data)=>{
        chatmsg.push({
            message: data.message,
            username: data.username,
        });
        socket.emit('newMessage',chatmsg[chatmsg.length-1]);
        console.log(chatmsg.length);
        console.log('Fucking shit shche logg');
        console.log(`And the data is: ${data.message}`);
    });
});

const server = http.listen(process.env.PORT,()=>{
    console.log(`listening on port: ${process.env.PORT}`);
});

