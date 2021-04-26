import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import Orientation from 'react-native-orientation';

const CellBox = props => {
  Orientation.lockToPortrait();
  let {id, source} = props;

  return (
    <TouchableOpacity
      style={styles.button}
      key={id}
      onPress={() => {
        props.onPress();
      }}>
      {source === 1 ? (
        <Image
          key={id}
          style={styles.image}
          source={require('../helpers/images/cross.png')}
        />
      ) : null}
      {source === 2 ? (
        <Image
          key={id}
          style={styles.image}
          source={require('../helpers/images/circulo1.png')}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default CellBox;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 105,
    height: 105,
    borderWidth: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    marginLeft: 5,
  },
  image: {
    flexDirection: 'row',
    width: 90,
    height: 85,
    //borderWidth: 6,
    borderColor: 'black',
  },
});
