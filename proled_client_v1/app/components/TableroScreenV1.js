import React, { Component }  from 'react';
import { Button, View, Text, StyleSheet, Image, ToastAndroid } from 'react-native';
import FlipCard from 'react-native-flip-card'
const aspa = require('../../aspaBlack.png')
const circulo = require('../../circulo.png')

export default class TableroScreenV1 extends Component {

    /*tablero=new Array(4)
    for (i=0; i <4; i++)
      tablero[i]=new Array(4)
    */
    constructor(props) {
      super(props)
      this.state = {
        //Propiedad 'clickable' del objeto FlipCard la inicializamos a true y una vez clicada la celda se pondra a false
        //Actua también sobre la propiedad 'flip' una vez cambiado el lado de la carta 
        isClickable_1_1: true,
        isClickable_1_2: true,
        isClickable_1_3: true,
        isClickable_2_1: true,
        isClickable_2_2: true,
        isClickable_2_3: true, 
        isClickable_3_1: true,
        isClickable_3_2: true,
        isClickable_3_3: true,            
        //Propiedad 'source' del objeto Image. Dependiendo del jugador que clique se asignará el aspa o el circulo
        imagen_1_1: null,
        imagen_1_2: null,
        imagen_1_3: null,
        imagen_2_1: null,
        imagen_2_2: null,
        imagen_2_3: null,      
        imagen_3_1: null,
        imagen_3_2: null,
        imagen_3_3: null,  
        //Jugador activo    
        jugador: 1,
        //Indica el jugador que ha clicado la celda
        celda11: null,
        celda12: null,
        celda13: null,
        celda21: null,
        celda22: null,
        celda23: null, 
        
        celda31: null,
        celda32: null,
        celda33: null,              
        //tablero: [null,null,null,null,null,null,null,null,null]
      }
    }
    
    setJugador = (jugador) => {
      this.setState({
        jugador: jugador,
      })
    }
    
    setStateFlipCard = (fila,columna) => {
      if (fila==1 && columna==1)
      {
        if (this.state.isClickable_1_1===true)
          this.setState({
            isClickable_1_1: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_1_1: circulo,
            celda11:2
          })
        else
          this.setState({
            imagen_1_1: aspa,
            celda11:1
          })                 
      }
      else if (fila==1 && columna==2)
      {
        if (this.state.isClickable_1_2===true)
          this.setState({
            isClickable_1_2: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_1_2: circulo,
            celda12:2
          })
        else
          this.setState({
            imagen_1_2: aspa,
            celda12:1
          })                 
      }      
      else if (fila==1 && columna==3)
      {
        if (this.state.isClickable_1_3===true)
          this.setState({
            isClickable_1_3: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_1_3: circulo,
            celda13:2
          })
        else
          this.setState({
            imagen_1_3: aspa,
            celda13:1
          })                 
      }   
      else if (fila==2 && columna==1)
      {
        if (this.state.isClickable_2_1===true)
          this.setState({
            isClickable_2_1: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_2_1: circulo,
            celda21:2
          })
        else
          this.setState({
            imagen_2_1: aspa,
            celda21:1
          })                 
      }
      else if (fila==2 && columna==2)
      {
        if (this.state.isClickable_2_2===true)
          this.setState({
            isClickable_2_2: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_2_2: circulo,
            celda22:2
          })
        else
          this.setState({
            imagen_2_2: aspa,
            celda22:1
          })                 
      }      
      else if (fila==2 && columna==3)
      {
        if (this.state.isClickable_2_3===true)
          this.setState({
            isClickable_2_3: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_2_3: circulo,
            celda23:2
          })
        else
          this.setState({
            imagen_2_3: aspa,
            celda23:1
          })                 
      }     
      else if (fila==3 && columna==1)
      {
        if (this.state.isClickable_3_1===true)
          this.setState({
            isClickable_3_1: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_3_1: circulo,
            celda31:2
          })
        else
          this.setState({
            imagen_3_1: aspa,
            celda31:1
          })                 
      }
      else if (fila==3 && columna==2)
      {
        if (this.state.isClickable_3_2===true)
          this.setState({
            isClickable_3_2: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_3_2: circulo,
            celda32:2
          })
        else
          this.setState({
            imagen_3_2: aspa,
            celda32:1
          })                 
      }      
      else if (fila==3 && columna==3)
      {
        if (this.state.isClickable_3_3===true)
          this.setState({
            isClickable_3_3: false
          })
        if (this.state.jugador==1)
          this.setState({
            imagen_3_3: circulo,
            celda33:2
          })
        else
          this.setState({
            imagen_3_3: aspa,
            celda33:1
          })                 
      }  
      
      //alert(this.state.jugador+ " "+this.state.celda11+" "+this.state.celda12+" "+this.state.celda13)
      // Validaciones de fin de partida

      if 
        (
          (this.state.jugador==1 && this.state.celda11==2 && this.state.celda12==2 && this.state.celda13==2) ||
          (this.state.jugador==1 && this.state.celda11==2 && this.state.celda21==2 && this.state.celda31==2) ||
          (this.state.jugador==1 && this.state.celda11==2 && this.state.celda22==2 && this.state.celda33==2) ||
          (this.state.jugador==1 && this.state.celda12==2 && this.state.celda22==2 && this.state.celda32==2) ||
          (this.state.jugador==1 && this.state.celda13==2 && this.state.celda23==2 && this.state.celda33==2) || 
          (this.state.jugador==1 && this.state.celda13==1 && this.state.celda22==1 && this.state.celda31==1) ||
          (this.state.jugador==1 && this.state.celda21==2 && this.state.celda22==2 && this.state.celda23==2) || 
          (this.state.jugador==1 && this.state.celda31==2 && this.state.celda22==2 && this.state.celda33==2)                                                
        )
        {  
          ToastAndroid.show('Juego finalizado ha ganado el jugador 1', ToastAndroid.LONG);
          //M.toast ({ html:'Juego finalizado ha ganado el jugador 1' })   
          //alert("Juego finalizado ha ganado el jugador 1")
          this.props.navigation.goBack()
        }       
      if 
        (
          (this.state.jugador==2 && this.state.celda11==1 && this.state.celda12==1 && this.state.celda13==1) ||
          (this.state.jugador==2 && this.state.celda11==1 && this.state.celda21==1 && this.state.celda31==1) ||
          (this.state.jugador==2 && this.state.celda11==1 && this.state.celda22==1 && this.state.celda33==1) ||
          (this.state.jugador==2 && this.state.celda12==1 && this.state.celda22==1 && this.state.celda32==1) ||
          (this.state.jugador==2 && this.state.celda13==1 && this.state.celda23==1 && this.state.celda33==1) ||
          (this.state.jugador==2 && this.state.celda13==1 && this.state.celda22==1 && this.state.celda31==1) ||
          (this.state.jugador==2 && this.state.celda21==1 && this.state.celda22==1 && this.state.celda23==1) || 
          (this.state.jugador==2 && this.state.celda31==1 && this.state.celda32==1 && this.state.celda33==1)                                            
        )
        {
          ToastAndroid.show('Juego finalizado ha ganado el jugador 2', ToastAndroid.LONG);
          //M.toast ({ html:'Juego finalizado ha ganado el jugador 2' })   
          this.props.navigation.goBack()
        }       

      if 
        (
          this.state.celda11!=null &&
          this.state.celda12!=null &&
          this.state.celda13!=null &&
          this.state.celda21!=null &&
          this.state.celda22!=null &&
          this.state.celda23!=null && 
          this.state.celda31!=null &&
          this.state.celda32!=null &&
          this.state.celda33!=null    
          )
          { 
            ToastAndroid.show('Juego finalizado en empate', ToastAndroid.LONG);
            //M.toast ({ html:'Juego finalizado en empate' })
            this.props.navigation.goBack()
          } 

      //Asignamos jugador a quien toca indicar casilla   
      if (this.state.jugador==1) this.setState({jugador:2})
      else this.setState({jugador:1})                
    }  
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{flex:0.2, backgroundColor: 'black', flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', width:'100%'}}>
            <Button onPress={() => {this.setJugador(1)}}
                title="Jugador 1"
              />
            <Button onPress={() => {this.setJugador(2)}}
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
                  flip={!this.state.isClickable_1_1}
                  clickable={this.state.isClickable_1_1}
                  onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(1,1)}}
                >
                  <View style={styles.portada}>                
                  </View>
                  <View style={styles.contenido}>
                    <Image 
                        style={styles.image}
                        source={this.state.imagen_1_1}
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
                flip={!this.state.isClickable_1_2}
                clickable={this.state.isClickable_1_2}
                onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(1,2)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={this.state.imagen_1_2}
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
                flip={!this.state.isClickable_1_3}
                clickable={this.state.isClickable_1_3}
                onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(1,3)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={this.state.imagen_1_3}
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
                  flip={!this.state.isClickable_2_1}
                  clickable={this.state.isClickable_2_1}
                  onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(2,1)}}
                >
                  <View style={styles.portada}>                
                  </View>
                  <View style={styles.contenido}>
                    <Image 
                        style={styles.image}
                        source={this.state.imagen_2_1}
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
                flip={!this.state.isClickable_2_2}
                clickable={this.state.isClickable_2_2}
                onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(2,2)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={this.state.imagen_2_2}
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
                flip={!this.state.isClickable_2_3}
                clickable={this.state.isClickable_2_3}
                onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(2,3)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={this.state.imagen_2_3}
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
                  flip={!this.state.isClickable_3_1}
                  clickable={this.state.isClickable_3_1}
                  onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(3,1)}}
                >
                  <View style={styles.portada}>                
                  </View>
                  <View style={styles.contenido}>
                    <Image 
                        style={styles.image}
                        source={this.state.imagen_3_1}
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
                flip={!this.state.isClickable_3_2}
                clickable={this.state.isClickable_3_2}
                onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(3,2)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={this.state.imagen_3_2}
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
                flip={!this.state.isClickable_3_3}
                clickable={this.state.isClickable_3_3}
                onFlipEnd={(isFlipEnd)=>{this.setStateFlipCard(3,3)}}
              >
                <View style={styles.portada}>                
                </View>
                <View style={styles.contenido}>
                  <Image 
                      style={styles.image}
                      source={this.state.imagen_3_3}
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