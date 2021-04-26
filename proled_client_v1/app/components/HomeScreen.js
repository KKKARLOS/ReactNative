import React, { Component, useContext }  from 'react';
import { Button, View, Text, ImageBackground, StyleSheet  } from 'react-native';
import openSocket from 'socket.io-client';
import AppContext from './context'

//192.168.0.13
let socket = openSocket('http://192.168.43.229:3000')//, {
//let socket = openSocket('http://192.168.0.13:3000', {  
//  transports: ['websocket']
//});

const HomeScreen= (props) => {
  const [context , dispatch] = useContext(AppContext);
  //Socket en escucha

  socket.on('confirmadaSala', (data)=> {
                                        console.log("confirmacion recibida");
                                        console.log(data);
                                        context.navigation.navigate('TableroScreen')
                                      })
  socket.on('salaAsignada', salaAsignada) 
  socket.on('conexionesActuales', conexionesActuales)

  const asignarSala_Server = () => {
    
    //Establecer conexion con el servidor-Socket
    /*message = {
      author: "Carlos",
      text: "Asigname sala"
    }*/
    socket.emit('asignarSala',"holaaaaaaaaaaaaaaaa")
    console.log("Establecer conexión con el servidor")
  }
  const confirmadaSala = () => {
    //this.state.navegacion.navigate('Tablero')
    console.log("Confirmación de sala por el servidor")
  }
  const conexionesActuales = (num) => {
    console.log("Conexiones actuales ",num)
    //this.state.navegacion.navigate('Tablero')
  }
  const salaAsignada = (sala) => {
    console.log("Número de Sala asignada",sala)
    //this.state.navegacion.navigate('Tablero')
  }

  return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerContainer}>Juego de tres en raya</Text>
        <ImageBackground  source={{uri:"https://papergames.io/images/tic-tac-toe/thumbnail.png"}}
          imageStyle={{resizeMode: 'stretch'}}
          style={styles.contentContainer}
        > 
        </ImageBackground > 
        <View style={{flex:0.1, backgroundColor: 'black', flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', width:'100%'}}>
            <Button 
              title="Iniciar Partida"
              onPress={ () => asignarSala_Server}
            />
            <Button 
              title="Tablero"
              onPress={() => props.navigation.navigate('Tablero')}
            />        
          </View>               
      </View>
  )
}
/*
HomeScreen.navigationOptions = () => {(
  title: 'Home'
)}
*/
const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#2193b0',
    marginTop: 0,
    height: '100%'
  },
  headerContainer: {
    height: 60,
    backgroundColor: "#075e54",
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical:12

  },
  contentContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftBottom: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: "center",
    marginBottom:10,
    marginLeft: 10
  },
  logo: {
    color: "#ffffff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold"
  }
 })
 module.exports = HomeScreen;