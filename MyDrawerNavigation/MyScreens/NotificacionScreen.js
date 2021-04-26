
import * as React from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton'

export default function NotificacionScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Notificacion Screen</Text>
            <MyButton nombre='Ir a Home' destino='Home'/>
        </View>
    );
}