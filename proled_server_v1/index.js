const express = require('express');
const mongoose =  require ('mongoose')
const bodyParser= require ('body-parser')
const mongodbRoute = 'mongodb://localhost:27017/proled'
//const mongodbRoute = 'mongodb+srv://karlos:Asier2004@karloscluster-m8obw.mongodb.net/test?retryWrites=true&w=majority/proled'
const router = require ('./routes/routes')

const app = express();
const port = process.env.PORT || 3001;
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

const server = require('http').Server(app);
//const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(3000, function() {
	console.log('Servidor WebSocket corriendo en http://localhost:3000');
});

//El servidor de websocket está escuchando a que se produzca una posible conexión
peticiones = []
sala = 0
io.on('connection', function(socket) {
    //console.log(socket)
    console.log('Un cliente se ha conectado: ',socket.id);
    var message = [{
      author: "Carlos",
      text: "Sala asignada"
    }];
    socket.emit("conexionesActuales", peticiones); 
    //Evento Desconexion
    socket.on("disconnect", function(e, id) {
      console.log('Un cliente se ha desconectado: ',socket.id);
      delete peticiones[socket.id];
      //peticiones = peticiones.filter(id => id !== socket.id)
      io.emit("conexionesActuales", peticiones);
    });
    socket.on("assignRoomServer", (data) => {
      console.log('Petición de asignación de sala:  ',socket.id);
      console.log("Usuario: "+data.user);
    }); 
    //Evento asignarSala
    socket.on("asignarSala", (data) => {
        peticiones.unshift(socket.id) //voy metiendo al inicio del array
        /*
        while (peticiones.length>=2)
        {      
          //cojo los 2 primeros y monto la sala
          peticion1=peticiones[peticiones.length-1]
          peticion2=peticiones[peticiones.length-2]
          console.log(peticion1,peticion2)
          console.log("crearrrrrrrrrrr sala")
          //Creo una sala
          sala++
          socket.join ( 'Sala'+sala ); 
          io.to ( 'Sala'+sala ) .emit ( 'salaAsignada' , 'Sala'+sala);
          //Elimino los dos ultimos
          peticiones.pop()
          peticiones.pop()           
        }
        */
        console.log(peticiones)
        console.log("Sala asignada")
        socket.emit('confirmadaSala', peticiones);

        //io.sockets.emit('confirmadaSala', peticiones);   //Envío el mensaje a todos los usuarios inclusive al que ha mandado el evento
        //socket.broadcast.emit('confirmadaSala', data)    //Envía a todos excepto a quién ha lanzado el evento   
      });   
});