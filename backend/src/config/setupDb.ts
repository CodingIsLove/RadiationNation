import {GameRoom} from "../model/GameRoom";

const setupDb = ()=>{
    if(GameRoom.count()){
        console.log("Lets first wipe this dirty dirty database");
        GameRoom.deleteMany({},(err)=>{
            if(err) console.log(`Error is: ${err}`);
            console.log(`Sucessfully deleted all Entries`)
        })
    }
    for(let i=0; i<10; i++){
        const game = new GameRoom({
            player1: "free Game Slot",
            player2: "free Game Slot",
            roomId:i,
            map:null
        });

        game.save((err,doc)=>{
            if(err){
                console.log(`Could not save GameRoom to MongoDb because of error: ${err}`);
            }
            console.log("Saved new room to MongoDb")
        })
    }
};

module.exports = setupDb();
