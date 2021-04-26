import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';

import {SocketContext} from '../helpers/context';

const MainScreen = props => {
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
    boxActivity: {
      width: 300,
      height: 90,
      borderWidth: 3,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const socket = useContext(SocketContext);
  const [showSpinner, setShowSpinner] = useState(false);

  const joinGame = () => {
    socket.emit('joingame', socket.id);
    setShowSpinner(true);
  };

  socket.on('gotoboard', data => {
    props.navigation.navigate('Board');
  });

  if (showSpinner) {
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
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerContainer}>Juego de tres en raya</Text>
        <ImageBackground
          source={{
            uri: 'https://papergames.io/images/tic-tac-toe/thumbnail.png',
          }}
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
          <Button title="JUGAR" onPress={() => joinGame()} />
        </View>
      </View>
    );
  }
};

export default MainScreen;
