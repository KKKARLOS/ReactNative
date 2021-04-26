import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  Image,
  Alert,
} from 'react-native';

import {SocketContext} from '../helpers/context';
import * as RootNavigation from '../components/RootNavigation';
import * as loginFunctions from '../helpers/loginFunctions';

const MainScreen = props => {
  const socket = useContext(SocketContext);
  const [data, setData] = useState(false);

  useEffect(() => {
    //console.log(props.route.params)
    console.disableYellowBox = true;
    setData(JSON.parse(props.route.params));
    // const userData = RootNavigation.navigate
    // console.log(userData)
    //const userData = props.navigation.getParam('userData');
    //setData(JSON.parse(userData));
  }, []);

  const joinGame = () => {
    socket.emit('joingame', socket.id);
    RootNavigation.navigate('Board');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerContainer}>Juego de tres en raya</Text>
      <View
        style={{
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orange',
        }}>
        <Text>{data.name}</Text>

        <Image style={{width: 50, height: 50}} source={{uri: data.photo}} />
      </View>

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
        <Button title="OUT" onPress={() => loginFunctions._signOut()} />
      </View>
    </View>
  );
};

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
export default MainScreen;
