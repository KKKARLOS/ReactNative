import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Picker,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import Moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
//import * as RootNavigation from './RootNavigation';

const PerfilScreen = props => {
  let [Perfil, setPerfil] = useState({
    nickname: null,
    country: null,
    birthday: null,
    phone: null,
    _id: '',
    email: '',
    photo: null,
    name: '',
    isLoadingPlayer: true,
  });

  let [Countries, setCountries] = useState({
    countries: [{_id: '', name: ''}],
    isLoadingCountries: true,
  });

  const fetchUserData = async () => {
    try {
      userActiveData = (await AsyncStorage.getItem('userData')) || 'none';
    } catch (error) {
      // Error retrieving data
      userActiveData = null;
    }
    var data = JSON.parse(userActiveData);
    //alert(data.email);
    setTimeout(() => {
      fetchDataPlayer(data.email), 1000;
    });
  };

  useEffect(() => {
    fetchDataCountries();
    fetchUserData();

    // returned function will be called on component unmount
    return () => {};
  }, []);

  const fetchDataCountries = () => {
    var baseURL = 'https://proled-test.herokuapp.com/countries';
    axios
      .get(baseURL)
      .then(response => {
        //alert(JSON.stringify(response));
        var countries = response.data;
        //alert(JSON.stringify(countries));
        setCountries(
          {...countries},
          {isLoadingCountries: !Countries.isLoadingCountries},
        );
      })
      .catch(function(error) {
        setCountries({isLoadingCountries: !Countries.isLoadingCountries});
        alert(error);
        console.log(error);
      });
    /*
    fetch(baseURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.message) {
          setCountries({isLoadingCountries: !Countries.isLoadingCountries});
          alert(responseData.message);
        } else {
          //alert(JSON.stringify(responseData.countries));
          setCountries(...responseData.countries, {
            isLoadingCountries: !Countries.isLoadingCountries,
          });
          //alert(JSON.stringify(responseData.player));
        }
      })
      .done();*/
  };
  const fetchDataPlayer = email => {
    var baseURL = 'https://proled-test.herokuapp.com/player/email/' + email;
    axios
      .get(baseURL)
      .then(response => {
        //alert(JSON.stringify(response));
        var data = response.data;
        //alert(JSON.stringify(player));
        //alert(JSON.stringify(data.player.phone));
        data.player.phone = data.player.phone.toString();
        data.player.birthday =
          data.player.birthday === null
            ? Moment(Date.now()).format('DD-MM-YYYY hh:mm:ss')
            : Moment(data.player.birthday).format('DD-MM-YYYY hh:mm:ss');
        setPerfil({...data.player}, {isLoadingPlayer: !Perfil.isLoadingPlayer});
      })
      .catch(function(error) {
        setPerfil({isLoadingPlayer: !Perfil.isLoadingPlayer});
        alert(error);
        console.log(error);
      });
  };

  const writeRegister = () => {
    const playerObject = {
      nickname: Perfil.nickname,
      country: Perfil.country,
      birthday: Moment(Perfil.birthday, 'DD-MM-YYYY  hh:mm:ss').format(
        'YYYY-MM-DD  hh:mm:ss',
      ),
      phone: Perfil.phone, //.toString(),
    };

    // alert(JSON.stringify(playerObject));
    var baseURL = 'https://proled-test.herokuapp.com/player/' + Perfil._id;
    //alert(baseURL);

    const config = {headers: {'Content-Type': 'application/json'}};
    axios
      .put(baseURL, JSON.stringify(playerObject), config)
      .then(r => alert('Datos modificados correctamente'))
      .catch(e => alert(e));
    // .then(r => console.log(r.status))
    // .catch(e => console.log(e));
  };

  if (Countries.isLoadingCountries && Perfil.isLoadingPlayer) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000040',
        }}>
        <View
          style={{flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.boxActivity}>
            <Text>Cargando datos...</Text>
            <ActivityIndicator
              style={{paddingLeft: 30}}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
      </View>
    );
  } else
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.userContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 30, marginBottom: 10}}>
              Mi Perfil
            </Text>
            <Image
              style={styles.userImagen}
              source={{
                /*  uri:
              'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',*/
                uri: Perfil.photo,
              }}
            />
          </View>
          <View style={styles.formulario}>
            <Text style={styles.lblTexto}>Nombre</Text>
            <TextInput
              style={styles.txtInput}
              editable={false}
              value={Perfil.name}
            />

            <Text style={styles.lblTexto}>Email</Text>
            <TextInput
              style={styles.txtInput}
              editable={false}
              value={Perfil.email}
            />

            <Text style={styles.lblTexto}>Nickname</Text>
            <TextInput
              style={styles.txtInput}
              editable={true}
              placeholder="Introduzca el nickname"
              onChangeText={text => setPerfil({...Perfil, nickname: text})}
              value={Perfil.nickname}
            />
            <Text style={styles.lblTexto}>País</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.picker}
                itemStyle={styles.items}
                selectedValue={Perfil.country}
                onValueChange={country => {
                  setPerfil({...Perfil, country: country});
                }}>
                {Countries.countries.map((l, i) => {
                  return (
                    <Picker.Item value={l.name} label={l.name} key={l._id} />
                  );
                })}
              </Picker>
            </View>
            <Text style={styles.lblTexto}>Fecha de nacimiento</Text>
            <DatePicker
              style={{width: '100%', height: 30}}
              //date={Moment(Perfil.birthday).format('DD-MM-YYYY')}
              date={Perfil.birthday}
              mode="date"
              placeholder="Introduzca la fecha de nacimiento"
              format="DD-MM-YYYY hh:mm:ss"
              /*minDate="2016-05-01"
            maxDate="2016-06-01"*/
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  height: 30,
                },
                dateInput: {
                  marginLeft: 36,
                  height: 30,
                  width: '100%',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => setPerfil({...Perfil, birthday: date})}
            />

            <Text style={styles.lblTexto}>Número de teléfono</Text>
            <TextInput
              style={styles.txtInput}
              editable={true}
              keyboardType={'numeric'}
              //placeholder="Introduzca el número de teléfono"
              onChangeText={text =>
                setPerfil({...Perfil, phone: text.toString()})
              }
              value={Perfil.phone}
            />
          </View>
          <View style={styles.botones}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: 90,
                height: 50,
                backgroundColor: 'red',
                padding: 10,
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => writeRegister()}>
              <Text style={{color: '#fff', fontSize: 20}}>Grabar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: 90,
                height: 50,
                backgroundColor: 'green',
                padding: 10,
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => props.navigation.toggleDrawer()}>
              <Text style={{color: '#fff', fontSize: 20}}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingLeft: 30,
    paddingRight: 15,
  },

  userImagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  formulario: {
    width: '70%',
    marginLeft: '15%',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  lblTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 7,
  },
  txtInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
  },
  picker: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingTop: 0,
    marginTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    height: 35,
  },
  items: {
    color: 'gray',
  },
  boxActivity: {
    width: 300,
    height: 90,
    borderWidth: 3,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PerfilScreen;
