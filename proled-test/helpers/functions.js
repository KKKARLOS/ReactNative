const {games} = require("../helpers/variables");

//Cuando un jugador pulsa el boton jugar
exports.findGame = ((player) => {
    //Añadimos jugador a partida
    console.log('Entra en findGame '  + player);
    if (games.length === 0){
        games.push(player);    
        console.log(games);
        return 0;    
    }
    else if(games.length === 1){
        games.push(player);
        console.log(games);
        return 1;
    }
    else { 
        games.length = 0;
        games.push(player);    
        console.log(games);
        return 0;          
    }
})