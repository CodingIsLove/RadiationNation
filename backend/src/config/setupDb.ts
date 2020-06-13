import {GameRoom} from "../model/GameRoom";
import {gameRoomTemplates} from '../misc/roomTemplates'
import {User} from "../model/User";
import {mockData} from "../misc/mockData"
export const setupDb = ()=>{
    wipeDB()
    defaultSetupRooms()
};

export const wipeDB = ()=>{
    wipeGameRoom()
    wipeUser()
}

export const wipeUser = ()=>{
 if(User.count()){
       console.log("Delete all the users")
        User.deleteMany({}, (err) => {
            if (err) console.log(`Error is: ${err}`);
            console.log(`Sucessfully cleaned all Users`)
        })
    }
}

export const wipeGameRoom = ()=>{
 if (GameRoom.count()) {
        GameRoom.deleteMany({}, (err) => {
            if (err) console.log(`Error is: ${err}`);
            console.log(`Sucessfully cleaned all Gamerooms`)
        })
    }
}

export const defaultSetupRooms = ()=>{
    for (let i = 0; i < 5; i++) {
        const game = new GameRoom({
            player1: "freeSlot",
            player2: "freeSlot",
            roomId: i,
            map: gameRoomTemplates.maps.default_level
        });

        game.save((err, doc) => {
            if (err) {
                console.log(`Could not save GameRoom to MongoDb because of error: ${err}`);
            }
        })
    }
}
