import { View, ImageBackground, Button, StyleSheet, Image, Pressable, Text, TextInput, LayoutAnimation, UIManager, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import axios from "axios";
import Footer from "../components/Footer.jsx";
import Admin from "./Admin.jsx";
import OpenAi from "../components/OpenAi.jsx";

// Activo Para android que por defecto viene desactivado el UIManager
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
      const idToken = await userCredentials.user.getIdToken()

      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, {idToken})
      if(response.status === 200){
        navigation.navigate("Admin")
      }
    } catch (error) {
        setError(true)
        console.error( `Error al Iniciar Sesion! 🔴`);
        alert(
          error.response?.message || "Credenciales incorrectas"
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

        <Button title="Admin Test" onPress={() => navigation.navigate("Admin")} />

        <Pressable onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setIsAdmin(false) }}>
          <Image style={styles.logo} source={require("../../assets/boggero.png")} />
        </Pressable>

        <Text style={styles.slogan}>Tu nuevo hogar ahora más cerca de tus manos.</Text>

        {!isAdmin && (
          <>
            {/* BOTÓN ADMIN */}
            <Pressable style={styles.buttonBase} onPress={() => {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setIsAdmin(true)}}>
              <Text style={styles.buttonText}>Administrador</Text>
            </Pressable>

            {/* BOTÓN CLIENTE */}
            <Pressable style={styles.buttonBase} onPress={() => navigation.replace("Houses")}>
              <Text style={styles.buttonText}>Cliente</Text>
            </Pressable>
          </>
        )}

        {isAdmin && (
          <View style={styles.form}>
            
            <TextInput placeholder="Email" placeholderTextColor="#ddd" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

            <TextInput placeholder="Contraseña" placeholderTextColor="#ddd" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

            {/* BOTÓN ENTRAR */}
            <Pressable style={styles.buttonBase} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}> {loading ? "Ingresando..." : "Entrar"} </Text>
            </Pressable>

            <Pressable onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setIsAdmin(false) }}>
            <Text style={styles.access}>Acceso único para administradores.</Text>
              <Text style={styles.backText}>← Volver</Text>
            </Pressable>
          </View>
        )}
        <OpenAi />
      </SafeAreaView>
      <Footer />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative"
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex:0
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
    marginBottom:15
  },

  buttonBase: {
    width: "100%",
    maxWidth: 260,
    height: 36,
    borderRadius: 14,
  
    backgroundColor: "rgba(255,255,255,0.65)",
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
  
  slogan: {
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },

  access: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },

  buttonText: {
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    color: "#fff",  
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },

  form: {
    width: 260,
    marginTop: 20,
    marginBottom: 65,
    gap: 14,
  },
  
  input: {
    height: 46,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  },
  
  backText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8,
  },
});