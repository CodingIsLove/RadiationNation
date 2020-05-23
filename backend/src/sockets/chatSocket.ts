
const getChatSocket = (io)=>{
    const chat = io
        .of("/chat")
        .on('connection', (socket) => {
            const chatmsg = [];
            console.log('----------- Connected to the Chat Socket----------------------')

            socket.on('disconnect', () => {
                console.log('User Disconnected');
            });
            socket.on('fuck', (data) => {
                console.log(data)
                socket.emit('hello', "Here you go")
            });
            socket.on('sendMessage', (data) => {
                chatmsg.push({
                    message: data.message,
                    username: data.username,
                    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                });
                console.log(chatmsg.length);
                console.log(`And the data is: ${data.message}`);
                io.emit('newMessage', chatmsg[chatmsg.length - 1]);
            });

            io.emit('welcome', "Hello Fucker")
        });
    return chat;
};

export {getChatSocket}
