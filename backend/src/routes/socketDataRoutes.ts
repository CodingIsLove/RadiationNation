import express from 'express';
import {SocketData} from '../model/SocketData'
import {User} from "../model/User";

const socketDataRouter = express.Router();

socketDataRouter.post("/setup", async (req, res) => {
    try {
        const globalChat = new SocketData({roomId: 'global'})
        await globalChat.save()
        for (let i = 0; i < 10; i++) {
            const socketDataObj = new SocketData({roomId: i})
            await socketDataObj.save()
        }
        res.status(200).send(`Sucessfully created SocketData setup`)
    } catch (err) {
        res.status(400).send(`SocketDataSetup failed with err: ${err}`)
    }
});

socketDataRouter.get("/allDocs", (req, res) => {
    SocketData.find({}, (err, docs) => {
        if (err) res.status(400).send(`Could not query all the Router docs because of err: ${err}`)
        res.status(200).send(docs)
    })
});

socketDataRouter.get("/:roomId", (req, res) => {
    SocketData.findOne({roomId: req.params.roomId}, (err, doc) => {
        if (err) res.status(400).send(`Could not query all the Router docs because of err: ${err}`)
        res.status(200).send(doc)
    })
});

socketDataRouter.get("/clientAmount/:roomId", (req, res) => {
    SocketData.findOne({roomId: req.params.roomId}, (err, doc) => {
        if (err) res.status(400).send(`Could not return amount of clients because of: ${err}`)
        console.log(doc)
        res.status(200).json({
            amountOfClients: doc.amountOfClients
        })
    })
});

socketDataRouter.put("/inc/:roomId", (req, res) => {
    SocketData.findOne({roomId: req.params.roomId}, async (err, doc) => {
        if (err) res.status(400).send(`Could not query all the Router docs because of err: ${err}`)
        try {
            doc.amountOfClients += 1
            const data = await doc.save()
            res.status(200).send(data)
        } catch (err) {
            res.status(400).send(`Could not update socket param, because of err: ${err}`)
        }
    })
});

socketDataRouter.put("/dec/:roomId", (req, res) => {
    SocketData.findOne({roomId: req.params.roomId}, async (err, doc) => {
        if (err) res.status(400).send(`Could not query all the Router docs because of err: ${err}`)
        try {
            doc.amountOfClients -= 1
            const data = await doc.save()
            res.status(200).send(data)
        } catch (err) {
            res.status(400).send(`Could not update socket param, because of err: ${err}`)
        }
    })
});

socketDataRouter.delete("/all", (req, res) => {
    SocketData.deleteMany({}, (err) => {
        if (err) res.status(423).send(`DeleteAllSocketData failed with error: ${err}`)
        res.status(200).send('Sucessfully deleted all SocketData')
    })
});

export {socketDataRouter};