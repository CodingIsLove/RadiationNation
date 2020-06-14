import rest from 'restler'

const getChatSocket = (io) => {
    const chat = io
        .of("/chat")
        .on('connection', (socket) => {
            const chatmsg = [];
            let roomId = null;

            socket.on('disconnect', async() => {
                console.log('User Disconnected');
                rest.put(`${process.env.BASE_URL}/api/socket_data/dec/${roomId}`)
                    .on('fail',(data,response)=>{
                        chat.in(roomId).emit('error', data)
                    })
                    .on('success',(data)=>{
                        console.log(`User left room. Remaining are: ${data.amountOfClients}`)
                        chat.in(roomId).emit('userUpdate', {amountOfClients: data.amountOfClients})
                    })
                    .on('error',(err)=>{
                        console.error(err)
                    })
            });

            socket.on('room', async(room) => {
                roomId = room
                socket.join(roomId, () => {
                    rest.put(`${process.env.BASE_URL}/api/socket_data/inc/${roomId}`)
                        .on('fail',(data,response)=>{
                            chat.in(roomId).emit('error',data)
                        })
                        .on('success',(data)=>{
                            console.log(`Succesfully joined room ${roomId}. Room has now ${data.amountOfClients} users`)
                            chat.in(roomId).emit('userUpdate', {amountOfClients: data.amountOfClients})
                        })
                        .on('error',(err)=>{
                            console.error(err)
                        })
                })
            });

            socket.on('sendMessage', (data) => {
                chatmsg.push({
                    message: data.message,
                    username: data.username,
                    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                });
                chat.in(roomId).emit('newMessage', chatmsg[chatmsg.length - 1]);
            });
        });
    return chat;
};

export {getChatSocket}
