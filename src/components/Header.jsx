import { View, Text, StyleSheet, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Header = ({ title, onBack, style }) => {
    const insets = useSafeAreaInsets()

    return(
        <View style={[styles.container, { paddingTop: insets.top }, style]}>
            {onBack && (
                <Pressable onPress={onBack}>
                    <Text style={styles.back}>←  {title}</Text>
                </Pressable>
            )}
        </View>
    )
}

export default Header


const styles = StyleSheet.create({
    container: {
        height: 115,
        backgroundColor: "rgba(255,255,255,0.55)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.65)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14
    },
    back:{
        color: "#fff",
        fontSize: 22,
        marginRight: 12,
        fontWeight:"600"
    }
})