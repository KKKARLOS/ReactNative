const Player = require("../models/playerModel");
const Game = require("../models/gameModel");

function createPlayer(oGoogleData) {
	let player = new Player();
	Object.assign(player, oGoogleData);

	player.save((err, playerStored) => {
		if (err) console.log(`Error al guardar en base de datos ${err}`);
		console.log(playerStored);
	});
}

exports.insertWithCheckPlayerInDb = (email, photo, name) => {
	Player.findOne({ email: email }, (err, player) => {
		if (err) console.log("Error al buscar el jugador");
		//si no existe el jugador deberíamos crearlo en base de datos
		if (!player) {
			console.log("No existe el jugador. Crear Jugador");
			//dataPlayer1
			var oGoogleData = {
				email: email,
				photo: photo,
				name: name,
				nickname: null,
				country: null,
				birthday: null,
				phone: null,
			};
			createPlayer(oGoogleData);
		}
	});
};

exports.insertGame = (oGame, winner) => {
	let game = new Game();

	game.dateTimeStart = oGame.id;
	game.dateTimeEnd = Date.now();
	game.winner = winner == 1 ? oGame.dataPlayer1.email : oGame.dataPlayer2.email;
	game.player1 = oGame.dataPlayer1.email;
	game.player2 = oGame.dataPlayer2.email;

	//no me interesa guardar el socket Id
	var cellArray = oGame.cellArray.map(function (cell, index, array) {
		return { id: cell.id, image: cell.image };
	});
	game.cellArray = cellArray;

	game.save((err, gameStored) => {
		if (err) console.log(`Error al guardar en base de datos ${err}`);
		console.log(gameStored);
	});
};
