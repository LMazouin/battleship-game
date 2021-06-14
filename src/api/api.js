import openSocket from "socket.io-client";

const socket = openSocket("http://lmazouin:8000");

const startTimer = (initialTime) => {
  console.log("START TIMER");
  socket.emit("startTimer", initialTime);
};

const updateTimer = (cb) => {
  console.log("UPDATE TIMER");
  socket.on("timer", (seconds) => cb(null, seconds));
};

const stopTimer = (time) => {
  console.log("STOP TIMER");
  socket.emit("stopTimer", time);
};

const connect = () => {
  socket.connect();
};

const disconnect = () => {
  socket.disconnect();
};

const broadcast = (cb) => {
  socket.on("broadcast", (data) => {
    cb(null, data.users);
  });
};

const sendWelcomeMessage = (cb) => {
  socket.on("newUser", (data) => cb(null, data.message));
};

const sendMap = (map) => {
  socket.emit("getMap", map);
};

const getMap = (cb) => {
  socket.on("sendMap", (data) => cb(null, data.map));
};

const setPlayer = (username) => {
  socket.emit("setPlayer", username);
};

export { connect, disconnect, startTimer, updateTimer, stopTimer };
export { broadcast, sendWelcomeMessage };
export { setPlayer, sendMap, getMap };
