import React, {useState, useEffect, useContext} from 'react';
import {View, ImageBackground, StyleSheet, Alert, Image} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigation from '../components/RootNavigation';

export const _getUserActive = async () => {
  configureGoogleSign();
  try {
    userActiveData = (await AsyncStorage.getItem('userData')) || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

  if (userActiveData !== 'none')
    //LINEAS EQUIVALENTES, pero utilizamos la perteneciente a la version 5 de react-navigation,
    
    RootNavigation.navigate('Main', {userData: userActiveData});
    //props.navigation.navigate('Main', {userData: userActiveData});
  else configureGoogleSign();
};

function configureGoogleSign() {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId:
      '722236199863-8t1v1cu9t45d85m2kotqgijcecbkvtkn.apps.googleusercontent.com',
    offlineAccess: false,
  });
}

export async function _signIn() {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();

    _saveUserInfoAsyncStorage(userInfo);
    _getUserActive();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // when user cancels sign in process,
      Alert.alert('Process Cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // when in progress already
      Alert.alert('Process in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // when play services not available
      Alert.alert('Play services are not available');
    } else {
      // some other error
      Alert.alert('Something else went wrong... ', error.toString());
      //setError(error)
    }
  }
}

export async function _signOut() {
  //Remove user session from the device.
  try {
    await GoogleSignin.signOut();
    //setIsSigned(false);
    _deleteUserId();
  } catch (error) {
    console.error(error);
  }
  RootNavigation.navigate('Login');
}

export async function _deleteUserId() {
  try {
    await AsyncStorage.removeItem('userData');
    //setData(false)
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
    alert('error borrado de asyncStorage');
  }
}
export async function _saveUserInfoAsyncStorage(userInfo) {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userInfo.user));
  } catch (error) {
    // Error retrieving data
    Alert.alert(error.message);
  }
}
