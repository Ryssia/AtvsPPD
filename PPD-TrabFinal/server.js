const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const jsonrpc = require("json-rpc-ws");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Criação do servidor JSON-RPC
const rpcServer = jsonrpc.createServer();

rpcServer.addMethod("multiply", (params, callback) => {
  if (params.length !== 2) {
    return callback(jsonrpc.error(-32602, "Invalid params"));
  }

  const result = params[0] * params[1];
  callback(null, result);
});

// Evento de conexão WebSocket para RPC
rpcServer.attachTo(server);

io.on("connection", (socket) => {
  console.log("Conexão detectada");

  socket.on("join-request", (username, room) => {
    if (!rooms[room]) {
      rooms[room] = [];
    }

    socket.username = username;
    socket.room = room;
    socket.join(room);
    rooms[room].push(username);

    io.to(room).emit("user-ok", rooms[room], room);
    socket.to(room).broadcast.emit("list-update", {
      joined: username,
      list: rooms[room],
    });
  });

  socket.on("disconnect", () => {
    let room = socket.room;
    if (rooms[room]) {
      rooms[room] = rooms[room].filter((u) => u !== socket.username);
      socket.to(room).broadcast.emit("list-update", {
        left: socket.username,
        list: rooms[room],
      });
    }
  });

  socket.on("send-msg", (txt) => {
    let obj = {
      username: socket.username,
      message: txt,
    };

    // Emite a mensagem apenas para os usuários na mesma sala
    io.to(socket.room).emit("show-msg", obj);
  });
});

server.listen(3000);
app.use(express.static(path.join(__dirname, "public")));
let connectedUsers = [];
let rooms = [];
