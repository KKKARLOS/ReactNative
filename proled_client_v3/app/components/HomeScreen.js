import React, {useEffect, useState, useContext} from 'react';
import {Button, View, Text, ImageBackground, StyleSheet} from 'react-native';
//import openSocket from 'socket.io-client';
import AppContext from './Context';
import {SERVER_DEPLOY} from '../modules/Constants';

function HomeScreen(props) {
  const [context, dispatch] = useContext(AppContext);
  //const [username, setUsername] = useState("")
  var username = '';
  useEffect(() => {
    //const socket = openSocket('http://192.168.0.16:3000')
    //const socket = openSocket(SERVER_DEPLOY)
  });
  verEstado = () => {
    alert('Soy el jugador nro: ' + context.jugador);
  };
  goBoard = () => {
    dispatch({
      type: 'changeJugador',
      newValue: 2,
    });
    props.navigation.navigate('Board');
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerContainer}>Juego de tres en raya</Text>
      <ImageBackground
        source={{uri: 'https://papergames.io/images/tic-tac-toe/thumbnail.png'}}
        imageStyle={{resizeMode: 'stretch'}}
        style={styles.contentContainer}></ImageBackground>
      <View
        style={{
          flex: 0.1,
          backgroundColor: 'black',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Button title="Estado" onPress={() => verEstado()} />
        <Button title="Board" onPress={() => goBoard()} />
      </View>
    </View>
  );
}
/*
HomeScreen.navigationOptions = () => {(
  title: 'Home'
)}
*/
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2193b0',
    marginTop: 0,
    height: '100%',
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#075e54',
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 12,
  },
  contentContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = HomeScreen;
