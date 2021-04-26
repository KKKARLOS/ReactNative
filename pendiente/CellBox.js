
import React,{useContext} from 'react';
import { Button, View, Text , StyleSheet, TouchableOpacity} from 'react-native';
import SocketContext from '../helpers/context';

const CellBox = (props) => {

  const socket = useContext(SocketContext);
 
  let {id} = props;

    return (
        <TouchableOpacity  
          style={styles.button} 
          key={id}
          onPress={() => {socket.emit ('cell',id)}}
        />
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
});