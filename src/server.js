import http from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);

const wsServer = new Server(httpServer);
wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => {
    console.log(`Socket event:${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname);
    });
  });
  socket.on("new_message", (msg, room, addMessage) => {
    socket.to(room).emit("new_message", `${socket.nickname}:${msg}`);
    addMessage();
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});
// function onSocketClose() {
//   console.log("Disconnected from the browser!");
// }

/* const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}:${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
}); */
httpServer.listen(3000, handleListen);
