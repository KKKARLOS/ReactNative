//heroku login
//heroku logs --app crudservericm --tail
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongodbRoute = 'mongodb+srv://test:test@cluster0-aohb7.mongodb.net/lanbide?retryWrites=true&w=majority'
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { pingTimeout: 30000 });
const router = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(router);

/*MONGODB*/
const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  useNewUrlParser: true//,
  //useUnifiedTopology: true
};
mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute, options, (err) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  server.listen(port, () => {
    console.log(`Servidor up en ${port}`);
  });
  console.log(`Conexión con Mongo correcta.`)
})

io.on('connection', (socket) => {
  console.log(`Usuario conectado en socket: ${socket.id}`);
  /*
  socket.emit('Connected', { user: socket.id });



  socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = 'room1';
		// add the client's username to the global list
		//usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		//socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		//socket.emit('updaterooms', rooms, 'room1');
    //Mensaje a los de la sala excepto a mi mismo
    socket.to('room1').emit('notice', "otro jugador se ha conectado a tu sala");
    //enviando el mensaje a todos los de la sala, incluido a mi mismo
    io.in('room1').emit('todos', 'PARTICIPANTES DE SALA room1');
  });
  */

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});