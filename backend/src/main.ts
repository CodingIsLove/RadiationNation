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
import {gameRouter} from './routes/gameInstanceState';
import {socketDataRouter} from './routes/socketDataRoutes'
import {getChatSocket} from './sockets/chatSocket'
import {getGameSocket} from './sockets/gameSocket';
import {getLobbySocket} from './sockets/lobbySocket'
import path from "path";
import './config/database'
import {setupDb} from './config/setupDb'


// ---- initialize configuration
setupDb();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server); // todo: Add later the routes for the socket

// --- configure app
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by'); // omit information, that could help hackers
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// ---- configure REST API
app.get('/', (req, res) => {
    res.send('Main thing of requests is working')
});
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/user', userRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/game', gameRouter);
app.use('/api/socket_data', socketDataRouter)
app.get('/*', (req, res) => {
    res.status(404).send('uuups something went wrong');
});

// ------ Configure Sockets
const chatSocket = getChatSocket(io);
const gameSocket = getGameSocket(io);
const lobbySocket = getLobbySocket(io);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`);
});

