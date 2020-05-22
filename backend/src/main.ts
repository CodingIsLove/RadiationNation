import dotenv from 'dotenv';

dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';
import {gameRouter} from './routes/gameInstanceState';
import path from "path";
import './config/database'

// ---- initialize configuration
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server); // todo: Add later the routes for the socket


app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// ---- primary page routing
app.get('/', (req, res) => {
    res.send('Main thing of requests is working')
});

// ---- configure API
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/user', userRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/chat', chatRouter);
app.use('/api/game', gameRouter);

app.get('/*', (req, res) => {
    res.send('uuups something went wrong');
});

io.on('connection', (socket) => {
    const chatmsg = [];
    console.log('New User Connected to the socket');
    socket.emit('connect',"Fuck off brudi");
    // Connection events
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
    socket.on('fuck',(data)=>{
       console.log(data)
        socket.emit('hello',"Here you go")
    });
    socket.on('sendMessage', (data) => {
        chatmsg.push({
            message: data.message,
            username: data.username,
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        });
        console.log(chatmsg.length);
        console.log(`And the data is: ${data.message}`);
        io.emit('newMessage',chatmsg[chatmsg.length - 1]);
    });
});

server.listen(process.env.PORT, ()=>{
    console.log(`Server is running on localhost:${process.env.PORT}`);
});

