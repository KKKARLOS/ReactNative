import React, { Component } from 'react';

import axios from 'axios';
import { FAKE_STATES } from '../data/data';
import { Text,FlatList,ActivityIndicator,StyleSheet,View,Icon,Image } from 'react-native';
import ListStates from './ListStates';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F5FCFF'
  }, 
  recientesContainer: {
    flexDirection: "row",
    padding: 3,    
    height: 45,
    backgroundColor: "#e2e5e2",
    borderRadius:3
  },
  recientes: {
    fontFamily: "Arial",
    fontSize: 16,
    padding: 10,
    fontWeight: "bold",
    color: "green"
  },  
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  avatarContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  chatDetailsContainer: {
    flex: 4,
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  chatDetailsContainerWrap: {
    flex: 1,
    flexDirection: "row",
    padding: 5
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent : "space-between",
    alignItems: "flex-end"
  },
  msgContainer: {
    flex: 1
  },
  nameText: {
    fontWeight: "bold",
    color: "#000"
  },
  dateText: {
    fontSize: 12
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60
  }
 });

export default class States extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      statesList : [],
      loaded: false
    } 
  }
  componentDidMount() {
    axios.get(FAKE_STATES)
      .then((response) => {
        this.setState({
          statesList: response.data,
          loaded: true
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {  
    if(this.state.loaded) {
      return(
        <View style={styles.mainContainer}>
          <View style={{height:80}}>
            <ListStates 
                first_name="Avatar"
                image="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png"
                date="2-Mar-2017"
                time="{5:46 PM"
              />   
          </View>   
          <View style={styles.recientesContainer}>
              <Text style={styles.recientes}>Recientes</Text>
          </View>     
          <View>         
            <FlatList
              data={this.state.statesList}
              renderItem={({item}) => (
                <ListStates
                  first_name={item.first_name}
                  message={item.message}
                  image={item.image}
                  date={item.date}
                  time={item.time}
                />
              )}
            />          
          </View>       
      </View>             
      )
    } else {
      return(
        <ActivityIndicator size="large" />
      )
    }    
  }
}