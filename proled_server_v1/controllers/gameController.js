//userController.js
const Game = require('../models/gameModel');

exports.getAllGames = async (req, res) => {
    console.log("Entra en getAllGames")
    await Game.find({}, (err, games) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        if(!games) return res.status(404).send({message: `No existen partidas`});
        res.status(200).send({games: games});
    });
};

exports.getGameById = async (req, res) => {
    let gameId = req.params.id;
    await Game.findOne({_id: gameId}, (err, game) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        if(!game) return res.status(404).send({message: `No existe esa partida`});
        res.send({game: game});
    });
};

exports.insertGame = async (req, res) => {
    //console.log(req.body)
    let game = new Game();
    game.idSala = req.body.idSala
    game.idJugador1 = req.body.idJugador1
    game.idJugador2 = req.body.idJugador2
    game.celda11 = req.body.celda11
    game.celda12 = req.body.celda12
    game.celda13 = req.body.celda13
    game.celda21 = req.body.celda21
    game.celda22 = req.body.celda22
    game.celda23 = req.body.celda23
    game.celda31 = req.body.celda31
    game.celda32 = req.body.celda32
    game.celda33 = req.body.celda33
    game.ultimo = req.body.ultimo
    await game.save((err,gameStored) => {
        if (err) res.status(500).send({message: `Error al guardar en base de datos ${err}`})
        res.status(200).send({product: gameStored})
    })
};

exports.updateGame = async (req, res) => {
    let gameId = req.params.id
    let update = req.body
    await Game.findByIdAndUpdate(gameId, update, {new:true}, (err, gameUpdate) => {
        if (err) res.status(500).send({message: `Error al actualizar en base de datos ${err}`})
        if (!gameUpdate) res.status(404).send({message: `La partida : ${gameId} no existe`})
        res.status(200).send({game: gameUpdate})
    })    
}

exports.deleteGame = async (req, res) => {
    let gameId = req.params.id
    await Game.findById(gameId, (err, game) => {
        if (err) res.status(500).send({message: `Error al borrar en base de datos ${err}`})
        if (!game) res.status(404).send({message: `La partida : ${gameId} no existe`})
            Game.remove( err => {
            if (err) res.status(500).send({message: `Error al borrar en base de datos ${err}`})
            else res.status(200).send({message: 'La partida ha sido eliminada'})
        })
    })
}