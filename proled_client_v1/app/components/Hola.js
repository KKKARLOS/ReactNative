import React, { Component }  from 'react';
import { Button, View, Text, StyleSheet, Image, ToastAndroid } from 'react-native';
import AppContext from './context'
const Hola = () => (
    <AppContext.Consumer>
        {contexto => (
            <Button 
            title="Bienvendida"
            onPress={() => alert(contexto.jugador)}
            />  
        )}              
    </AppContext.Consumer>

)
module.exports = Hola;