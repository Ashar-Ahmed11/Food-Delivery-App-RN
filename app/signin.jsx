import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../context/appContext";
const SignIn = () => {
    const navigation = useNavigation()
    const context = useContext(AppContext)
    const { isLoggedIn, setIsLoggedIn, login } = context
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    useEffect(() => {
      const getAuthToken =async()=> {
         const authToken =await AsyncStorage.getItem("authToken")
         if(authToken){
            setIsLoggedIn(true)
            console.log(authToken);
         }
         
    }
    getAuthToken()
    }, [])
    
    if (isLoggedIn) {
        return <Redirect href="/" />
    }

    return (
        <>
            {/* <ToastManager /> */}
            <SafeAreaView style={{ paddingHorizontal: 20, height: "70%", justifyContent: "center" }}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontFamily: "PoppinsSemibold" }} variant="headlineSmall">
                        Welcome Back, Ashar
                    </Text>
                    <Text variant="bodyMedium" style={{ color: "grey" }}>
                        Welcome back! Please enter your details.
                    </Text>
                    <TextInput value={credentials.email} onChangeText={(e) => setCredentials({ ...credentials, email: e })} placeholder="Email" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                    <TextInput value={credentials.password} onChangeText={(e) => setCredentials({ ...credentials, password: e })} secureTextEntry={true} placeholder="Create Password" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                    <Button textColor="white" onPress={() => { login(credentials) }} style={{ width: "100%", borderRadius: 10, marginTop: 20, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2 }} mode="outlined">
                        Login
                    </Button>
                    <Text style={{ paddingVertical: 20, color: "grey" }}>
                        Or
                    </Text>
                    <Text variant="bodyMedium" style={{ color: "grey" }}>
                        Dont’t have an account? <Link href="/signup" style={{ color: "black" }}>Register</Link>
                    </Text>
                </View>
            </SafeAreaView>
        </>
    )
}

export default SignIn