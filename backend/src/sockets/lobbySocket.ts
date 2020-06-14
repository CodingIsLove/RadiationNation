const rp = require('request-promise')
import rest from 'restler'


const getLobbySocket = (io) => {
    const lobby = io
        .of("/lobby")
        .on('connection', (socket) => {
            socket.on('join', (data) => {
                rest.putJson(`${process.env.BASE_URL}/api/game/joinGameRoom/${data.roomId}`, data)
                    .on('fail', (failData, response) => {
                        lobby.emit('error', failData)
                    })
                    .on('success', (successData) => {
                        console.log(data.amountOfClients)
                        lobby.emit('updateLobby')
                    })
                    .on('error', (err) => {
                        console.error(err)
                    })
            });
            socket.on('leaveRoom', () => {
                lobby.emit('updateLobby')
            })
        });
};

export {getLobbySocket}
