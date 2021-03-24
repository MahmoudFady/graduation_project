const socketio = require("socket.io");
module.exports = (httpServer) => {
  const io = socketio(httpServer, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("socket connected.");
  });
};
