import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet,View,Text,Button,ImageBackground, TouchableOpacity, Image, Alert} from 'react-native';
import * as RootNavigation from '../components/RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import {SocketContext} from '../helpers/context';
import { Avatar } from 'react-native-elements';
import SoundPlayer from 'react-native-sound-player';
import Orientation from 'react-native-orientation';

const Simon = props => {

const socket = useContext(SocketContext);
const [data, setData] = useState({});
const [greenState , setGreenState] = useState(true);
const [redState , setRedState] = useState(true);
const [yellowState , setYellowState] = useState(true);
const [blueState , setBlueState] = useState(true);
const [sequence , setSequence] = useState([])
const [sequencePlay , setSequencePlay] = useState([])
const [level, setLevel] = useState(1)
const [turn, setTurn] = useState(false)
const [title, setTitle] = useState("ACTIVAR SECUENCIA SIMON")
const [okis, setOkis] = useState(0)

const sequenceGenerate = (sequence) => {
    let data = Math.floor(Math.random()*(5-1)+1);  //dara un valor entr 1 y 4 random
    sequence.push(data)
}

const sequenceComprobate = (sequence,sequencePlay) => {

  let last = JSON.stringify(sequencePlay[sequencePlay.length-1])
  let actual = JSON.stringify(sequence[sequencePlay.length-1])
  if(sequence.length>=sequencePlay.length)
    if(actual===last){
     setOkis(okis+1)
      console.log("vas bien",okis)
      okis===(sequence.length-1)? 
      (SoundPlayer.playSoundFile('good', 'mp3'),socket.emit('simonOk'),setLevel(level+1)
      ,setSequencePlay([]),setOkis(0)
      ,setTimeout(() => {   
      secuencia(sequence);
      },2000)):null
    }
  
    else{
      SoundPlayer.playSoundFile('incorrecto', 'mp3')
      socket.emit('simonError')
      setLevel(1),setSequencePlay([]),setSequence([]),setTurn(false),setTitle("JUGAR AL SIMON"),setOkis(0)
    }  
  else
    Alert.alert("fuera de rango")
}

const secuencia = (sequence) => {
  let time=200;
  sequenceGenerate(sequence);

  sequence.map(item => {
    lightColor(time,item); 
     time = time+600
  })
  setTurn(true)
  setTitle("PULSA LA SECUENCIA QUE ACABAS DE VER")
  
}
      
  const lightColor = (time,item) => {

     setTimeout(() => {  
        item===1? (setRedState(false), SoundPlayer.playSoundFile('re', 'mp3'),socket.emit('simonRed')):null
        item===2? (setGreenState(false), SoundPlayer.playSoundFile('mi', 'mp3'),socket.emit('simonGreen')):null
        item===3? (setYellowState(false), SoundPlayer.playSoundFile('si', 'mp3'),socket.emit('simonYellow')):null
        item===4? (setBlueState(false), SoundPlayer.playSoundFile('sol', 'mp3'),socket.emit('simonBlue')):null     
      }, time); 
      setTimeout(() => {   
        item===1? setRedState(true):null
        item===2? setGreenState(true):null
        item===3? setYellowState(true):null
        item===4? setBlueState(true):null 
      },time+400);   
  }

getUserData = async () => {
    try {
      userActiveData = (await AsyncStorage.getItem('userData')) || 'none';
    } catch (error) {
      // Error retrieving data
      userActiveData = null;
    }
    setData(JSON.parse(userActiveData));
  };
  
  useEffect(() => {
    Orientation.lockToPortrait();
    getUserData();
      
    console.log(props.route.params.email)
  }, []);

  return (

      <View style={styles.mainContainer}>
        <View style={styles.loginData}>
            <ImageBackground
                source={require('../helpers/images/lluvia.jpeg')}
                imageStyle={{resizeMode: 'stretch'}}
                style={styles.loginContainer}
            >
            <Image
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: props.route.params.photo}}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
                {props.route.params.name}
            </Text>
            </ImageBackground>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.level}>
            <Text style={{fontSize:30}}>LEVEL {level}</Text>

          </View>
            <View style={styles.simonFirstContainer}>
                <TouchableOpacity  style={{
                  backgroundColor: redState? 'red':'black',
                  width: 150,
                  height: 150,
                  borderRightWidth:5,
                  borderBottomWidth:5,
                  borderTopLeftRadius: 150}}
                  onPress={() => turn?(sequencePlay.push(1),SoundPlayer.playSoundFile('re', 'mp3'),
                  socket.emit('simonRed'),sequenceComprobate(sequence,sequencePlay)):socket.emit('simonRed')}/>

                <TouchableOpacity
                  style={{
                  backgroundColor:greenState? 'green':'black',
                  width: 150,
                  height: 150,
                  borderLeftWidth:5,
                  borderBottomWidth:5,
                  borderTopRightRadius: 150}}
                  onPress={() => turn? (sequencePlay.push(2),SoundPlayer.playSoundFile('mi', 'mp3'),
                  socket.emit('simonGreen'),sequenceComprobate(sequence,sequencePlay)):socket.emit('simonGreen')}/>    
            </View>
            <View style={styles.simonSecondContainer}>
                <TouchableOpacity  
                  style={{
                   backgroundColor:yellowState? 'yellow':'black',
                   width: 150,
                   height: 150,
                   borderTopWidth:5,
                   borderRightWidth:5,
                   borderBottomLeftRadius: 150}}
                   onPress={() => turn? (sequencePlay.push(3),SoundPlayer.playSoundFile('si', 'mp3'),
                  socket.emit('simonYellow'),sequenceComprobate(sequence,sequencePlay)):socket.emit('simonYellow')}/>
                
                <TouchableOpacity 
                  style={{
                   backgroundColor:blueState? 'blue':'black',
                   width: 150,
                   height: 150,
                   borderTopWidth:5,
                   borderLeftWidth:5,
                   borderBottomRightRadius: 150}}
                   onPress={() => turn? (sequencePlay.push(4),SoundPlayer.playSoundFile('sol', 'mp3'),
                   socket.emit('simonBlue'),sequenceComprobate(sequence,sequencePlay)):socket.emit('simonBlue') }/>      
            </View>
        </View >
        <View  style={styles.okButton}>
          {turn? null:
        <Button
            style={styles.button}
            title={title}
            color="#841584"
            onPress={() => turn? Alert.alert("Pulsa la secuencia que has visto en los botones") : secuencia(sequence)}
        />}
      
        </View>       
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: 0,
    height: '100%',
    },
  button: {
    flex:0.5,
    borderWidth: 4,
    borderColor: 'black',
  },
  level: {
    width: 150,
    height: 50,
    borderColor: 'black',
    backgroundColor:'white',
    alignContent:'center',
    alignItems:'center'
  },
  okButton: {
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth:5,
    marginBottom: 50
  },
  loginData: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  loginContainer: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  contentContainer: {
    alignContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  simonFirstContainer: {
    flexDirection: 'row', 
    flex: 1,
    alignItems: 'flex-end'
  },
  simonSecondContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    flexDirection: 'row',
    width: 90,
    height: 85,
    //borderWidth: 6,
    borderColor: 'black',
  },
});

export default Simon;