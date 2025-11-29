import { StyleSheet, Text, View } from "react-native"

const Footer = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.footer}>© 2025 Boggero. Desarrollado por DeepDev.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
        },
    footer: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.7,
        },
    });

export default Footer