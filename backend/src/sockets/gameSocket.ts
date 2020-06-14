const rp = require('request-promise')

const getGameSocket = (io)=>{
    const game = io
        .of("/game")
        .on('connection', (socket) => {
            let roomId = null;

            socket.on('room', (room)=>{
                console.log('room function was called')
                roomId = room;
                socket.join(roomId);
                console.log('Room was joined')
                socket.emit('currentPlayerPosition',{
                    playerPosition:2
                })
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
