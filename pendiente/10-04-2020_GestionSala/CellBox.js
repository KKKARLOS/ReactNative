import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

const CellBox = props => {
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
          source={require('../helpers/images/cross.png')}></Image>
      ) : null}
      {source === 2 ? (
        <Image
          key={id}
          style={styles.image}
          source={require('../helpers/images/circle.png')}></Image>
      ) : null}
    </TouchableOpacity>
  );
};

export default CellBox;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 120,
    height: 120,
    borderWidth: 6,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  image: {
    flexDirection: 'row',
    width: 120,
    height: 115,
    borderWidth: 6,
    borderColor: 'black',
  },
});
