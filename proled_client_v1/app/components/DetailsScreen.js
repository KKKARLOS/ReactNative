import React, { Component }  from 'react';
import { Button, View, Text } from 'react-native';

export default class DetailsScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{flex:0.1,marginBottom:50,fontSize:30,fontWeight:"bold"}}>Pantalla 1</Text>
          <View style={{flex:0.9,width:"60%"}}>
            <View style={{flex:0.3}}>
                <Button
                    title="Ir a Pantalla 2"
                    onPress={() => this.props.navigation.navigate('Details2')}
                />               
            </View>
            <View style={{flex:0.3}}>
                <Button
                    title="IR AL INICIO"
                    style={{flex:0.3}}
                    margin="30"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
            <View style={{flex:0.3}}>
                <Button
                    title="IR PANTALLA ANTERIOR "
                    style={{flex:0.3}}
                    onPress={() => this.props.navigation.goBack()}
                /> 
            </View>
          </View>       
        </View>
      );
    }
  }