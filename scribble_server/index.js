// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your client URL
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client URL
  methods: ['GET', 'POST']
}));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });
  
  socket.on('canvas-data', (data) => {
    console.log(data)
    const { room, drawingData } = data;
    // Emit the canvas data to other users in the same room
    socket.to(room).emit('canvas-data', drawingData);
  });

  socket.on('keys', (data) => {
    console.log(data)
    const { room, keys } = data;
    // Emit the canvas data to other users in the same room
    socket.to(room).emit('keys', keys);
  });
  socket.on('message', (message) => {
    console.log('Message received:', message);
    io.to('myRoom').emit('message', message); // Emit to a specific room
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
