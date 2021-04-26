import React, {useContext, useState} from 'react';
import {View, Image, StyleSheet, ToastAndroid} from 'react-native';
import {SocketContext} from '../helpers/context';
import {initBoard} from '../helpers/functions';
import CellBox from '../components/CellBox';

const BoardScreen = props => {
  const socket = useContext(SocketContext);
  const [boardGame, setboardGame] = useState(initBoard(9));
  const [gameOver, setGameOver] = useState(false);

  socket.on('gotomain', data => {
    ToastAndroid.show('Game finished, navigate to Main', ToastAndroid.SHORT);
    props.navigation.navigate('Main');
  });

  socket.on('printcell', oPrintCell => {
    //Actualizar  array Partida
    /*ToastAndroid.show(
      'id:  ' +
        oPrintCell.id +
        ',image:' +
        oPrintCell.image +
        ',winner:' +
        oPrintCell.winner +
        ',gameover:' +
        oPrintCell.gameover,
      ToastAndroid.SHORT,
    );*/
    var cellObject = {id: oPrintCell.id, image: oPrintCell.image};
    /*
    const statusCopy = [...boardGame];
    statusCopy[cellObject.id] = cellObject;
    setboardGame([...statusCopy]);
*/
    boardGame[cellObject.id] = cellObject;
    setboardGame([...boardGame]);

    //Mostrar mensaje ganador partida
    /*
    if (oPrintCell.gameOver) setGameOver(true);
    if (oPrintCell.winner != 0)
      ToastAndroid.show(
        'El ganador de la partida ha sido el jugador número:  ' +
          oPrintCell.winner,
        ToastAndroid.SHORT,
      );*/
  });

  return (
    <View>
      <View style={styles.head}>
        <Image source={require('../helpers/images/calaveras.png')}></Image>
      </View>
      <View style={styles.container}>
        {boardGame.map(item => {
          return (
            <View>
              <CellBox id={item.id} source={item.image}></CellBox>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BoardScreen;

const styles = StyleSheet.create({
  head: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flexDirection: 'row',
    backgroundColor: 'green',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
