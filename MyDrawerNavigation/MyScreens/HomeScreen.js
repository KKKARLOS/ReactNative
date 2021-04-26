import * as React from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton'
export default function HomeScreen(props) {
    return (
        <View style={{
            flex: 1, alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{ fontSize: 20 }}>Home Screen</Text>
            <MyButton nombre='Ir a Perfil' destino='Perfil'/>
        </View>
    );
}
