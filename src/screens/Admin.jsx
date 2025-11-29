import { useEffect, useState } from "react"
import { Text, Button, StyleSheet, View, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import Footer from "../components/Footer"
import NavMenu from "../components/NavMenu"

const Admin = ({ navigation }) => {
    const [ houses, setHouses ] = useState([])
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

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
        <View style={styles.root}>
            <NavMenu />
            <ImageBackground style={styles.background} source={require("../../assets/cocina-minimalista-2.avif")} resizeMode="cover" />
            <Button title="Login" onPress={() => navigation.navigate("Login")} />
            <Footer/>    
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#000",
        position: "relative"
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0
    }
})

export default Admin