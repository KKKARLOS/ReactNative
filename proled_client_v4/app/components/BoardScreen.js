import React, {useEffect, useContext} from 'react';
import {Button, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from './Context';
import {SERVER_DEPLOY} from '../modules/Constants';

function BoardScreen(props) {
  const [context, dispatch] = useContext(AppContext);
  useEffect(() => {});
  seeState = () => {
    alert('Soy el jugador nro: ' + context.jugador);
  };

  goBack = () => {
    dispatch({
      type: 'changeJugador',
      newValue: 1,
    });
    props.navigation.goBack();
  };

  renderValue = number => {
    return number;
  };

  onBoxPress = number => {
    alert(number);
  };

  let countCell = 0;
  const numbers = [1, 2, 3];
  const rowCells = numbers.map(number => (
    <TouchableOpacity style={[styles.box]} key={(countCell++).toString()} />
  ));

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
        {numbers.map(number => (
          <View style={{flexDirection: 'row'}} key={number.toString()}>
            {rowCells}
          </View>
        ))}
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
        <Button title="Estado" onPress={() => seeState()} />
        <Button title="Salir" onPress={() => goBack()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderWidth: 6,
    borderColor: '#18bc9c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
module.exports = BoardScreen;
