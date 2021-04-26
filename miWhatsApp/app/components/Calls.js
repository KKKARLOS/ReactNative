import React, { Component } from 'react';

import axios from 'axios';
import { FAKE_CALLS } from '../data/data';
import { Text,FlatList,ActivityIndicator } from 'react-native';
import ListCalls from './ListCalls';

export default class Calls extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      callList : [],
      loaded: false
    } 
  }
  componentDidMount() {
    axios.get(FAKE_CALLS)
      .then((response) => {
        this.setState({
          callList: response.data,
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
        <FlatList
          data={this.state.callList}
          renderItem={({item}) => (
            <ListCalls
              first_name={item.first_name}
              video_call={item.video_call}
              missed={item.missed}
              image={item.image}
              date={item.date}
              time={item.time}
            />
          )}
        />
      )
    } else {
      return(
        <ActivityIndicator size="large" />
      )
    }    
  }
}