import dotenv from 'dotenv';
import express, {Request, Response} from "express";
// import path from "path";

// Import all the different routes
import {userRouter} from './routes/userRoutes';
import {resourceRouter} from './routes/resourcesRoutes';
import {chatRouter} from './routes/chatInstanceRoutes';

const app = express();
const port = 8080;

// initialize configuration
dotenv.config();

// configure all the routes
app.use('/user', userRouter);
app.use('/resource', resourceRouter);
app.use('/chat', chatRouter);

app.get('/', (req, res)=>{
    res.send("Hello Hello server is running")
})

// Start the server
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
});



