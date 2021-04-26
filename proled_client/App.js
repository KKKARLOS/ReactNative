import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './src/components/Login';
import MainScreen from './src/components/Main';
import BoardScreen from './src/components/Board';
import SimonScreen from './src/components/Simon';

import PerfilScreen from './src/components/PerfilScreen';
import RankingScreen from './src/components/RankingScreen';
import HistorialScreen from './src/components/HistorialScreen';

import {navigationRef} from './src/components/RootNavigation';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import * as loginFunctions from './src/helpers/loginFunctions';
import * as RootNavigation from './src/components/RootNavigation';

function DrawerMenu(props) {
  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={styles.menuContainer}>
        <View style={styles.iconoContainer}>
          <Icon size={17} name={props.iconName} />
        </View>
        <View style={styles.tituloContainer}>
          <Text style={styles.tituloTxt}>{props.titleName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Menu(props) {
  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}>
        <TouchableOpacity>
          <View style={styles.userContainer}>
            <Image
              style={styles.userImagen}
              source={require('./src/helpers/images/fondoled.jpeg')}
            />
          </View>
          <View style={styles.userNombre}>
            <Text style={styles.userTitulo}>PROLED</Text>
          </View>
        </TouchableOpacity>
      </View>

      <DrawerMenu
        iconName="address-card"
        titleName="Perfil"
        navigation={() => RootNavigation.navigate('Perfil')}
      />
      <DrawerMenu
        iconName="chart-bar"
        titleName="Ranking"
        navigation={() => RootNavigation.navigate('Ranking')}
      />
      <DrawerMenu
        iconName="history"
        titleName="Historial"
        navigation={() => RootNavigation.navigate('Historial')}
      />
      <DrawerMenu
        iconName="gamepad"
        titleName="Juegos"
        navigation={() => RootNavigation.navigate('Main')}
      />
      <DrawerMenu
        iconName="sign-out-alt"
        titleName="Logut"
        navigation={() => loginFunctions._signOut()}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MainMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="MainScreen"
      drawerContent={props => <Menu {...props} />}>
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Ranking" component={RankingScreen} />
      <Drawer.Screen name="Historial" component={HistorialScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainMenu} />
      <Stack.Screen name="Board" component={BoardScreen} />
      <Stack.Screen name="Simon" component={SimonScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  bgContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#A0A0A0',
  },

  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  userImagen: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  userNombre: {
    marginVertical: 10,
  },

  userTitulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginVertical: 15,
  },

  iconoContainer: {
    flex: 1.5,
    justifyContent: 'center',
  },

  tituloContainer: {
    flex: 8.5,
    justifyContent: 'center',
  },

  tituloTxt: {
    fontSize: 13,
  },
});
