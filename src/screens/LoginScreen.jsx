import { View, ImageBackground, StyleSheet, Image, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [ isAdmin, setIsAdmin ] = useState(false)
  const [ password, setPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ error, setError ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredentials.getIdToken()

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {idToken})
      if(response.status === 200){
        navigation.replace("Admin")
      }
    } catch (error) {
        setError(true)
        console.error( `Error al Iniciar Sesion! 🔴`);
        alert(
          error.response?.data?.message || "Credenciales incorrectas"
        );
    } finally {
        setLoading(false)
        setError(false)
    }
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={require("../../assets/cocina-minimalista-2.avif")} style={styles.background} resizeMode="cover" /> 

      <SafeAreaView style={styles.safeArea}>
        <Image style={styles.logo} source={require("../../assets/boggero.png")} />

        <Pressable style={({ pressed }) => [ styles.buttonBase, pressed && styles.buttonPressed ]} onPress={() => navigation.replace("Home")} >
          <Text style={styles.buttonText}>Administrador</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [ styles.buttonBase, pressed && styles.buttonPressed ]} onPress={() => navigation.replace("Houses")} >
          <Text style={styles.buttonText}>Cliente</Text>
        </Pressable>

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
    width: 300,
    height: 165,
    resizeMode: "contain",
  },

  buttonBase: {
    width: 200,
    height: 36,
    borderRadius: 14,
  
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
  
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,

    shadowColor: "#000",
    shadowOpacity: 0.58,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  
  buttonText: {
    color: "#fff",  
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },
});