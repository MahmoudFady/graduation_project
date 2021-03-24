"use strict";

var socketio = require("socket.io");

module.exports = function (httpServer) {
  var io = socketio(httpServer, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  });
  io.on("connection", function (socket) {
    console.log("socket connected.");
  });
};