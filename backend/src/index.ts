var app = require('express')();
var io =  require('socket.io')(server);
var server = require('http').createServer(app);

app.get('/', function(req, res){
    res.sendFile()
});

var app = require('express')();
io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(3000, function(){
    console.log('listening on *:3000');
});
