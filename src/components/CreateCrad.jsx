import { View, TextInput, Text, Pressable, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const CreateCard = ({ houses, handleSetValues, pickImages, axios }) => {
    return(
        <View>
            <TextInput style={styles.title} placeholder="Título" placeholderTextColor={"#ddd"} value={houses.title} onChangeText={() => handleSetValues} />
            <TextInput style={styles.direction} placeholder="Dirección" placeholderTextColor={"#ddd"} value={houses.direction} onChangeText={() => handleSetValues} />
            <TextInput style={styles.ubication} placeholder="Ubicación" placeholderTextColor={"#ddd"} value={houses.ubication} onChangeText={() => handleSetValues} />

            <Picker selectedValue={houses.operation}>
                <Picker.Item label="-- Operación --" value="" />
                <Picker.Item label="Venta" value="venta" />
                <Picker.Item label="Alquiler" value="alquiler" />
            </Picker>

            <TextInput style={styles.price} placeholder="Precio" placeholderTextColor={"#ddd"} value={houses.price} onChangeText={() => handleSetValues} />
            <TextInput style={styles.typeOfHouse} placeholder="Título" placeholderTextColor={"#ddd"} value={houses.typeOfHouse} onChangeText={() => handleSetValues} />

            <TextInput style={styles.textArea} placeholder="Descripción" value={houses.description} onChangeText={() => handleSetValues} multiline numberOfLines={4} textAlignVertical="top" />    

            <TextInput style={styles.condition} placeholder="Condición" placeholderTextColor={"#ddd"} value={houses.condition} onChangeText={() => handleSetValues} />    
            <TextInput style={styles.ambients} placeholder="Ambientes" placeholderTextColor={"#ddd"} value={houses.ambients} onChangeText={() => handleSetValues} />    
            <TextInput style={styles.bathrooms} placeholder="Baños" placeholderTextColor={"#ddd"} value={houses.bathrooms} onChangeText={() => handleSetValues} />
            <TextInput style={styles.years} placeholder="Años" placeholderTextColor={"#ddd"} value={houses.years} onChangeText={() => handleSetValues} />
            <TextInput style={styles.taxes} placeholder="Expensas" placeholderTextColor={"#ddd"} value={houses.taxes} onChangeText={() => handleSetValues} />
            <TextInput style={styles.covered} placeholder="Metros cubiertos (m²)" placeholderTextColor={"#ddd"} value={houses.covered} onChangeText={() => handleSetValues} />
            <TextInput style={styles.uncovered} placeholder="Metros descubiertos (m²)" placeholderTextColor={"#ddd"} value={houses.uncovered} onChangeText={() => handleSetValues} />                    
            <TextInput style={styles.area} placeholder="Area" placeholderTextColor={"#ddd"} value={houses.area} onChangeText={() => handleSetValues} />    

            <Pressable style={styles.imageButton} onPress={pickImages}>
                <Text style={styles.imageButtonText}>Seleccionar Imágenes</Text>
            </Pressable>

            <View style={styles.previewContainer}>
                {houses?.imageUrl?.map((img) => (
                    <Image key={img} source={{ uri: img }} style={styles.preview} />))
                }
            </View> 

            <Pressable style={styles.create} onPress={axios}>
                <Text style={styles.imageButtonText}>Crear</Text>
            </Pressable>       
        </View>
    )
}

export default CreateCard

const styles = StyleSheet.create({
    /*  CONTENEDOR GENERAL  */
    container: {
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    /*  INPUTS TIPO GLASS  */
    title: glassInput,
    direction: glassInput,
    ubication: glassInput,
    price: glassInput,
    typeOfHouse: glassInput,
    condition: glassInput,
    ambients: glassInput,
    bathrooms: glassInput,
    years: glassInput,
    taxes: glassInput,
    covered: glassInput,
    uncovered: glassInput,
    area: glassInput,

    textArea: {
        ...glassInput,
        height: 110,
        textAlignVertical: "top",
    },

    /*  PICKER  */
    pickerWrapper: {
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.35)",
        marginBottom: 14,
        overflow: "hidden",
    },

    picker: {
        color: "#fff",
    },

    /*  BOTÓN IMÁGENES  */
    imageButton: {
        backgroundColor: "#6f2de2",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 14,
    },

    imageButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
        letterSpacing: 0.5,
    },

    /*  PREVIEW IMÁGENES  */
    previewContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 6,
        marginBottom: 18,
    },

    preview: {
        width: 82,
        height: 82,
        borderRadius: 12,
        marginRight: 10,
        marginBottom: 10,
    },

    /*  BOTÓN CREAR  */
    create: {
        backgroundColor: "#5a1fdc",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginBottom: 30,
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
    },
    });

    /*  ESTILO BASE GLASS REUTILIZABLE  */
    const glassInput = {
    width: "100%",
    height: 48,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
};
