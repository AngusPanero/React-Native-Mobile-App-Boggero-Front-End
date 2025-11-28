import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../../assets/cocina-minimalista-2.avif")}
        style={styles.background}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safeArea}>
        <Image
          style={styles.logo}
          source={require("../../assets/boggero.png")}
        />
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  safeArea: {
    flex: 1,
    justifyContent: "center",  
    alignItems: "center",       
  },

  logo: {
    width: 280,
    height: 200,
    resizeMode: "contain",
  },
});