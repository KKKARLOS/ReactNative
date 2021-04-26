import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const HistorialScreen = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20}}>Historial Screen</Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 200,
          height: 50,
          backgroundColor: 'green',
          padding: 10,
          alignItems: 'center',
          borderRadius: 5,
        }}
        onPress={() => props.navigation.toggleDrawer()}>
        <Text style={{color: '#fff', fontSize: 20}}>SideBar</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HistorialScreen;
