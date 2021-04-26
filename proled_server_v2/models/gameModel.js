//gameModel.js

// Cargamos el módulo de mongoose
const mongoose = require("mongoose");

// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
const GameSchema = Schema({
	dateTimeStart: { type: Date, default: Date.now },
	dateTimeEnd: { type: Date, default: Date.now },
	winner: String,
	player1: String,
	player2: String,
	cellArray: { type: Array, default: [] },
	//cellArray: [{ id: null, image: null }],
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model("Game", GameSchema);
