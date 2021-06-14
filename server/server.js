const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: true,
  origins: ["http://lmazouin:8000"],
});
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://lmazouin:8000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

const host = "lmazouin";
const port = 8000;

let interval;
let count = 0;

const players = [];

io.on("connection", (client) => {
  console.log("CLIENT CONNECTED TO THE SERVER");
  count++;
  io.sockets.emit("broadcast", { users: count });

  client.on("setPlayer", (username) => {
    players.push({
      id: client.id,
      name: username,
    });
    client.emit("newUser", {
      message: `Hello, you are player No. ${count} and username ${username} and id ${client.id}`,
    });
  });

  if (interval) {
    clearInterval(interval);
  }

  client.on("startTimer", (initialTime) => {
    console.log(`CLIENT STARTED TIMER WITH INITIAL TIME ${initialTime}`);
    interval = setInterval(() => {
      client.emit("timer", initialTime++);
      console.log(initialTime);
    }, 1000);
  });
  client.on("stopTimer", (time) => {
    console.log(`CLIENT STOPPED THE TIMER AT TIME ${time}`);
    clearInterval(interval);
  });

  client.on("getMap", (map) => {
    console.log("SENDING DATA BACK TO THE OTHER PLAYER");
    client.broadcast.emit("sendMap", { map: map });
  });

  client.on("disconnect", () => {
    console.log("CLIENT DISCONNECTED FROM THE SERVER");
    count--;
    io.sockets.emit("broadcast", { users: count });
    clearInterval(interval);
  });
});

// io.listen(port);
server.listen(port, host, () => {
  console.log(`LISTENING TO PORT ${port}...`);
});
