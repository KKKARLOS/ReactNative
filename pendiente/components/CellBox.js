
import React,{useContext} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SocketContext} from '../helpers/context';

const CellBox = (props) => {

  const socket = useContext(SocketContext);
   let {id,source} = props;

  return (
      <TouchableOpacity  
        style={styles.button} 
        key={id}
        onPress={() => {socket.emit ('cellpushed',id)}}
      >
        {source === 0 ? <Image key={id} style={styles.image} source={require('../helpers/images/calavera.png')}></Image> : null}
        {source === 1 ? <Image key={id} style={styles.image} source={require('../helpers/images/cross.png')}></Image> : null}
        {source === 2 ? <Image key={id} style={styles.image} source={require('../helpers/images/circle.png')}></Image> : null}
      </TouchableOpacity>
  );
}

export default CellBox;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 120, 
    height: 120,
    borderWidth: 6,
    borderColor: 'black',
    backgroundColor: '#00FFFF',
 },
  image: {
    flexDirection: 'row',
    width: 120, 
    height: 120,
    borderWidth: 6,
    borderColor: 'black',
  }
});