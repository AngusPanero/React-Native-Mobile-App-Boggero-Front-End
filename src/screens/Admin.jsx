import { Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Admin = ({ navigation }) => {
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <Text>Admin</Text>
            <Button title="Login" onPress={() => navigation.navigate("Login")} />
        </SafeAreaView>
    )
}

export default Admin