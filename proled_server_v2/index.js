const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongodbRoute = "mongodb://localhost:27017/proled";
//const mongodbRoute = "mongodb+srv://proled:proled@cluster0-vkxzd.mongodb.net/PROLED?retryWrites=true&w=majority";
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const port = process.env.PORT || 3001;
const app = express();
const server = http.Server(app);
const io = socketIO(server, { pingTimeout: 30000 });
const router = require("./routes/routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});
app.use(router);

/*MONGODB*/
const options = {
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30,
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

mongoose.Promise = global.Promise;
mongoose.connect(mongodbRoute, options, (err) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`);
	}
	app.listen(port, () => {
		console.log(`Servidor Express corriendo en ${port}`);
	});
	console.log(`Conexión con Mongo correcta.`);
});
server.listen(3000, function () {
	console.log("Servidor WebSocket corriendo en http://localhost:3000");
});
//Creo 2 variables una para guardar todas las conexiones y otra para generar el numero de sala

connections = [];
roomNumber = 0;

// Tratamiento comprobar usuarios y si no existen darlos de alta
/*const functions = require("./helpers/functions");
const Player = require("./models/playerModel");

var winner = 1;
var bdWinner = winner == 1 ? "5ea14ce6e4184c430c58be5f" : "5ea14ce6e4184c430c58be5f"; //dataPlayer1.email, dataPlayer2.email
let email = "jc.perdiguerocarlos@gmail.com";

//Jugador1

Player.findOne({ email: email }, (err, player) => {
	if (err) console.log("Error al buscar el jugador");
	//si no existe el jugador deberíamos crearlo en base de datos
	if (!player) {
		console.log("No existe el jugador");
		//dataPlayer1
		var oGoogleData = {
			email: "jc.perdiguerocarlos@gmail.com",
			photo:
				"https://lh6.googleusercontent.com/-DwyDxQjisOo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJNINSekzvXcn06D5qGuZJ7sUny_cQ/s96-c/photo.jpg",
			name: "Karlos Perdiguero Otxoa",
			nickname: "kkarlos",
			_id_country: null,
			birthday: null,
			phone: null,
		};
		functions.createPlayer(oGoogleData);
	}
});

//Jugador2

email = "asierperdiurreta@gmail.com";

Player.findOne({ email: email }, (err, player) => {
	if (err) console.log("Error al buscar el jugador");
	//si no existe el jugador deberíamos crearlo en base de datos
	if (!player) {
		console.log("No existe el jugador");
		//dataPlayer2
		var oGoogleData = {
			email: "asierperdiurreta@gmail.com",
			photo:
				"https://lh5.googleusercontent.com/-HZi2Oz3GZpE/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJNoyza-20Fm3Li2KQtQv4omYcj_Kg/s96-c/photo.jpg",
			name: "Asier Perdiguero",
			nickname: "Asi",
			_id_country: null,
			birthday: null,
			phone: null,
		};
		functions.createPlayer(oGoogleData);
	}
});
*/
// Registrar la partida

//El servidor de websocket está escuchando a que se produzca una posible conexión

io.on("connection", (socket) => {
	//console.log(socket)

	console.log(`Usuario conectado en socket: ${socket.id}`);

	//Evento listener Desconexion
	socket.on("disconnect", (socket) => {
		console.log(`Usuario desconectado: ${socket.id}`);
		delete connections[socket.id];
		//connections = connections.filter(id => id !== socket.id)
	});

	//muestro todas las conexiones activas
	console.log(connections);
});
