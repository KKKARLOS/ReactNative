import React, { Component, useContext, useStateValue  }  from 'react';
import { Button, View, Text, StyleSheet, Image, ToastAndroid } from 'react-native';
import AppContext from './context'
import FlipCard from 'react-native-flip-card'
const aspa = require('../../aspaBlack.png')
const circulo = require('../../circulo.png')

const TableroScreen= (props) => {
    const navigationOptions = {    
      title: "Retroceder",
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),      
    };

    const [context , dispatch] = useContext(AppContext);
 
    const setStateFlipCard = (fila,columna) => {
      if (fila==1 && columna==1)
      { 
        if (context.isClickable_1_1===true)
          dispatch({
            type: 'changeIsClickable_1_1',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_1_1',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda11',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_1_1',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda11',
            newValue: 1
          })        
        }                       
      }
      else if (fila==1 && columna==2)
      { 
        if (context.isClickable_1_2===true)
          dispatch({
            type: 'changeIsClickable_1_2',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_1_2',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda12',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_1_2',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda12',
            newValue: 1
          })        
        }                       
      }      
      else if (fila==1 && columna==3)
      { 
        if (context.isClickable_1_3===true)
          dispatch({
            type: 'changeIsClickable_1_3',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_1_3',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda13',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_1_3',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda13',
            newValue: 1
          })        
        }                       
      }  
      else if (fila==2 && columna==1)
      { 
        if (context.isClickable_2_1===true)
          dispatch({
            type: 'changeIsClickable_2_1',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_2_1',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda21',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_2_1',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda21',
            newValue: 1
          })        
        }                       
      }
      else if (fila==2 && columna==2)
      { 
        if (context.isClickable_2_2===true)
          dispatch({
            type: 'changeIsClickable_2_2',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_2_2',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda22',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_2_2',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda22',
            newValue: 1
          })        
        }                       
      }   
      else if (fila==2 && columna==3)
      { 
        if (context.isClickable_2_3===true)
          dispatch({
            type: 'changeIsClickable_2_3',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_2_3',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda23',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_2_3',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda23',
            newValue: 1
          })        
        }                       
      }        
      else if (fila==3 && columna==1)
      { 
        if (context.isClickable_3_1===true)
          dispatch({
            type: 'changeIsClickable_3_1',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_3_1',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda31',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_3_1',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda31',
            newValue: 1
          })        
        }                       
      }  
      else if (fila==3 && columna==2)
      { 
        if (context.isClickable_3_2===true)
          dispatch({
            type: 'changeIsClickable_3_2',
            newValue: false
          })

        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_3_2',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda32',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_3_2',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda32',
            newValue: 1
          })        
        }                       
      }    
      else if (fila==3 && columna==3)
      { 
        if (context.isClickable_3_3===true)
          dispatch({
            type: 'changeIsClickable_3_3',
            newValue: false
          })

          
        if (context.jugador==1)
        {
          dispatch({
            type: 'changeImagen_3_3',
            newValue: circulo
          })
          dispatch({
            type: 'changeCelda33',
            newValue: 2
          })       
        }
        else
        {
          dispatch({
            type: 'changeImagen_3_3',
            newValue: aspa
          })
          dispatch({
            type: 'changeCelda33',
            newValue: 1
          })        
        }                       
      }  

      //alert(context.jugador+ " "+context.celda11+" "+context.celda12+" "+context.celda13)

      // Validaciones de fin de partida

      if 
        (
          (context.jugador==1 && context.celda11==2 && context.celda12==2 && context.celda13==2) ||
          (context.jugador==1 && context.celda11==2 && context.celda21==2 && context.celda31==2) ||
          (context.jugador==1 && context.celda11==2 && context.celda22==2 && context.celda33==2) ||
          (context.jugador==1 && context.celda12==2 && context.celda22==2 && context.celda32==2) ||
          (context.jugador==1 && context.celda13==2 && context.celda23==2 && context.celda33==2) || 
          (context.jugador==1 && context.celda13==2 && context.celda22==2 && context.celda31==2) ||
          (context.jugador==1 && context.celda21==2 && context.celda22==2 && context.celda23==2) || 
          (context.jugador==1 && context.celda31==2 && context.celda22==2 && context.celda33==2)                                                
        )
        {  
          ToastAndroid.show('Juego finalizado ha ganado el jugador 1', ToastAndroid.LONG);
          //M.toast ({ html:'Juego finalizado ha ganado el jugador 1' })   
          props.navigation.goBack()
        }       
      if 
        (
          (context.jugador==2 && context.celda11==1 && context.celda12==1 && context.celda13==1) ||
          (context.jugador==2 && context.celda11==1 && context.celda21==1 && context.celda31==1) ||
          (context.jugador==2 && context.celda11==1 && context.celda22==1 && context.celda33==1) ||
          (context.jugador==2 && context.celda12==1 && context.celda22==1 && context.celda32==1) ||
          (context.jugador==2 && context.celda13==1 && context.celda23==1 && context.celda33==1) ||
          (context.jugador==2 && context.celda13==1 && context.celda22==1 && context.celda31==1) ||
          (context.jugador==2 && context.celda21==1 && context.celda22==1 && context.celda23==1) || 
          (context.jugador==2 && context.celda31==1 && context.celda32==1 && context.celda33==1)                                            
        )
        {
          ToastAndroid.show('Juego finalizado ha ganado el jugador 2', ToastAndroid.LONG);
          //M.toast ({ html:'Juego finalizado ha ganado el jugador 2' })   
          props.navigation.goBack()
        }       

      if 
        (
          context.celda11!=null &&
          context.celda12!=null &&
          context.celda13!=null &&
          context.celda21!=null &&
          context.celda22!=null &&
          context.celda23!=null && 
          context.celda31!=null &&
          context.celda32!=null &&
          context.celda33!=null    
          )
          { 
            ToastAndroid.show('Juego finalizado en empate', ToastAndroid.LONG);
            //M.toast ({ html:'Juego finalizado en empate' })
            props.navigation.goBack()
          } 

      //Asignamos jugador a quien toca indicar casilla     
      
      if (context.jugador==1)
      {
        dispatch({
          type: 'changeJugador',
          newValue: 2
        })     
      }  
      else  
      {
        dispatch({
          type: 'changeJugador',
          newValue: 1
        })  
      }  
    }  

    const changeJugador = (jugador) => {
      dispatch({
        type: 'changeJugador',
        newValue: jugador
      }) 
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex:0.2, backgroundColor: 'black', flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', width:'100%'}}>
          <Button onPress={() => {changeJugador(1)}}
              title="Jugador 1"
            />
          <Button onPress={() => {changeJugador(2)}}
              title="Jugador 2"
            />
        </View>
        <View style={{flex:0.2, backgroundColor: 'black', flexDirection:'row', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
          <View style={styles.box}>
            <FlipCard
                friction={8}
                perspective={100}
                flipHorizontal={true}
                flipVertical={false}
                flip={!context.isClickable_1_1}
                clickable={context.isClickable_1_1}
                onFlipEnd={(isFlipEnd)=>{setStateFlipCard(1,1)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={context.imagen_1_1}
                    />
                </View>                
            </FlipCard>
          </View>
          <View style={styles.box}>
            <FlipCard
              friction={8}
              perspective={100}
              flipHorizontal={true}
              flipVertical={false}
              flip={!context.isClickable_1_2}
              clickable={context.isClickable_1_2}
              onFlipEnd={(isFlipEnd)=>{setStateFlipCard(1,2)}}
            >
              <View style={styles.portada}>                
              </View>
              <View style={styles.contenido}>
              <Image 
                    style={styles.image}
                    source={context.imagen_1_2}
                  />
              </View>                
            </FlipCard>              
          </View>
          <View style={styles.box}>
            <FlipCard
              friction={8}
              perspective={100}
              flipHorizontal={true}
              flipVertical={false}
              flip={!context.isClickable_1_3}
              clickable={context.isClickable_1_3}
              onFlipEnd={(isFlipEnd)=>{setStateFlipCard(1,3)}}
            >
              <View style={styles.portada}>                
              </View>
              <View style={styles.contenido}>
              <Image
                    style={styles.image}
                    source={context.imagen_1_3}
                  />
              </View>                
            </FlipCard>              
          </View>
        </View>  
        <View style={{flex:0.2, backgroundColor: 'black', flexDirection:'row', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
          <View style={styles.box}>
            <FlipCard
                friction={8}
                perspective={100}
                flipHorizontal={true}
                flipVertical={false}
                flip={!context.isClickable_2_1}
                clickable={context.isClickable_2_1}
                onFlipEnd={(isFlipEnd)=>{setStateFlipCard(2,1)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={context.imagen_2_1}
                    />
                </View>                
            </FlipCard>
          </View>
          <View style={styles.box}>
            <FlipCard
              friction={8}
              perspective={100}
              flipHorizontal={true}
              flipVertical={false}
              flip={!context.isClickable_2_2}
              clickable={context.isClickable_2_2}
              onFlipEnd={(isFlipEnd)=>{setStateFlipCard(2,2)}}
            >
              <View style={styles.portada}>                
              </View>
              <View style={styles.contenido}>
                <Image 
                    style={styles.image}
                    source={context.imagen_2_2}
                  />
              </View>                
            </FlipCard>              
          </View>
          <View style={styles.box}>
            <FlipCard
              friction={8}
              perspective={100}
              flipHorizontal={true}
              flipVertical={false}
              flip={!context.isClickable_2_3}
              clickable={context.isClickable_2_3}
              onFlipEnd={(isFlipEnd)=>{setStateFlipCard(2,3)}}
            >
              <View style={styles.portada}>                
              </View>
              <View style={styles.contenido}>
                <Image 
                    style={styles.image}
                    source={context.imagen_2_3}
                  />
              </View>                
            </FlipCard>              
          </View>
        </View>     
        <View style={{flex:0.2, backgroundColor: 'black', flexDirection:'row', alignItems: 'center', justifyContent: 'center', width:'100%'}}>
          <View style={styles.box}>
            <FlipCard
                friction={8}
                perspective={100}
                flipHorizontal={true}
                flipVertical={false}
                flip={!context.isClickable_3_1}
                clickable={context.isClickable_3_1}
                onFlipEnd={(isFlipEnd)=>{setStateFlipCard(3,1)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={context.imagen_3_1}
                    />
                </View>                
            </FlipCard>
          </View>
          <View style={styles.box}>
            <FlipCard
              friction={8}
              perspective={100}
              flipHorizontal={true}
              flipVertical={false}
              flip={!context.isClickable_3_2}
              clickable={context.isClickable_3_2}
              onFlipEnd={(isFlipEnd)=>{setStateFlipCard(3,2)}}
            >
              <View style={styles.portada}>                
              </View>
              <View style={styles.contenido}>
                <Image 
                    style={styles.image}
                    source={context.imagen_3_2}
                  />
              </View>                
            </FlipCard>              
          </View>
          <View style={styles.box}>
            <FlipCard
              friction={8}
              perspective={100}
              flipHorizontal={true}
              flipVertical={false}
              flip={!context.isClickable_3_3}
              clickable={context.isClickable_3_3}
              onFlipEnd={(isFlipEnd)=>{setStateFlipCard(3,3)}}
            >
              <View style={styles.portada}>                
              </View>
              <View style={styles.contenido}>
                <Image 
                    style={styles.image}
                    source={context.imagen_3_3}
                  />
              </View>                
            </FlipCard>              
          </View>
        </View>                      
        <View style={{flex:0.2, backgroundColor: 'black', flexDirection:'row', alignItems: 'flex-end', justifyContent: 'center', width:'100%'}}>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    box: {
      width:100,
      height:100,
      backgroundColor: 'black',
      margin: 10,
    },
    portada: {
      width: "100%",
      height: "100%",
      backgroundColor: 'pink'
    },   
    contenido: {
      width: "100%",
      height: "100%",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },      
    image: {
      width: 90,
      height: 90,
    }
  });
  module.exports = TableroScreen;