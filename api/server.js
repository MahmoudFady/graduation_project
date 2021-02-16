const http = require("http");
const app = require("./backend/app");
const port = process.env.PORT || 3200;
const server = http.createServer(app);
const socketio = require("socket.io");

const io = socketio(server, { log: false, origins: "*:*" });
io.on("connection", (socket) => {
  socket.on("onSayHi", (msg) => {
    console.log(msg);
  });
});
server.listen(port, () => {
  console.log("server running on port number " + port);
});
