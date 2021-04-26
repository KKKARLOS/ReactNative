import React, { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  ActivityIndicator,
  Button
} from "react-native";
import { getBoard } from "../helpers/functions";
import SocketContext from "../helpers/context";

const BoardScreen = props => {
  const socket = useContext(SocketContext);
  const [coupleCompleted, setCoupleCompleted] = useState(false);

  //escucha fin de partida
  socket.on("gotomain", data => {
    console.log("Game finished, navigate to Main");
    ToastAndroid.show("Game finished, navigate to Main", ToastAndroid.SHORT);
    props.navigation.navigate("Main");
  });

  //escucha pareja completada e inicio de juego
  socket.on("roomCompleted", data => {
    setCoupleCompleted(data.completed);
  });

  gestionarLoading = estado => {
    setCoupleCompleted(!estado);
  };

  let output = [];

  output = getBoard(9);

  if (!coupleCompleted) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00000040"
        }}
      >
        <View
          style={{ flex: 0.9, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.boxActivity}>
            <Text>Esperando jugador....</Text>
            <ActivityIndicator
              style={{ paddingLeft: 30 }}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
        <Button
          title="Loading"
          onPress={() => gestionarLoading(coupleCompleted)}
        />
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.head}>
          <Image source={require("../helpers/images/calaveras.png")}></Image>
        </View>
        <View style={styles.container}>{output}</View>
      </View>
    );
  }
};

export default BoardScreen;

const styles = StyleSheet.create({
  head: {
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    flexDirection: "row",
    backgroundColor: "green",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
