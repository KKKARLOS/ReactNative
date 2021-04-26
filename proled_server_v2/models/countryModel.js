//countryModel.js

// Cargamos el módulo de mongoose
const mongoose = require("mongoose");

// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
const CountrySchema = Schema({
	name: String,
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model("Country", CountrySchema);
