import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './app/components/HomeScreen'
import TableroScreen from './app/components/TableroScreen'
//import DetailsScreen from './app/components/DetailsScreen'
//import DetailsScreen2 from './app/components/DetailsScreen2'
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Tablero: TableroScreen
    /*Details: DetailsScreen,
    Details2: DetailsScreen2,*/
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}