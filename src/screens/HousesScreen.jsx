import { Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HousesScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listado de Propiedades</Text>
            <Button title="Ir a Detalle" onPress={() => navigation.navigate("HouseDetail")} />
        </SafeAreaView>
    )
}

export default HousesScreen