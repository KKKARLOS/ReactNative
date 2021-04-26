
const express = require ('express')
const router = express.Router();
const gameController = require('../controllers/gameController');

//Routes
router.get('/games', gameController.getAllGames);
router.get('/game/:id', gameController.getGameById);
router.post("/game",gameController.insertGame)
router.put("/game/:id",gameController.updateGame)
router.delete("/game/:id",gameController.deleteGame)

module.exports = router;