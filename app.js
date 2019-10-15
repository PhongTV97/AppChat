var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//client kết nối lên server
io.sockets.on('connection', function (socket) { // mở kết nối client và server

  console.log("Co nguoi connect ne");

  // server lắng nghe
  socket.on('client-gui-username', function (data) {
    console.log('client vua dang ky ' + data);
  });
});