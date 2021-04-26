//gameController.js
const Game = require("../models/gameModel");

exports.getAllGames = async (req, res) => {
	//console.log("Entra en getAllGames");
	await Game.find({}, (err, games) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!games) return res.status(404).send({ message: `No existen partidas` });
		res.status(200).send({ games: games });
	});
};

exports.getGameById = async (req, res) => {
	let gameId = req.params.id;

	await Game.findOne({ _id: gameId }, (err, game) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!game) return res.status(404).send({ message: `No existe esa partida` });
		res.send({ game: game });
	});
};

exports.insertGame = async (req, res) => {
	//console.log(req.body)
	let game = new Game();

	game.dateTimeStart = req.body.dateTimeStart ? req.body.dateTimeStart : Date.now();
	game.dateTimeEnd = req.body.dateTimeEnd ? req.body.dateTimeStart : Date.now();
	game.winner = req.body.winner;
	game.player1 = req.body.player1;
	game.player2 = req.body.player2;
	game.cellArray = req.body.cellArray;

	await game.save((err, gameStored) => {
		if (err) res.status(500).send({ message: `Error al guardar en base de datos ${err}` });
		res.status(200).send({ game: gameStored });
	});
};

exports.updateGame = async (req, res) => {
	let gameId = req.params.id;
	let update = req.body;

	await Game.findByIdAndUpdate(gameId, update, { new: true }, (err, gameUpdate) => {
		if (err) res.status(500).send({ message: `Error al actualizar en base de datos ${err}` });
		if (!gameUpdate) res.status(404).send({ message: `La partida : ${gameId} no existe` });
		res.status(200).send({ game: gameUpdate });
	});
};

exports.deleteGame = async (req, res) => {
	let gameId = req.params.id;

	await Game.findByIdAndRemove(gameId, (err, gameDelete) => {
		if (err) res.status(500).send({ message: `Error al borrar en base de datos ${err}` });
		if (!gameDelete) res.status(404).send({ message: `La partida : ${gameId} no existe` });
		else res.status(200).send({ message: "La partida ha sido eliminada" });
	});
};
