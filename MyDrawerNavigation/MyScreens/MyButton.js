import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as RootNavigation from './RootNavigation'

export default function MyButton({nombre, destino}) {
    return (
            <TouchableOpacity style={{ marginTop: 20, width: 200, height: 50, backgroundColor: '#ff5204', padding: 10, alignItems: 'center', borderRadius: 5 }}
                onPress={() => RootNavigation.navigate(destino)}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{nombre}</Text>
            </TouchableOpacity>
    )
}
