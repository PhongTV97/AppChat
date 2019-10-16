var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var countConnect = 0;
server.listen(process.env.PORT || 3000);
var lstusername = [];
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//client kết nối lên server
io.sockets.on('connection', function (socket) { // mở kết nối client và server
  countConnect++;
  console.log(countConnect + " Connect!");

  // server lắng nghe
  socket.on('client-send-message', function (data) {
    let date_ob = new Date();
    io.sockets.emit('server-send-message', { content: {username: socket.un, message: data.message, time: date_ob} });
  });


  //server lắng nghe 
  socket.on('client-register-username', function (data, callback) {
    if (lstusername.indexOf(data.username) == -1 && data.username) {
      lstusername.push(data.username);
      console.log('user added: ' + data.username);
      // name đường truyền
      socket.un = data.username;
      callback(true);
      //return for client
      socket.emit('server-send-lstusername', {
        lstuser: lstusername
      });

    } else {
      console.log('user existed: ' + data.username);
      callback(false);
    }
    //server send lstuser for
    io.sockets.emit('server-send-lstusername', {
      lstuser: lstusername
    });
  });


});


