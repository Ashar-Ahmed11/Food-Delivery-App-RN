import { Link, Redirect, useNavigation } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../context/appContext";
const SignUp = () => {
    const navigation = useNavigation()
    const context = useContext(AppContext)
    const { isLoggedIn, setIsLoggedIn } = context

    if (isLoggedIn) {
        return <Redirect href="/" />
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, height: "70%", justifyContent: "center" }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "PoppinsSemibold" }} variant="headlineSmall">
                    Register To Join Us
                </Text>
                <Text variant="bodyMedium" style={{ color: "grey" }}>
                    Welcome back! Please enter your details.
                </Text>
                <TextInput placeholder="Email" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                <TextInput secureTextEntry={true} placeholder="Create Password" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                <TextInput secureTextEntry={true} placeholder="Confirm Password" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />

                <Button textColor="white" onPress={() => { setIsLoggedIn(true); navigation.navigate("(tabs)") }} style={{ width: "100%", borderRadius: 10, marginTop: 20, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2 }} mode="outlined">
                    Register
                </Button>
               <Text style={{paddingVertical:20,color:"grey"}}>
                    Or
                </Text>
                <Text variant="bodyMedium" style={{ color: "grey" }}>
                    Already have an account? <Link href="/signin" style={{color:"black"}}>Login</Link>
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SignUp