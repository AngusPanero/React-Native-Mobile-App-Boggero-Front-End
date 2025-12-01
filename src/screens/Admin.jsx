import { useEffect, useState } from "react"
import { Text, Button, Pressable, ImageBackground, Image, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import axios from "axios"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CreateCard from "../components/CreateCrad"
import * as ImagePicker from "expo-image-picker";

const Admin = ({ navigation }) => {
    const insets = useSafeAreaInsets()

    const [ fetchHouses, setFetchHouses ] = useState([])
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ create, setCreate ] = useState(false)
    const [ update, setUpdate ] = useState(false)

    const [houses, setHouses] = useState({
        title: "",
        direction: "",
        ubication: "",
        operation: "",  
        price: "",
        typeOfHouse: "",
        description: "",
        condition: "",
        ambients: "",
        bathrooms: "",
        years: "",
        taxes: "",
        covered: "",
        uncovered: "",
        area: "",
        maps: "",
        imageUrl: [],
    });

    const handleSetValues = (field, value) => {
        setHouses((prev) => ({ ...prev, [field]: value, }));
    };

    /* ACCESO IMAGENES */
    const pickImages = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permiso requerido para acceder a imágenes");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],       
            allowsMultipleSelection: true,
            quality: 0.8,
        });
        if (!result.canceled) {
            const newImages = result.assets.map(img => img.uri);
            if (houses.imageUrl.length + newImages.length > 25) {
                alert("Solo podés subir hasta 25 imágenes");
                return;
            }
            setHouses(prev => ({
                ...prev,
                imageUrl: [...prev.imageUrl, ...newImages],
            }));
        }
    };

      /* REMOVE IMAGE */
    const handleRemoveImage = (index) => {
        setHouses(prev => ({ ...prev, imageUrl: prev.imageUrl.filter((_, i) => i !== index)}));
    };

    /* CLOUDINARY */
    const uploadImagesToCloudinary = async (images) => {
        const urls = [];

        for (const uri of images) {
        const formData = new FormData();
        formData.append("file", {
            uri,
            type: "image/jpeg",
            name: "upload.jpg",
        });
        formData.append("upload_preset", "Boggero");

        const res = await axios.post( `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
            formData,
                { headers: { 
                    "Content-Type": "multipart/form-data" 
                }
            }
        );
        urls.push(res.data.secure_url);
        }
        return urls;
    };

    const handleSubmit = async () => {
        try {
          // Cloudinary
            const uploadedUrls = await uploadImagesToCloudinary(houses.imageUrl);
          // 2. Form
            const finalData = { ...houses, imageUrl: uploadedUrls };
            console.log("Data final:", finalData);
            
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/createhouse`, finalData);

          // 4. Reset
        setHouses({
            title: "",
            direction: "",
            ubication: "",
            operation: "",
            price: "",
            typeOfHouse: "",
            description: "",
            condition: "",
            ambients: "",
            bathrooms: "",
            years: "",
            taxes: "",
            covered: "",
            uncovered: "",
            area: "",
            maps: "",
            imageUrl: [],
        });

        alert("Propiedad creada correctamente ✅");

        } catch (error) {
            console.error("Error creando propiedad 🔴", error.message);
            alert("Error al crear propiedad");
        }
    };

    useEffect(() => {
        const handleFetch = async () => {
            try {
                setLoading(true)

                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/houses`)
                if(response.status === 200){
                    setFetchHouses(response.data)
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

            <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
                
                {/* CREATE CARD  */}
                    {create ? 
                    (<CreateCard pickImages={pickImages} handleSubmit={handleSubmit} deleteImages={handleRemoveImage} handleSetValues={handleSetValues} closeModal={() => setCreate(false)} houses={houses} style={styles.modalCard} />) : 
                    (<View style={styles.logoWrapper}>
                    <Image style={styles.logo} source={require("../../assets/boggero.png")} />


                    {/* CREAR */}
                    <Pressable style={styles.buttonBase} onPress={() => setCreate(true)} >
                        <Text style={styles.buttonText}>Crear</Text>
                    </Pressable>


                    {/* ACTUALIZAR */}
                    <Pressable style={styles.buttonBase}>
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </Pressable>
                </View>)
            }
            </SafeAreaView>
            
            <Footer/>  
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

    /*  LOGO Y BOTONES  */
    logoWrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        zIndex: 1,
    },

    logo: {
        width: 280,
        height: 150,
        resizeMode: "contain",
    },

    /*  CAPA DEL CONTENIDO  */
    safeArea: {
        flex: 1,
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

    buttonText: {
        textAlign: "center",
        width: "100%",
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 1,
        textTransform: "uppercase",
    },
});

export default Admin