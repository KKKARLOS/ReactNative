//gameModel.js

// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
const GameSchema = Schema({
   idSala: String,
   idJugador1: String,
   idJugador2: String,
   celda11: String,
   celda12: String,
   celda13: String,
   celda21: String,
   celda22: String,
   celda23: String,
   celda31: String,
   celda32: String,
   celda33: String,   
   ultimo: String
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Game', GameSchema);