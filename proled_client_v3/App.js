
import React, {useReducer} from 'react';
import { Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppContext from './app/components/Context'
import HomeScreen from './app/components/HomeScreen'
import BoardScreen from './app/components/BoardScreen'

const  RootStack = createStackNavigator(
  {
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          title:'Hola Karlos',
        }),
    },
    Board: {
        screen: BoardScreen,
        navigationOptions: ({ navigation }) => ({
          title:'Volver',
        }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'rgb(47, 54, 61)',
        shadowOpacity: 0
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        textAlign: 'center'        
      }     
    }, 
  }
)

const AppContainer = createAppContainer(RootStack);

const App = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {                            
        case 'changeJugador':
          return {
            ...state,
            jugador: action.newValue
        };                        
      default:
        return state;
    }
  }; 
  
  let contextInitial = {
    jugador: 1
  }
  
  const [state, dispatch] = useReducer(reducer, contextInitial)
  
  return (
    <AppContext.Provider value={[state, dispatch]}>
      <AppContainer />
      {props.children} 
    </AppContext.Provider>
  )
}
module.exports = App;