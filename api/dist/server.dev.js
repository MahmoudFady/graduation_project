"use strict";

var http = require("http");

var app = require("./backend/app");

var port = process.env.PORT || 3200;
var server = http.createServer(app);

var socketio = require("socket.io");

var io = socketio(server, {
  log: false,
  origins: "*:*"
});
io.on("connection", function (socket) {
  socket.on("onSayHi", function (msg) {
    console.log(msg);
  });
});
server.listen(port, function () {
  console.log("server running on port number " + port);
});