const socketio = require("socket.io");
module.exports = (httpServer) => {
  const io = socketio(httpServer, {
    cors: {
      origin: "http://localhost:4200",
    },
  });
  io.on("connection", (socket) => {
    //=> joining room
    socket.on("join", (joinPath, cb) => {
      socket.join(joinPath);
      cb(joinPath);
    });
    socket.on("onAddComment", ({ newComment, joinPath }) => {
      socket.broadcast
        .to(joinPath)
        .emit("onGetComment", { newComment, joinPath });
    });
    socket.on("onAddPost", (post) => {
      socket.broadcast.to("allJobsRoom").emit("onGetPost", post);
    });
    socket.on("userOut", (joinPath) => {
      socket.leave(joinPath);
    });
    socket.on("onDeletePost", (postId) => {
      socket.broadcast.to("allJobsRoom").emit("onGetDeletedPostId", postId);
    });
    socket.on("disconnect", () => {
      io.emit("sendMessage", "user has been left !");
    });
  });
};
