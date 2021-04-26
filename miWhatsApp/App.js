/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Chats from './app/components/Chats'
import States from './app/components/States'
import Calls from './app/components/Calls'
import ActionButton from 'react-native-action-button';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0
    } 
  }

  setStateForTabChange = (i) => {
    //console.warn(i)
    this.setState({
      tabIndex: i
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeaderContainer}>
            <Text style={styles.logo}>WhatsApp</Text>
          </View>
          <View style={styles.rightHeaderContainer}>
            <Icon name="search" color="#fff" size={23} style={{padding:5}} />
            <Icon name="more-vert" color="#fff" size={23} style={{padding:5}} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <ScrollableTabView
                tabBarUnderlineIcon="#fff"
                tabBarUnderlineStyle={{backgroundColor: "#fff"}}
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="#ddd"
                tabBarBackgroundColor="#075e54"
                onChangeTab={(event)=>{this.setStateForTabChange(event.i)}}
              >   
                <Chats tabLabel="CHATS" />
                <States tabLabel="ESTADOS" />
                <Calls tabLabel="LLAMADAS" />         
            </ScrollableTabView>      
        </View>
        <ActionButton buttonColor="rgba(43,130,25,1)"
               onPress={() => console.warn(this.state.pestana)}
               renderIcon = {(active) => active ? (<Icon name= "message" style={styles.actionButtonIcon} />) : 
                  <Icon name= {this.state.tabIndex == 0 ? "message" : this.state.tabIndex == 1 ? "photo-camera" : "phone-forwarded"} style={styles.actionButtonIcon} />}>     
        </ActionButton>          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },  
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#075e54",
    alignItems: "center"
  },
  contentContainer: {
    flex: 8
  },
  rightHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  leftHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  logo: {
    color: "#ffffff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold"
  }
 });
 

export default App;