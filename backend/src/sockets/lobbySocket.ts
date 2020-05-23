import rp from 'request-promise';

const getLobbySocket = (io) => {
    const lobby = io
        .of("/lobby")
        .on('connection', (socket) => {
            console.log('----------- Connected to the LobbySocket ----------------------')
            socket.on('join', (updatedMap) => {

                // Write the new Map Data into the MongoDb
                rp({
                    method: 'POST',
                    uri: 'http://localhost:8081/api/joinRoom',
                    body: {
                        map: updatedMap,
                        player1: "ChristofMongitus",
                        player2: "BeniDoofus",
                        socketId: "2ssi3lksdf"
                    },
                    json: true
                })
                    .then((data) => {
                        console.log(data)
                        io.of('/lobby').emit('lobbyUpdate') // todo: later
                    }).catch((err) => {
                        console.error(err);
                        io.of('/lobby').emit('lobbyUpdate')
                });
            });
            socket.on('leaveRoom',()=>{
                io.of('/game').emit('roomLeft')
            })
        });
};

export {getLobbySocket}
