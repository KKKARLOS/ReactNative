let { games, gameObj, roomId } = require("../helpers/variables");

function createGame(games, player) {
  console.log("Nuevo");
  games.push({
    id: Date.now(),
    roomId: roomId,
    player1: player,
    player2: null,
    cellArray: []
  });
  console.log(games);
}

//Cuando un jugador pulsa el boton jugar
exports.findGame = (games, player) => {
  //Añadimos jugador a partida
  if (games.length === 0) {
    createGame(games, player);
  } else if (games[games.length - 1].player2 === null) {
    console.log("actualizar");
    games[games.length - 1].player2 = player;
    console.log(games);
    return 1;
  } else {
    createGame(games, player);
  }
};

// Obtener el ganador de la partida

exports.getWinner = cellArrayGame => {
  /*
    - Se devuelven los siguientes valores:  
    
    0 - De momento no hay ganador
    1 - Ganador jugador 1 
    2 - Ganador jugador 2
  
  Con menos de 5 movimientos no puede haber ganador
  */
  if (cellArrayGame.length < 5) return 0;

  //Obtener la información y preparar para su tratamiento
  //Inicializo array "1D"
  var aGame = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  //Bucle para actualizar array "1D"  de enteros dando contenido en las posiciones reales en base
  //a la información almacenada en el array de objetos

  cellArrayGame.map(item => (aGame[item.id] = item.image));

  //Inicializo array "2D"
  var gameState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  //Bucle para actualizar array "2D" de enteros bidimensional  utilizando 1D array

  for (var i = 0; i < aGame.length; i++) {
    j = i;
    if (i >= 0 && i <= 2)
      gameState[0][i] = aGame[i] == 2 ? -1 : aGame[i] == 1 ? 1 : 0;
    if (i >= 3 && i <= 5)
      gameState[1][j - 3] = aGame[i] == 2 ? -1 : aGame[i] == 1 ? 1 : 0;
    if (i >= 6 && i <= 8)
      gameState[2][j - 6] = aGame[i] == 2 ? -1 : aGame[i] == 1 ? 1 : 0;
  }
  /*
    - Comienzo validación teniendo la información en una matriz "2D"
    - Si en una iteración sea de filas, columnas, diagonal se cumple el 3 en raya  se devuelve 
    el valor correspondiente y salimos de la función.
    */
  var sum = 0;
  //Comprobar filas
  for (var i = 0; i < 3; i++) {
    sum = gameState[i][0] + gameState[i][1] + gameState[i][2];
    if (sum == 3) return 1;
    else if (sum == -3) return 2;
  }
  //Comprobar columnas
  sum = 0;
  for (var i = 0; i < 3; i++) {
    sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
    if (sum == 3) return 1;
    else if (sum == -3) return 2;
  }
  //Comprobar diagonales
  sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
  if (sum == 3) return 1;
  else if (sum == -3) return 2;

  sum = gameState[0][2] + gameState[1][1] + gameState[2][0];
  if (sum == 3) return 1;
  else if (sum == -3) return 2;

  //No hay ganador
  return 0;
};

// Comprobar el estado de la partida
exports.checkGameOver = (winner, cellArrayGame) => {
  //Hay ganador
  if (winner == 1 || winner == 2) return true;
  //Empate (no hay ganador)
  else if (winner == 0 && cellArrayGame.length == 9) return true;
  else return false;
};

//Devolvemos en qué partida(objeto game) está ese jugador
//en caso de estar en varias cogemos el primero
exports.findPlayerGame = (games, socketId) => {
  if (games.length === 0) return false;
  //return games.find(o => o.player1 === socketId || o.player2 == socketId);

  var results = games.filter(
    o => o.player1 === socketId || o.player2 === socketId
  );
  var firstObj = results.length > 0 ? results[0] : null;
  return firstObj;
};

/* Añadir la celda pulsada al array de celdas de esa partida y devolver el array de celdas 
    actualizado para su validación*/
exports.addCellPushedToArrayGame = (id, oGame, socketId) => {
  if (oGame == null) return false;
  if (oGame.cellArray.length == 0) oCell = { id: id, image: 1 };
  else {
    oCell = {
      id: id,
      image: oGame.cellArray[oGame.cellArray.length - 1].image == 1 ? 2 : 1,
      socketId: socketId
    };
  }
  oGame.cellArray.push(oCell);
  return oGame.cellArray;
};

//Devolver array sin las partidas en las que esturviera ese jugador
exports.removeGameFromArray = (games, socketId) => {
  return games.filter(o => o.player1 !== socketId && o.player2 !== socketId);
};

//Controlarr que un jugador no pulse en su turno más de una celda
exports.checkSeveralCellsPushed = (oGame, socketId) => {
  if (oGame == null || oGame.cellArray.length == 0) return false;
  return oGame.cellArray[oGame.cellArray.length - 1].socketId === socketId
    ? true
    : false;
};
