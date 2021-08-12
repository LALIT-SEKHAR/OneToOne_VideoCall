const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').createServer();
const io = socketio(app())



app.listen(8000)