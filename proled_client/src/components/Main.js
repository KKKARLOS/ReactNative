import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';

import {SocketContext} from '../helpers/context';
import * as RootNavigation from '../components/RootNavigation';
import * as loginFunctions from '../helpers/loginFunctions';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation';

const MainScreen = props => {
  const socket = useContext(SocketContext);
  const [data, setData] = useState({});

  getUserData = async () => {
    try {
      userActiveData = (await AsyncStorage.getItem('userData')) || 'none';
    } catch (error) {
      // Error retrieving data
      userActiveData = null;
    }
    setData(JSON.parse(userActiveData));
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    try {
      // play the file .mp3
      SoundPlayer.playSoundFile('nebula', 'mp3');
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    console.disableYellowBox = true;
    
    getUserData();

    // returned function will be called on component unmount
    return () => {
      SoundPlayer.stop();
    };
  }, []);

  const joinGame = () => {
    SoundPlayer.stop();
    socket.emit('joingame', {socketId: socket.id, googleUserData: data});
    RootNavigation.navigate('Board');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.loginData}>
        <ImageBackground
          source={require('../helpers/images/lluvia.jpeg')}
          imageStyle={{resizeMode: 'stretch'}}
          style={styles.contentContainer}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50}}
            source={{uri: data.photo}}
          />
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>
            {data.name}
          </Text>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Image
              style={{width: 50, height: 50, borderRadius: 10}}
              source={require('../helpers/images/lista.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <ImageBackground
        source={require('../helpers/images/nave.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          //key={id}
          onPress={() => {
            joinGame();
          }}>
          <ImageBackground
            source={require('../helpers/images/3raya.png')}
            imageStyle={{resizeMode: 'stretch'}}
            style={styles.button}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          //key={id}
          onPress={() => {
            SoundPlayer.stop();
            RootNavigation.navigate('Simon',data);
            //loginFunctions._signOut();
          }}>
          <ImageBackground
            source={require('../helpers/images/simon.png')}
            imageStyle={{resizeMode: 'stretch'}}
            style={styles.button}
          />
        </TouchableOpacity>
      </ImageBackground>
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
  loginData: {
    flex: 0.15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 0,
  },
  footer: {
    flex: 0.1,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    width: 90,
    height: 90,
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
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});
export default MainScreen;
