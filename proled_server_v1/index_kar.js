const mongoose =  require ('mongoose')
const bodyParser= require ('body-parser')
const mongodbRoute = 'mongodb://localhost:27017/proled'
//const mongodbRoute = 'mongodb+srv://karlos:Asier2004@karloscluster-m8obw.mongodb.net/test?retryWrites=true&w=majority/proled'
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3001;
const app = express();
const server = http.Server(app);
const io = socketIO(server, { pingTimeout: 30000 });
const router = require ('./routes/routes')


app.use (bodyParser.urlencoded({ extended: false}));
app.use (bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use(router);

/*MONGODB*/
const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,   
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute, options, (err) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    app.listen(port, () => {
		  console.log(`Servidor Express corriendo en ${port}`);
	  });
    console.log(`Conexión con Mongo correcta.`)
})

server.listen(3000, function() {
	console.log('Servidor WebSocket corriendo en http://localhost:3000');
});

//Creo 2 variables una para guardar todas las conexiones y otra para el numero de sala

connections = []
roomNumber = 0

//El servidor de websocket está escuchando a que se produzca una posible conexión

io.on('connection', (socket) => {
    //console.log(socket)
    console.log(`Usuario conectado en socket: ${socket.id}`);

    socket.emit('Connected', { user: socket.id });
    
    //Evento Desconexion
    socket.on('disconnect', () => {
      console.log(`Usuario desconectado: ${socket.id}`);
      delete peticiones[socket.id];
      //peticiones = peticiones.filter(id => id !== socket.id)
    });    
 
    //Evento añadir Usuario y asignar Sala
    socket.on("addUser", (username) => {
        connections.unshift(username) //voy metiendo al inicio del array cada conexión

 		    // store the username in the socket session for this client
        socket.username = username; 

        //Si es una conexión impar se crea una nueva sala
        
        resto = connections.length%2
        
        if (resto==1)
        {
          // Creo una sala
          roomNumber++
          // store the room name in the socket session for this client
          socket.room = 'room'+roomNumber;
        }
        //Añado el usuario a la sala correspondiente
        socket.join ( 'room'+roomNumber ); 

        //Si es numero 'par' entonces se completa la sala
        if (resto==0) coupleCompleted=true
        else coupleCompleted=false

        var parameters = {"roomNumber":roomNumber,  "coupleCompleted": coupleCompleted}
        
        //Notificación a todos los de la sala correspondiente incluido al que ha generado el evento
        io.in('roomNumber'+sala ).emit( 'respuestaAddUser' , parameters);

        console.log(connections)
        console.log('room'+roomNumber)
        //socket.emit('confirmadaSala', peticiones);

        //io.sockets.emit('confirmadaSala', peticiones);   //Envío el mensaje a todos los usuarios inclusive al que ha mandado el evento
        //socket.broadcast.emit('confirmadaSala', data)    //Envía a todos excepto a quién ha lanzado el evento   
      });   
});