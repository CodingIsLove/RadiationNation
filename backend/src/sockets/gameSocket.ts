import rp from 'request-promise';

const getGameSocket = (io)=>{
    const game = io
        .of("/game")
        .on('connection', (socket) => {
            console.log('----------- Connected to the Game Socket ----------------------')
            let roomId = null;

            socket.on('room', (room)=>{
                console.log(`You just entered the GameSocket number: ${room}`)
                roomId = room;

                // join room and initialize Map from mongodb
                socket.join(roomId);
                // todo: implement this request, that i can use it here
            })
            socket.on('updateGameState', (updatedMap) => {
                console.log(updatedMap);
                // update the Map for all participants
                socket.in(roomId).emit('newMap', updatedMap)

                // Write the new Map Data into the MongoDb
                rp({
                    method:'POST',
                    uri: 'http://localhost:8081/api/game/updateGameState',
                    body:{
                        map: updatedMap,
                        player1: "ChristofMongitus",
                        player2: "BeniDoofus",
                        socketId: "2ssi3lksdf"
                    },
                    json:true
                })
                    .then((data)=>{
                        console.log('Map data could be read out here')
                    }).catch((err)=>{
                    console.error(err)
                });
            })
        });
}

export {getGameSocket}
