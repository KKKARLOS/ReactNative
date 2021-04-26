//import React, { Component, useState }  from 'react';
import React, { createContext, useContext, useReducer, useRef} from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './app/components/HomeScreen'
import Hola from './app/components/Hola'
import AppContext from './app/components/context'
import TableroScreen from './app/components/TableroScreen'
//import DetailsScreen from './app/components/DetailsScreen'
//import DetailsScreen2 from './app/components/DetailsScreen2'
const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title:'Hola Karlos',
      }),
    },
    Tablero: {
      screen: TableroScreen,
      navigationOptions: ({ navigation }) => ({
        title:'Volver',
      }),
    },
    /*Details: DetailsScreen,
    Details2: DetailsScreen2,*/
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
     // title: "Retroceder",
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
      },
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="red"
        />
      ),          
    }, 
  }
)
//const Tabs = createBottomTabNavigator({ Home });
const AppContainer = createAppContainer(RootStack);

const App = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
        case 'changeIsClickable_1_1':
          return {
            ...state,
            isClickable_1_1: action.newValue
          };
        case 'changeImagen_1_1':
          return {
            ...state,
            imagen_1_1: action.newValue
        };   
        case 'changeCelda11':
          console.log(action.newValue)
          return {
            ...state,
            celda11: action.newValue
          };   
        case 'changeIsClickable_1_2':
          return {
            ...state,
            isClickable_1_2: action.newValue
          };
        case 'changeImagen_1_2':
          return {
            ...state,
            imagen_1_2: action.newValue
        };   
        case 'changeCelda12':
          return {
            ...state,
            celda12: action.newValue
        };  
        case 'changeIsClickable_1_3':
          return {
            ...state,
            isClickable_1_3: action.newValue
          };
        case 'changeImagen_1_3':
          return {
            ...state,
            imagen_1_3: action.newValue
        };   
        case 'changeCelda13':
          return {
            ...state,
            celda13: action.newValue
        };   
        case 'changeIsClickable_2_1':
          return {
            ...state,
            isClickable_2_1: action.newValue
          };
        case 'changeImagen_2_1':
          return {
            ...state,
            imagen_2_1: action.newValue
        };   
        case 'changeCelda21':
          return {
            ...state,
            celda21: action.newValue
        };    
        case 'changeIsClickable_2_2':
          return {
            ...state,
            isClickable_2_2: action.newValue
          };
        case 'changeImagen_2_2':
          return {
            ...state,
            imagen_2_2: action.newValue
        };   
        case 'changeCelda22':
          return {
            ...state,
            celda22: action.newValue
        };  
        case 'changeIsClickable_2_3':
          return {
            ...state,
            isClickable_2_3: action.newValue
          };
        case 'changeImagen_2_3':
          return {
            ...state,
            imagen_2_3: action.newValue
        };   
        case 'changeCelda23':
          return {
            ...state,
            celda23: action.newValue
        }; 
        case 'changeIsClickable_3_1':
          return {
            ...state,
            isClickable_3_1: action.newValue
          };
        case 'changeImagen_3_1':
          return {
            ...state,
            imagen_3_1: action.newValue
        };   
        case 'changeCelda31':
          return {
            ...state,
            celda31: action.newValue
        };    
        case 'changeIsClickable_3_2':
          return {
            ...state,
            isClickable_3_2: action.newValue
          };
        case 'changeImagen_3_2':
          return {
            ...state,
            imagen_3_2: action.newValue
        };   
        case 'changeCelda32':
          return {
            ...state,
            celda32: action.newValue
        };  
        case 'changeIsClickable_3_3':
          return {
            ...state,
            isClickable_3_3: action.newValue
          };
        case 'changeImagen_3_3':
          return {
            ...state,
            imagen_3_3: action.newValue
        };   
        case 'changeCelda33':
          return {
            ...state,
            celda33: action.newValue
        };                              
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
    isClickable_1_1: true,  
    imagen_1_1: null,
    celda11: null, 
    isClickable_1_2: true,  
    imagen_1_2: null,
    celda12: null,   
    isClickable_1_3: true,  
    imagen_1_3: null,
    celda13: null, 
    isClickable_2_1: true,  
    imagen_2_1: null,
    celda21: null, 
    isClickable_2_2: true,  
    imagen_2_2: null,
    celda22: null,   
    isClickable_2_3: true,  
    imagen_2_3: null,
    celda23: null,   
    isClickable_3_1: true,  
    imagen_3_1: null,
    celda31: null, 
    isClickable_3_2: true,  
    imagen_3_2: null,
    celda32: null,   
    isClickable_3_3: true,  
    imagen_3_3: null,
    celda33: null, 
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