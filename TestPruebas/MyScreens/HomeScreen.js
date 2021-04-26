import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MyButton from './MyButton';
import * as RootNavigation from './RootNavigation';
export default function HomeScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20}}>Home Screen</Text>
      <MyButton nombre="Ir a Perfil" destino="Perfil" />
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
}
