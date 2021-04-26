import React, {useState} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {SocketContext, GameContext} from './src/helpers/context';
import io from 'socket.io-client';

//const socket = io('https://proled.herokuapp.com/');
const socket = io('https://proled-test.herokuapp.com/');
//const socket = io('https://txunni-test.herokuapp.com/');

export default function Main() {
  return (
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
