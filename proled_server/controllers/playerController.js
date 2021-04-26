//playerController.js
const Player = require("../models/playerModel");

exports.getAllPlayers = async (req, res) => {
	//console.log("Entra en getAllPlayers");
	await Player.find({}, (err, players) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!players) return res.status(404).send({ message: `No existen jugadores` });
		res.status(200).send({ players: players });
	});
};

exports.getPlayerById = async (req, res) => {
	let playerId = req.params.id;

	await Player.findOne({ _id: playerId }, (err, player) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!player) return res.status(404).send({ message: `No existe ese jugador` });
		res.send({ player: player });
	});
};

exports.getPlayerByEmail = async (req, res) => {
	let playerEmail = req.params.email;

	await Player.findOne({ email: playerEmail }, (err, player) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
		if (!player) return res.status(404).send({ message: `No existe ese email` });
		res.send({ player: player });
	});
};

exports.insertPlayer = async (req, res) => {
	//console.log(req.body)
	let player = new Player();
	Object.assign(player, oGoogleData);

	await player.save((err, playerStored) => {
		if (err) res.status(500).send({ message: `Error al guardar en base de datos ${err}` });
		res.status(200).send({ player: playerStored });
	});
};

exports.updatePlayer = async (req, res) => {
	let playerId = req.params.id;
	let update = req.body;

	await Player.findByIdAndUpdate(playerId, update, { new: true }, (err, playerUpdate) => {
		if (err) res.status(500).send({ message: `Error al actualizar en base de datos ${err}` });
		if (!playerUpdate) res.status(404).send({ message: `El jugador: ${playerId} no existe` });
		res.status(200).send({ player: playerUpdate });
	});
};

exports.deletePlayer = async (req, res) => {
	let playerId = req.params.id;

	await Player.findByIdAndRemove(playerId, (err, playerDelete) => {
		if (err) res.status(500).send({ message: `Error al borrar en base de datos ${err}` });
		if (!playerDelete) res.status(404).send({ message: `El jugador : ${playerId} no existe` });
		else res.status(200).send({ message: "El jugador ha sido eliminado" });
	});
};
