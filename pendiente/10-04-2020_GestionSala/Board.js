import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SocketContext} from '../helpers/context';
import {initBoard} from '../helpers/functions';
import CellBox from '../components/CellBox';
//ESTA LINEA PARA PODER USAR LA NUEVA NAVEGACION, EJEMPLO: 'RootNavigation.navigate('Main')';
import * as RootNavigation from '../components/RootNavigation';

const BoardScreen = props => {
  const socket = useContext(SocketContext);

  //Variables con estado
  let [boardGame, setboardGame] = useState({
    board: initBoard(9),
    playerTurn: '',
    showSpinner: true,
    roomId: 0,
  });
  let [gameStatus, setGameStatus] = useState({
    winner: null,
    isGameOver: false,
  });

  socket.once('gotoboard', data => {
    setboardGame({
      board: boardGame.board,
      playerTurn: data.socketId,
      showSpinner: false,
      roomId: data.roomId,
    });
    /*ToastAndroid.show(
      'Sala asignada número: ' + boardGame.roomId,
      ToastAndroid.SHORT,
    );*/
  });
  useEffect(() => {
    //Eventos de escucha

    socket.once('gameOver', oGameOver => {
      setGameStatus({winner: oGameOver.winner, isGameOver: true});
    });

    socket.once('printcell', cellObject => {
      const clonedBoardGame = {...boardGame};
      clonedBoardGame.board[cellObject.id] = {
        id: cellObject.id,
        image: cellObject.image,
      };
      clonedBoardGame.playerTurn = cellObject.playerTurn;
      setboardGame({...clonedBoardGame});
    });

    socket.once('gotomain', () => {
      props.navigation.navigate('Main');
    });

    socket.once('gotoboard', data => {
      setboardGame({
        board: boardGame.board,
        playerTurn: data.socketId,
        showSpinner: false,
        roomId: data.roomId,
      });
      /*ToastAndroid.show(
        'Sala asignada número: ' + boardGame.roomId,
        ToastAndroid.SHORT,
      );*/
    });
    // Pongo que se ejecute una vez sólo cuando cambia el boardGame. Si pongo el array vacío se ejecutaría sólo una vez aunque cambie el board
  }, [boardGame]);

  handlePress = id => {
    if (boardGame.board[id].image !== 0) return; //si ya ha sido pulsada no vamos al servidor
    socket.emit('cellpushed', id);
  };

  quitGame = () => {
    socket.emit('deleteRoom', {roomId: boardGame.roomId});
    props.navigation.navigate('Main');
  };

  amIWinner = () => (gameStatus.winner === socket.id ? true : false);
  isNoWinner = () => (gameStatus.winner === null ? true : false);
  isYourTurn = () => (boardGame.playerTurn === socket.id ? false : true);

  /* controlar botón de retroceso para no dejar bloqueado al otro jugador*/

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        socket.emit('deleteRoom', {roomId: boardGame.roomId});
        socket.emit('gotomain');
        return false; //El valor false deja salir de la pantalla y el valor true no lo permite
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  //Renderizado

  if (boardGame.showSpinner) {
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
            <Text>Esperando jugador...</Text>
            <ActivityIndicator
              style={{paddingLeft: 30}}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Modal visible={gameStatus.isGameOver} transparent={true}>
            <View style={styles.modalContent}>
              <Text style={{fontSize: 22}}>
                {amIWinner()
                  ? 'HAS GANADO'
                  : isNoWinner()
                  ? 'EMPATE'
                  : 'HAS PERDIDO'}
              </Text>
              <Image
                style={styles.finger}
                source={
                  amIWinner()
                    ? require('../helpers/images/finger_up.png')
                    : isNoWinner()
                    ? require('../helpers/images/empate.png')
                    : require('../helpers/images/finger_down.png')
                }
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => quitGame()}>
                <Text>Pulse aquí para continuar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal visible={isYourTurn()} transparent={true}>
            <View style={styles.modalContent}>
              <Text style={{fontSize: 22}}>NO ES TU TURNO</Text>
              <Image
                style={styles.stop}
                source={require('../helpers/images/stop.png')}
              />
            </View>
          </Modal>
          {!isYourTurn() ? (
            <React.Fragment>
              <Text style={{fontSize: 22}}>ES TU TURNO</Text>
              <Image
                style={styles.finger2}
                source={require('../helpers/images/finger_up.png')}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.tablero}>
          {boardGame.board.map(item => {
            return (
              <View>
                <CellBox
                  id={item.id}
                  source={item.image}
                  onPress={() => handlePress(item.id)}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
};

export default BoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 5,
    flex: 0.1,
    borderRadius: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalContent: {
    flex: 0.3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tablero: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 0.7,
  },
  button: {
    marginTop: 15,
    marginBottom: 10,
    padding: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    color: '#fff',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  boxActivity: {
    width: 300,
    height: 90,
    borderWidth: 3,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finger: {
    width: 90,
    height: 90,
  },
  stop: {
    width: 180,
    height: 130,
  },
  finger2: {
    width: 140,
    height: 140,
  },
});
