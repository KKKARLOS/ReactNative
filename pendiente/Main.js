import React, {useContext} from 'react';
import {Button, View, Text, ImageBackground, StyleSheet} from 'react-native';
import SocketContext from '../helpers/context';

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
  });

  const socket = useContext(SocketContext);

  const assignRoomServer = props => {
    params = {
      user: 'usuario google signin',
    };
    socket.emit('assignRoomServer', params);
    props.navigation.navigate('Board');
  };

  socket.on('gotoboard', data => {
    console.log('Navigation to the board');
    //props.navigation.navigate('Board');
  });

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
        <Button title="JUGAR" onPress={() => assignRoomServer(props)} />
      </View>
    </View>
  );
};
export default MainScreen;
