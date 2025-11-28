import { Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <Text>Home</Text>
            <Button title="Ver propiedades" onPress={() => navigation.navigate("Houses")} />
            <Button title="Login" onPress={() => navigation.navigate("Login")} />
            <Button title="Perfil" onPress={() => navigation.navigate("Profile")} />    
        </SafeAreaView>
    )
}

export default HomeScreen