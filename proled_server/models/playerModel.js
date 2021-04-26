//playerModel.js

// Cargamos el módulo de mongoose
const mongoose = require("mongoose");

// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
const PlayerSchema = Schema({
	email: String,
	photo: String,
	name: String,
	nickname: { type: String, default: null },
	country: { type: String, default: null },
	birthday: { type: Date, default: null },
	phone: { type: Number, default: null },
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model("Player", PlayerSchema);
