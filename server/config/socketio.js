/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';

// When the user disconnects.. perform this
function onDisconnect(socket) {
  console.log('Disconnected!');
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
    console.log('A user has connected');
  });

  // Insert sockets below
  require('../api/chat/chat.socket').register(socket);
  require('../api/post/post.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);

}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    //     //Send Message
    // socket.on('send message', function(data){
    //   io.sockets.emit('new message', {msg: data});
    // });


    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
      console.log('Disconnected!');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
     console.log('A user has connected');
  });

}

// 'use strict';
// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// var users = [];
// var connections = [];

// server.listen(process.env.PORT || 9000);

// io.sockets.on('connection', function(socket){
//   connections.push(socket);
//   console.log('Connected: %s sockets connected', connections.length);

//   socket.on('disconnect', function(data){
//     connectons.splice(connections.indexOf(socket), 1);
//      console.log('Disconnected: %s sockets connected', connections.length);
//   });



// });