import {GameRoom} from "../model/GameRoom";
import {gameRoomTemplates} from '../misc/roomTemplates'
import {User} from "../model/User";

const setupDb = () => {
    if (GameRoom.count()) {
        console.log("Reset all Gamerooms");
        GameRoom.deleteMany({}, (err) => {
            if (err) console.log(`Error is: ${err}`);
            console.log(`Sucessfully cleaned all Gamerooms`)
        })
    }

    if(User.count()){
       console.log("Delete all the users")
        User.deleteMany({}, (err) => {
            if (err) console.log(`Error is: ${err}`);
            console.log(`Sucessfully cleaned all Users`)
        })
    }

    for (let i = 0; i < 5; i++) {
        const game = new GameRoom({
            player1: "free Game Slot",
            player2: "free Game Slot",
            roomId: i,
            map: gameRoomTemplates.default_level
        });

        game.save((err, doc) => {
            if (err) {
                console.log(`Could not save GameRoom to MongoDb because of error: ${err}`);
            }
        })
    }
};

module.exports = setupDb();
