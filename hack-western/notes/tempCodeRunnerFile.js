const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('draw', (data) => {
        io.emit('draw', data);
    });

    socket.on('clear', () => {
        io.emit('clear');
    });

    socket.on('disconnect', () =>{
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000; //host 3000
server.listen(PORT, () => {
    console.log('Server is listening on port $(PORT)');
});
