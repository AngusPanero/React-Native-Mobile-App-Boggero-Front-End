import { useEffect, useState } from "react"
import { Text, Button, ImageBackground, Image, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CreateCard from "../components/CreateCrad"

const Admin = ({ navigation }) => {
    const [ houses, setHouses ] = useState([])
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ create, setCreate ] = useState(false)
    const [ update, setUpdate ] = useState(false)

    useEffect(() => {
        const handleFetch = async () => {
            try {
                setLoading(true)

                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/houses`)
                if(response.status === 200){
                    setHouses(response.data)
                }
                console.log(response.data);
                
                } catch (error) {
                    setError(true)
                    setHouses([])
                    console.error( `Error al Obtener Casas! 🔴`);
                    alert(
                        error.response?.message || "Internal Server Error"
                    );
                } finally {
                    setLoading(false)
                    setError(false)
                }
        }
        handleFetch()
    }, [])

    return(
        <>
        <Header style={{ position: "absolute", top: 0, zIndex: 2, width: "100%" }} title={"Inicio"} onBack={() => navigation.navigate("Login")} />
        <View style={styles.root}>
            <ImageBackground style={styles.background} source={require("../../assets/cocina-minimalista-2.avif")} resizeMode="cover" />
            
            <View style={styles.logoWrapper}>
                <Image style={styles.logo} source={require("../../assets/boggero.png")} />
                {!create && (
                    {/* BOTÓN CREAR */}
                    <Pressable style={styles.buttonBase} onPress={() => setIsAdmin(true)}>
                        <Text style={styles.buttonText}>Crear</Text>
                    </Pressable>

                    {/* BOTÓN UPDATE */}
                    <Pressable style={styles.buttonBase}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </Pressable>
                )}
            </View>

            <SafeAreaView style={styles.safeArea}>
                {create && <CreateCard houses={houses} style={styles.modalCard} />}
                <Footer/>    
            </SafeAreaView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#000",
        position: "relative",
    },

    /*  FONDO  */
    background: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },

    /*  LOGO CENTRADO DE FONDO  */
    logoWrapper: {
        position: "absolute",
        inset: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },

    logo: {
        width: 280,
        height: 150,
        resizeMode: "contain",
    },

    /*  CAPA DEL FORM  */
    safeArea: {
        flex: 1,
        zIndex: 3,
    },

    /*  HEADER  */
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 20,
    },

    /*  BUTTONS  */
    buttonBase: {
        width: "100%",
        maxWidth: 260,
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
});

export default Admin