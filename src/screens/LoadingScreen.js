import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Spinner } from "native-base";
import Orientation from "react-native-orientation-locker";
var { height, width } = Dimensions.get("window");

class LoadingScreen extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <LinearGradient
        colors={["#ED4264", "#FFEDBC"]}
        style={styles.linearGradientContainer}
      >
        <Spinner size={height / 5} color="white" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradientContainer: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingScreen;
