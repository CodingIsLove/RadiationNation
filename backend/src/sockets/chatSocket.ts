const getChatSocket = (io) => {
    const chat = io
        .of("/chat")
        .on('connection', (socket) => {
            const chatmsg = [];
            let roomId = null;
            socket.on('disconnect', () => {
                console.log('User Disconnected');
                socket.in(roomId).emit('userUpdate',2) // todo: should be amount of connected users... tis number is just temporarily
            });
            socket.on('room', (room) => {
                console.log(`You joined the room: ${room}`)
                roomId = room
                socket.join(room)
                socket.in(roomId).emit('userUpdate',socket.client.conn.server.clientsCount)
            });
            socket.on('sendMessage', (data) => {
                chatmsg.push({
                    message: data.message,
                    username: data.username,
                    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                });
                console.log(chatmsg.length);
                console.log(`And the data is: ${data.message}`);
                socket.in(roomId).emit('newMessage', chatmsg[chatmsg.length - 1]);
            });
        });
    return chat;
};

export {getChatSocket}
