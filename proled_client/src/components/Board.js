import React, {useContext, useState, useEffect} from 'react';
import Orientation from 'react-native-orientation';
import {
  View,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import {SocketContext} from '../helpers/context';
import {initBoard} from '../helpers/functions';
import CellBox from '../components/CellBox';
import SoundPlayer from 'react-native-sound-player';
//ESTA LINEA PARA PODER USAR LA NUEVA NAVEGACION, EJEMPLO: 'RootNavigation.navigate('Main')';
import * as RootNavigation from '../components/RootNavigation';

const BoardScreen = props => {
  const socket = useContext(SocketContext);
  socket.on('win1', (data) => SoundPlayer.playSoundFile('music', 'mp3'));
  socket.on('win2', (data) => SoundPlayer.playSoundFile('music', 'mp3'));
  //socket.on('draw', (data) => SoundPlayer.playSoundFile('empate', 'mp3'));


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

  useEffect(() => {
    Orientation.lockToPortrait();
    //Eventos de escucha

    socket.once('printcell', cellObject => {
      const clonedBoardGame = {...boardGame};
      clonedBoardGame.board[cellObject.id] = {
        id: cellObject.id,
        image: cellObject.image,
      };
      clonedBoardGame.playerTurn = cellObject.playerTurn;
      setboardGame({...clonedBoardGame});
      if(cellObject.image===1){
        setTimeout(() => { SoundPlayer.playSoundFile('equis', 'mp3')  },600),
        SoundPlayer.playSoundFile('equis', 'mp3')
      }else
      SoundPlayer.playSoundFile('circle', 'mp3')
    });

    // Pongo que se ejecute una vez sólo cuando cambia el boardGame. Si pongo el array vacío se ejecutaría sólo una vez aunque cambie el board
  }, [boardGame]);

  useEffect(() => {
    //Eventos de escucha

    socket.once('gameOver', oGameOver => {
      setGameStatus({winner: oGameOver.winner, isGameOver: true});
    });

    socket.once('gotomain', () => {
      //props.navigation.navigate('Main');
      RootNavigation.navigate('Main');
    });

    socket.once('gotoboard', data => {
      setboardGame({
        board: boardGame.board,
        playerTurn: data.socketId,
        showSpinner: false,
        roomId: data.roomId,
      });
    });
    // returned function will be called on component unmount
    return () => {
      quitGameGateFalse();
    };
  }, []);

  handlePress = id => {
    if (boardGame.board[id].image !== 0) return; //si ya ha sido pulsada no vamos al servidor
    socket.emit('cellpushed', {id: id, roomId: boardGame.roomId});
  };

  quitGame = () => {
    socket.emit('deleteRoom', {roomId: boardGame.roomId});
    //props.navigation.navigate('Main');
    RootNavigation.navigate('Main');
    SoundPlayer.stop();
  };

  quitGameGateFalse = () => {
    socket.emit('gotomain');
    socket.emit('deleteRoom', {roomId: boardGame.roomId});
  };
  amIWinner = () => (gameStatus.winner === socket.id ? true : false);
  isNoWinner = () => (gameStatus.winner === null ? true : false);
  isYourTurn = () => (boardGame.playerTurn === socket.id ? false : true);

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
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  margin: 10,
                }}>
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
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'red',
                  margin: 10,
                }}>
                NO ES TU TURNO
              </Text>
              <Image
                style={styles.stop}
                source={require('../helpers/images/stop.png')}
              />
            </View>
          </Modal>
          {!isYourTurn() ? (
            <React.Fragment>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'green',
                  margin: 10,
                }}>
                ES TU TURNO
              </Text>
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
    flex: 0.4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tablero: {
    flexDirection: 'row',
    backgroundColor: 'black',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 0.6,
    alignContent: 'center',
  },
  button: {
    marginTop: 15,
    marginBottom: 10,
    padding: 14,
    borderWidth: 3,
    borderColor: '#20232a',
    borderRadius: 6,
    color: '#fff',
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
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
