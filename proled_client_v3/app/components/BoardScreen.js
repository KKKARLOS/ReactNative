import React, {useEffect, useState, useContext} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

//import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import openSocket from 'socket.io-client';
import AppContext from './Context';
import {SERVER_DEPLOY} from '../modules/Constants';

function BoardScreen(props) {
  const [context, dispatch] = useContext(AppContext);
  useEffect(() => {
    //alert('Soy el jugador nro: ' + context.jugador);
    
    //const socket = openSocket('http://192.168.0.16:3000')
    // const socket = openSocket(SERVER_DEPLOY)
    //socket.emit('addUser', parameters)
    /*
    socket.on('respuestaAddUser', data => {
      setCoupleCompleted(data.completed);
      //setRoomNumber(data.roomNumber)
    });
/*
    socket.on('respuestaGoServerLedOn', data => {
      if (data.ledOn) updateBox(data.row, data.col);
    });
*/
  });
  verEstado = () => {
    alert('Soy el jugador nro: ' + context.jugador);
  };

  goBack = () => {
    dispatch({
      type: 'changeJugador',
      newValue: 1,
    });
    props.navigation.goBack();
  };
  //Actualizar a valores iniciales
  initializeGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setCurrentPlayer(1); //Jugador 1 (aspa) - Jugador(-1) Circulo
    setGameOver(false);
  };

  //Valores iniciales
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  //const [roomNumber, setRoomNumber] = useState(-1)
  const [coupleCompleted, setCoupleCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  //const [username, setUsername] = useState("")

  //Pintar icono (1=Aspa, -1=Circulo)
  renderIcon = (row, col) => {
    var value = gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.piezaX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.piezaO} />;
      default:
        return <View />;
    }
  };
  gestionarLoading = estado => {
    setCoupleCompleted(!estado);
  };

  onBoxPress = (row, col) => {
    // No se permite cambiar la casilla una vez modificada
    var value = gameState[row][col];
    if (value != 0) return;

    //Partida finalizada
    if (gameOver) return;

    parameters = {roomNumber: roomNumber, row: row, col: col};
    //socket.emit('GoServerLedOn', parameters);
    //updateBox = (row, col);

    return;
  };
  //updateBox = (row, col) => {
  //}
  onBoxPress = (row, col) => {
    // No se permite cambiar la casilla una vez modificada
    var value = gameState[row][col];
    if (value != 0) return;

    //Partida finalizada
    if (gameOver) return;

    //Actualizar la casilla correcta
    var arr = gameState.slice();
    arr[row][col] = currentPlayer;
    setGameState(arr);

    //Cambio al otro jugador
    var nextPlayer = currentPlayer * -1;
    setCurrentPlayer(nextPlayer);

    //Comprobar final partida
    //Hay ganador
    winner = getWinner();
    if (winner == 1) {
      setGameOver(true);
      Alert.alert('El jugador 1 ha ganado la partida');
      return;
    } else if (winner == -1) {
      setGameOver(true);
      Alert.alert('El jugador 2 ha ganado la partida');
      return;
    }
    //Empate (no hay ganador)
    var cont = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (gameState[i][j] != 0) cont++;
      }
    }

    if (cont == 9) {
      setGameOver(true);
      Alert.alert('La partida ha finalizado en empate');
    }
  };

  getWinner = () => {
    var sum = 0;
    //Comprobar filas
    for (var i = 0; i < 3; i++) {
      sum = gameState[i][0] + gameState[i][1] + gameState[i][2];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }
    //Comprobar columnas
    sum = 0;
    for (var i = 0; i < 3; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }
    //Comprobar diagonales
    sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
    if (sum == 3) return 1;
    else if (sum == -3) return -1;

    sum = gameState[0][2] + gameState[1][1] + gameState[2][0];
    if (sum == 3) return 1;
    else if (sum == -3) return -1;

    //No hay ganador
    return 0;
  };

  if (!coupleCompleted) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000040',
        }}>
        <View
          style={{flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.boxActivity}>
            <Text>Esperando jugador....</Text>
            <ActivityIndicator
              style={{paddingLeft: 30}}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
        <Button
          title="Loading"
          onPress={() => gestionarLoading(coupleCompleted)}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => onBoxPress(0, 0)}
              style={[styles.box, {borderTopWidth: 0, borderLeftWidth: 0}]}>
              {renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBoxPress(0, 1)}
              style={[styles.box, {borderTopWidth: 0}]}>
              {renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBoxPress(0, 2)}
              style={[styles.box, {borderTopWidth: 0, borderRightWidth: 0}]}>
              {renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => onBoxPress(1, 0)}
              style={[styles.box, {borderLeftWidth: 0}]}>
              {renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBoxPress(1, 1)}
              style={styles.box}>
              {renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBoxPress(1, 2)}
              style={[styles.box, {borderRightWidth: 0}]}>
              {renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => onBoxPress(2, 0)}
              style={[styles.box, {borderBottomWidth: 0, borderLeftWidth: 0}]}>
              {renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBoxPress(2, 1)}
              style={[styles.box, {borderBottomWidth: 0}]}>
              {renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onBoxPress(2, 2)}
              style={[styles.box, {borderBottomWidth: 0, borderRightWidth: 0}]}>
              {renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
            flex: 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <Button title="Reiniciar Partida" onPress={() => initializeGame()} />
          <Button
            title="Loading"
            onPress={() => gestionarLoading(coupleCompleted)}
          />
          <Button title="Estado" onPress={() => verEstado()} />
          <Button title="Salir" onPress={() => goBack()} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  boxActivity: {
    width: 300,
    height: 90,
    borderWidth: 3,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderWidth: 6,
    borderColor: '#18bc9c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  piezaX: {
    color: '#18bc9c',
    fontSize: 100,
    fontWeight: '300',
  },
  piezaO: {
    color: 'black',
    fontSize: 85,
    marginLeft: 0,
    fontWeight: '300',
  },
  image: {
    width: 90,
    height: 90,
  },
});
module.exports = BoardScreen;
