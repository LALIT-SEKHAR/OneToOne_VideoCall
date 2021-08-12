const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("\x1b[43m\x1b[30m", " someone connected! ", "\x1b[0m");
  socket.on("join room", (roomId) => {
    console.log(roomId);
  });
});

const PORT = 8000 || process.env.PORT;
server.listen(PORT, () => {
  console.log("\x1b[37m\x1b[44m", ` Listening at ${PORT} `, "\x1b[0m");
});
