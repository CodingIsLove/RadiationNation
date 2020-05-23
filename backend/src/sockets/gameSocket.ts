import rp from 'request-promise';

const getGameSocket = (io)=>{
    const game = io
        .of("/game")
        .on('connection', (socket) => {
            console.log('----------- Connected to the Game Socket ----------------------')

            // Load the map from the mongodb
            // todo: implement here the basic implementation of the map io.emit('initMap', GameState.find({socketId}));

            socket.on('updateGameState', (updatedMap) => {
                console.log(updatedMap);
                // update the Map for all participants
                io.of('/game').emit('newMap', updatedMap)

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
                        console.log(data)
                    }).catch((err)=>{
                    console.error(err)
                });
            })
        });
}

export {getGameSocket}
