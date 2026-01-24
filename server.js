const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let messages = []; // Store messages in memory

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages
  socket.emit('load messages', messages);

  // Listen for new messages
  socket.on('send message', (msg) => {
    messages.push(msg);  // Save message
    io.emit('new message', msg); // Broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve static files (your html, css, js)
app.use(express.static(__dirname));

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});