const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const gameController = require("../controllers/gameController");
const countryController = require("../controllers/countryController");

//Routes

//Colección player
router.get("/players", playerController.getAllPlayers);
router.get("/player/:id", playerController.getPlayerById);
router.get("/player/email/:email", playerController.getPlayerByEmail);
router.post("/player", playerController.insertPlayer);
router.put("/player/:id", playerController.updatePlayer);
router.delete("/player/:id", playerController.deletePlayer);

//Colección game
router.get("/games", gameController.getAllGames);
router.get("/game/:id", gameController.getGameById);
router.post("/game", gameController.insertGame);
router.put("/game/:id", gameController.updateGame);
router.delete("/game/:id", gameController.deleteGame);

//Colección country
router.get("/countries", countryController.getAllCountries);
router.get("/country/:id", countryController.getCountryById);
router.post("/country", countryController.insertCountry);
router.put("/country/:id", countryController.updateCountry);
router.delete("/country/:id", countryController.deleteCountry);

module.exports = router;
