//heroku login
//heroku logs --app crudservericm --tail
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongodbRoute = "mongodb+srv://test:test@cluster0-aohb7.mongodb.net/lanbide?retryWrites=true&w=majority";
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { pingTimeout: 30000 });
const router = require("./routes/routes");
const functions = require("./helpers/functions");
let { games, roomId } = require("./helpers/variables");

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
	useNewUrlParser: true, //,
	//useUnifiedTopology: true
};
mongoose.Promise = global.Promise;
mongoose.connect(mongodbRoute, options, (err) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`);
	}
	server.listen(port, () => {
		console.log(`Servidor up en ${port}`);
	});
	console.log(`Conexión con Mongo correcta.`);
});

roomId = 1;
io.on("connection", (socket) => {
	console.log(`Usuario conectado en socket: ${socket.id}`);

	//Todos los clientes conectados al namespace por defecto (‘/‘):

	io.clients((error, clients) => {
		if (error) throw error;
		console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
	});

	//Cuando un jugador pulsa el boton jugar

	/* Lado cliente:socket.emit('joingame', {socketId: socket.id, googleUserData: data});
	
	socket.on("joingame", (data) => {
	var player = data.socketId;

	*/

	socket.on("joingame", (player) => {
		///Busco antes de unir el jugador a la partida si tuviera otra/s partida/s sin borrar. Solo puede tener una partida activa
		//Ej. Salir del juego y volver entrar antes de que salte el evento de desconexión
		console.log(`joingame: ${player} `);
		oGame = functions.findPlayerGame(games, player);
		if (oGame) {
			games = functions.removeGameFromArray(games, player);
			console.log("Después  del borrado (joingame)");
			console.log(JSON.stringify(games));
		}

		//Incremento el número  de sala si ya hay 2 jugadores en la sala.
		if (io.nsps["/"].adapter.rooms["room-" + roomId] && io.nsps["/"].adapter.rooms["room-" + roomId].length == 2)
			roomId++;

		socket.join("room-" + roomId);
		console.log(`Usuario: ${player}`);
		console.log(`Sala: ${roomId}`);

		//Al crear la partida indicamos ya el número de sala

		//let match = functions.findGame(games, player, roomId,data.googleUserData);
		let match = functions.findGame(games, player, roomId);

		if (match === 1) {
			oGame = functions.findPlayerGame(games, player);
			console.log("Partida a jugar");
			console.log(oGame);
			oInitialLoad = { socketId: oGame.player1, roomId: roomId };
			//io.emit("gotoboard", oTurnPlayer);
			//Al empezar la partida indicamos quién tiene el turno de la partida y número de sala
			io.in("room-" + roomId).emit("gotoboard", oInitialLoad);
		}
		//Obtener Salas
		var openRooms = findRooms();
		console.log(openRooms);
	});

	function findRooms() {
		var openRooms = [];
		console.log("Salas activas");
		var rooms = io.sockets.adapter.rooms;
		//console.log(rooms);
		if (rooms) {
			for (var room in rooms) {
				if (!rooms[room].hasOwnProperty(room)) {
					openRooms.push(room);
				}
			}
		}
		return openRooms;
	}
	//Eliminar la sala si finaliza la partida o un jugador la abandona
	socket.on("deleteRoom", (data) => {
		console.log(`Proceso de borrado de sala:  ${data.roomId}`);

		io.of("/")
			.in("room-" + data.roomId)
			.clients((error, socketIds) => {
				if (error) throw error;
				socketIds.forEach((socketId) => io.sockets.sockets[socketId].leave("room-" + data.roomId));
			});

		//Obtener Salas
		var openRooms = findRooms();
		console.log(openRooms);
	});

	//Indica la celda pulsada por un jugador a todos
	socket.on("cellpushed", (data) => {
		var id = data.id;
		var roomId = data.roomId;
		//Obtengo el objeto Game de ese jugador a través del socket id
		oGame = functions.findPlayerGame(games, socket.id);
		console.log("Objeto partida actual: ");
		console.log(oGame);

		//Comprobamos que un mismo socket  no envíe varias celdas a la vez
		if (!functions.checkSeveralCellsPushed(oGame, socket.id)) {
			/* Añadir la celda pulsada al array de celdas de esa partida y devolver el array de celdas 
          	actualizado para su validación*/

			cellArrayGame = functions.addCellPushedToArrayGame(id, oGame, socket.id);
			console.log("Objeto partida actualizado: ");
			console.log(oGame);

			if (cellArrayGame) oGame.cellArray = cellArrayGame;

			console.log("Array de partidas");
			console.log(JSON.stringify(games));

			//Obtener ganador de la partida
			winner = functions.getWinner(cellArrayGame);
			/*
			Parámetro de entrada: Objeto arrayCell del objeto partida correspondiente 
			Parámetro de salida:  Se devuelven los siguientes valores posibles:  

			0 - De momento no hay ganador
			1 - Ganador jugador 1 
			2 - Ganador jugador 2

			Añado el atributo winner al objeto que se devuelve al cliente
			*/
			gameOver = functions.checkGameOver(winner, cellArrayGame);
			/*
			Parámetros de entrada: Variable winner y el objeto cellArrayGame
			Parámetro de salida:  Se devuelven los siguientes valores posibles:  

			True --> Partida finalizada
			False --> Partida  no finalizada
			*/
			oPrintCell = {
				id: oGame.cellArray[oGame.cellArray.length - 1].id,
				image: oGame.cellArray[oGame.cellArray.length - 1].image,
				playerTurn: oGame.cellArray[oGame.cellArray.length - 1].image == 1 ? oGame.player2 : oGame.player1,
			};

			//io.emit("printcell", oPrintCell);
			io.in("room-" + roomId).emit("printcell", oPrintCell);
			console.log(oPrintCell);

			if (gameOver) {
				let oWinner = winner == 1 ? oGame.player1 : winner == 2 ? oGame.player2 : null;

				oGameOver = { winner: oWinner };

				//io.emit("gameOver", oGameOver);
				io.in("room-" + roomId).emit("gameOver", oGameOver);
			}
		}
	});

	socket.on("gotomain", () => {
		//io.emit("gotomain");
		io.in("room-" + roomId).emit("gotomain");
	});
	socket.on("disconnect", () => {
		console.log(`Usuario desconectado: ${socket.id}`);
		//console.log("Antes del borrado");
		//console.log(games);
		games = functions.removeGameFromArray(games, socket.id);
		console.log("Después  del borrado (desconexión)");
		console.log(JSON.stringify(games));
		//Salas
		var openRooms = findRooms();
		console.log(openRooms);
	});
});
