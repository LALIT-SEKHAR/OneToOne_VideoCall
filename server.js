require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const meetSheet = [];

io.on("connection", (socket) => {
  console.log("\x1b[43m\x1b[30m", " someone connected! ", "\x1b[0m");
  socket.on("join room", (roomId) => {
    if (meetSheet[roomId]) {
      meetSheet[roomId].push(socket.id);
    } else {
      meetSheet[roomId] = [socket.id];
    }
    console.log(meetSheet);
    const UserTwo = meetSheet[roomId].find((Id) => Id !== socket.id);
    if (UserTwo) {
      socket.emit("user-two", UserTwo);
      socket.to(UserTwo).emit("user joined", socket.id);
    }
  });
  socket.on("offer", (payload) => {
    console.log("resided Offer: ");
    socket.to(meetSheet[payload.target][0]).emit("offer", payload.offer);
  });
  socket.on("answer", (payload) => {
    console.log("resided answer: ");
    socket.to(meetSheet[payload.target][1]).emit("answer", payload.answer);
  });
  socket.on("ice_candidate", (payload) => {
    if (meetSheet[payload.target][1] === payload.caller) {
      socket.to(meetSheet[payload.target][0]).emit("ice_candidate", payload);
    } else {
      socket.to(meetSheet[payload.target][1]).emit("ice_candidate", payload);
    }
  });
});

const PORT = 8000 || process.env.PORT;
server.listen(PORT, () => {
  console.log("\x1b[37m\x1b[44m", ` Listening at ${PORT} `, "\x1b[0m");
});
