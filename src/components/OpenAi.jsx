import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Pressable, Text, TextInput, ScrollView } from "react-native";
import axios from "axios";

const OpenAi = () => {
    const [ modalAi, setModalAi ] = useState(false)
    const [ userMessage, setUserMessage ] = useState("")
    const [ messages, setMessages ] = useState([])
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const scrollViewRef = useRef()

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
        
    }, [messages])

    const handleSaveMessages = (msg) => {
        setMessages((prev) => [...prev, msg])
    }

    const handleMessage = async () => {
        try {
            setError(false)
            setLoading(true)

            handleSaveMessages({ "role": "user", "content": `${userMessage}` })
            setUserMessage("")
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/chat`, {messages})

            handleSaveMessages({ "role": "assistant", "content": `${response.data.reply}` })
            
        } catch (error) {
            setError(true)
            console.error(`Error al comunicarse con OpenAI: ${error}`);
            alert(
                error.response?.message || "Error Interno con AI"
            );
        } finally {
            setLoading(false)
            setError(false)
        }
    }

        return(
        <View style={styles.chatBox}>  
            <Pressable onPress={() => setModalAi(false)} style={styles.closeButton}>
                    <Text style={styles.closeText}>X</Text>
            </Pressable> 

            <View style={styles.messagesHistory}>
                <ScrollView ref={scrollViewRef}>
                {messages.map((msg, index) => {
                    return msg.role === "user" ? 

                        (<LinearGradient key={index} colors={["#fbc2eb", "#a18cd1"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.messageUser}>
                            <Text style={styles.userText}>{msg.content}</Text>
                        </LinearGradient>) : 

                        ( loading ?

                        <LinearGradient key={index} colors={["#8e2de2", "#4a00e0"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.messageBot} >
                            <Text style={styles.botText}>💻: Pensando...</Text>
                        </LinearGradient> 
                        :  
                        <LinearGradient key={index} colors={["#8e2de2", "#4a00e0"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.messageBot} >
                            <Text style={styles.botText}>💻: {msg.content}</Text>
                        </LinearGradient>
                    );
                })}
                </ScrollView>
            </View>

            <View style={styles.inputBox}>
                <TextInput value={userMessage} onChangeText={(text) => setUserMessage(text)} style={styles.input} placeholderTextColor={"white"} placeholder="Preguntale a la IA" />
                <Pressable onPress={handleMessage} style={styles.sendButton}>
                    <Text>📨</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default OpenAi

const styles = StyleSheet.create({
chatBox: {
    paddingTop: 18,
    width: "95%",
    height: 445,
    position: "absolute",
    top: 80,
    alignSelf: "center",
    borderRadius: 22,
    /* backgroundColor: "rgba(255,255,255,0.65)", */
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    zIndex: 999,

    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    },

closeButton: {
    position: "absolute",  
    top: 10,
    right: 10,
    zIndex: 1000,     
},

closeText: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#8e2de2",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 26,   
},

messagesHistory: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
},

messageUser: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "80%",
},

userText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
},

messageBot: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "80%",
},

botText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
    },

inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(0,0,0,0.6)",
    },

input: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 14,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    fontSize: 14,
    },

sendButton: {
    marginLeft: 8,
    width: 44,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#8e2de2",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#8e2de2",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    },

    messageBot: {
        alignSelf: "flex-start",
        padding: 10,
        borderRadius: 16,
        marginVertical: 6,
        maxWidth: "80%",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },

    botText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 14,
    },
});

