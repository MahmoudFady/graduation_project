"use strict";

var socketio = require("socket.io");

module.exports = function (httpServer) {
  var io = socketio(httpServer, {
    cors: {
      origin: "http://localhost:4200"
    }
  });
  io.on("connection", function (socket) {
    //=> joining room
    socket.on("join", function (joinPath, cb) {
      socket.join(joinPath);
      cb(joinPath);
    });
    socket.on("onAddComment", function (_ref) {
      var newComment = _ref.newComment,
          joinPath = _ref.joinPath;
      socket.broadcast.to(joinPath).emit("onGetComment", {
        newComment: newComment,
        joinPath: joinPath
      });
    });
    socket.on("onAddPost", function (post) {
      socket.broadcast.to("allJobsRoom").emit("onGetPost", post);
    });
    socket.on("userOut", function (joinPath) {
      socket.leave(joinPath);
    });
    socket.on("onDeletePost", function (postId) {
      socket.broadcast.to("allJobsRoom").emit("onGetDeletedPostId", postId);
    });
    socket.on("disconnect", function () {
      io.emit("sendMessage", "user has been left !");
    });
  });
};