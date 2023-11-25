const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// Use path.join to create an absolute path to the 'notes' directory
app.use(express.static(__dirname));


io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('draw', (data) => {
        io.emit('draw', data);
    });

    socket.on('clear', () => {
        io.emit('clear');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
