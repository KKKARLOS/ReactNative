import React, {useState, useEffect, useContext} from 'react';
import {View, ImageBackground, StyleSheet, Alert, Image} from 'react-native';
import {GoogleSigninButton} from 'react-native-google-signin';
import * as loginFunctions from '../helpers/loginFunctions';

const LoginScreen = props => {
  useEffect(() => {
    console.disableYellowBox = true;
    loginFunctions._getUserActive();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerContainer}
          imageStyle={{resizeMode: 'stretch'}}
          source={require('../helpers/images/proled.jpeg')}
        />
      </View>
      <View style={styles.signinContainer}>
        <GoogleSigninButton
          //disabled={isSigned}
          style={styles.signInButton}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => loginFunctions._signIn()}
        />
      </View>
      <ImageBackground
        source={require('../helpers/images/fondoled.jpeg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2193b0',
    marginTop: 0,
    height: '100%',
  },
  headerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: '#075e54',
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default LoginScreen;
