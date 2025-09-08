import { Link, Redirect, useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../context/appContext";
const SignUp = () => {
    const navigation = useNavigation()
    const context = useContext(AppContext)
    const { isLoggedIn, setIsLoggedIn,signUp } = context
    const [signUpDetails, setSignUpDetails] = useState(null)
    console.log(signUpDetails);
    
    if (isLoggedIn) {
        return <Redirect href="/" />
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, height: "90%", justifyContent: "center" }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "PoppinsSemibold" }} variant="headlineSmall">
                    Register To Join Us
                </Text>
                <Text variant="bodyMedium" style={{ color: "grey" }}>
                    Welcome back! Please enter your details.
                </Text>
                <View style={{flexDirection:"row"}}>
                    <TextInput value={signUpDetails?.firstName} onChangeText={(e)=>setSignUpDetails({...signUpDetails,firstName:e})} placeholder="First Name" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, marginTop: 20 ,flex:1,marginRight:10}} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                    <TextInput value={signUpDetails?.lastName} onChangeText={(e)=>setSignUpDetails({...signUpDetails,lastName:e})}  placeholder="Last Name" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, marginTop: 20,flex:1 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                </View>
                <TextInput value={signUpDetails?.email} onChangeText={(e)=>setSignUpDetails({...signUpDetails,email:e})}  placeholder="Email" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                <TextInput  value={signUpDetails?.phoneNumber} onChangeText={(e)=>setSignUpDetails({...signUpDetails,phoneNumber:e})}  placeholder="Phone Number" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                <TextInput    secureTextEntry={true} placeholder="Create Password" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />
                <TextInput  value={signUpDetails?.password} onChangeText={(e)=>setSignUpDetails({...signUpDetails,password:e})}  secureTextEntry={true} placeholder="Confirm Password" style={{ backgroundColor: "#ffffff", paddingHorizontal: 0, width: "100%", marginTop: 20 }} underlineColor="grey" placeholderTextColor="grey" activeUnderlineColor="black" />

                <Button textColor="white" onPress={() => signUp(signUpDetails)} style={{ width: "100%", borderRadius: 10, marginTop: 20, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2 }} mode="outlined">
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