import { View, TextInput, Image, Text, Pressable, StyleSheet, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const CreateCard = ({ houses, handleSetValues, pickImages, deleteImages, closeModal, handleSubmit }) => {
    return(
        <ScrollView>
            <View style={styles.formCard}>
                <TextInput style={styles.title} placeholder="Título" placeholderTextColor={"#ddd"} value={houses.title} onChangeText={(text) => handleSetValues("title", text)} />
                <TextInput style={styles.direction} placeholder="Dirección" placeholderTextColor={"#ddd"} value={houses.direction} onChangeText={(text) => handleSetValues("direction", text)} />
                <TextInput style={styles.ubication} placeholder="Ubicación" placeholderTextColor={"#ddd"} value={houses.ubication} onChangeText={(text) => handleSetValues("ubication", text)} />

                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={houses.operation} onValueChange={(value) => handleSetValues("operation", value)} style={styles.picker}>
                        <Picker.Item label="-- Operación --" value="" />
                        <Picker.Item label="Venta" value="venta" />
                        <Picker.Item label="Alquiler" value="alquiler" />
                    </Picker>
                </View>

                <TextInput style={styles.price} placeholder="Precio" placeholderTextColor={"#ddd"} value={houses.price} onChangeText={(text) => handleSetValues("price", text)} />
                <TextInput style={styles.typeOfHouse} placeholder="Tipo de Casa" placeholderTextColor={"#ddd"} value={houses.typeOfHouse} onChangeText={(text) => handleSetValues("typeOfHouse", text)} />

                <TextInput style={styles.textArea} placeholder="Descripción" value={houses.description} onChangeText={(text) => handleSetValues("description", text)} multiline numberOfLines={4} textAlignVertical="top" />    

                <TextInput style={styles.condition} placeholder="Condición" placeholderTextColor={"#ddd"} value={houses.condition} onChangeText={(text) => handleSetValues("condition", text)} />    
                <TextInput style={styles.ambients} placeholder="Ambientes" placeholderTextColor={"#ddd"} value={houses.ambients} onChangeText={(text) => handleSetValues("ambients", text)} />    
                <TextInput style={styles.bathrooms} placeholder="Baños" placeholderTextColor={"#ddd"} value={houses.bathrooms} onChangeText={(text) => handleSetValues("bathrooms", text)} />
                <TextInput style={styles.years} placeholder="Años" placeholderTextColor={"#ddd"} value={houses.years} onChangeText={(text) => handleSetValues("years", text)} />
                <TextInput style={styles.taxes} placeholder="Expensas" placeholderTextColor={"#ddd"} value={houses.taxes} onChangeText={(text) => handleSetValues("taxes", text)} />
                <TextInput style={styles.covered} placeholder="Metros cubiertos (m²)" placeholderTextColor={"#ddd"} value={houses.covered} onChangeText={(text) => handleSetValues("covered", text)} />
                <TextInput style={styles.uncovered} placeholder="Metros descubiertos (m²)" placeholderTextColor={"#ddd"} value={houses.uncovered} onChangeText={(text) => handleSetValues("uncovered", text)} />                    
                <TextInput style={styles.area} placeholder="Area" placeholderTextColor={"#ddd"} value={houses.area} onChangeText={(text) => handleSetValues("area", text)} />    
                <TextInput style={styles.maps} placeholder="Link Google Maps" placeholderTextColor={"#ddd"} value={houses.maps} onChangeText={(text) => handleSetValues("maps", text)} />        

                <Pressable style={styles.imageButton} onPress={pickImages}>
                    <Text style={styles.imageButtonText}>Seleccionar Imágenes</Text>
                </Pressable>

                <View style={styles.previewContainer}>
                    {houses?.imageUrl?.map((img, index) => (
                        <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri: img }} style={styles.preview} />

                        <Pressable
                            style={styles.deletePhoto}
                            onPress={() => deleteImages(index)}
                        >
                            <Text style={styles.deletePhoto}>✕</Text>
                        </Pressable>
                        </View>
                    ))}
                </View>

                <Pressable style={styles.create} onPress={handleSubmit}>
                    <Text style={styles.imageButtonText}>Crear</Text>
                </Pressable>  

                <Pressable style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>      
            </View>
        </ScrollView>
    )
}

export default CreateCard

const glassInput = {
    width: "100%",
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
};

const styles = StyleSheet.create({


    /* ===== SCROLL GENERAL ===== */
    scroll: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 120,
    },

    /* ===== TARJETA PRINCIPAL ===== */
    formCard: {
        marginTop: 40,
        marginBottom: 320,
        alignSelf: "center",
        alignItems: "center",
        width: "90%",
        backgroundColor: "rgba(0,0,0,0.35)",
        borderRadius: 26,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },

    /* ===== TÍTULO ===== */
    formTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 22,
        letterSpacing: 0.5,
    },

    /* ===== INPUT BASE ===== */
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
    maps: glassInput,

    textArea: {
        ...glassInput,
        height: 110,
        paddingTop: 12,
    },

    pickerWrapper: {
        ...glassInput,
        overflow: "hidden",
        height: 52,
        justifyContent: "center",
        paddingHorizontal: 4,
    },

    picker: {
        color: "#fff",
    },

        /* ===== BOTÓN IMÁGENES ===== */
    imageButton: {
        width: "100%",
        backgroundColor: "#7b2fe2",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 20,
    },

    imageButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    closeButton: {
        width: "100%",
        backgroundColor: "#C21B00",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 20,
    },

    closeButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

        /* ===== PREVIEW IMÁGENES ===== */
    previewContainer: {
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
        },

    preview: {
        width: 82,
        height: 82,
        borderRadius: 14,
        marginRight: 10,
        marginBottom: 10,
        },

        /* ===== BOTONES FINALES ===== */
    create: {
        width: "100%",
        backgroundColor: "#5a1fdc",
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 12,
    },

    cancel: {
        backgroundColor: "rgba(255,255,255,0.12)",
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 12,
        },

    deletePhoto: {
        width:25,
        height:25,
        textAlign: "center",
        padding: 4,
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "red",
        borderColor: "black",
        borderRadius: 80,
        position: "absolute",
        top: 0,
        right: 0,
    }
});