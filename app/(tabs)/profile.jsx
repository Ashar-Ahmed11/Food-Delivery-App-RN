import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import ProfileLoadingState from "../../components/profileLoadingState";
import AppContext from "../../context/appContext";
const Profile = () => {
    const pathname = usePathname()
    const router = useRouter()
    const context = useContext(AppContext)
    const { isLoggedIn, setIsLoggedIn, userDetails, profileLoader } = context



    const [currentLocation, setcurrentLocation] = useState("Loading")

    const clearAuthToken = async () => {


        await AsyncStorage.setItem("authToken", "")
        setIsLoggedIn(false)
        Toast.info("User logged out")
        // const data = await AsyncStorage.getItem("authToken")
        // setIsLoggedIn(false)
        //    console.log(data);



    }

    console.log(isLoggedIn);

    // console.log(isLoggedIn);
    useEffect(() => {
        const getLocation = async () => {
            const location = await AsyncStorage.getItem("userLocation")
            if (location) {
                const JSONLocation = JSON.parse(location)
                setcurrentLocation(JSONLocation.currentAddress)


            }
            else {
                setcurrentLocation("Tap to select location")
            }

        }
        getLocation()
    }, [pathname])




    // if (!isLoggedIn) {
    //     return <Redirect href="/signin" />
    // }

    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons onPress={() => router.back()} style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="chevron-back" size={24} color={"black"} />

                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: "black", fontFamily: "PoppinsSemibold" }}>
                        Profile
                    </Text>

                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Avatar.Image size={75} source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png" }} />
                    {userDetails && <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{ fontFamily: "PoppinsSemiBold" }}>{`${userDetails.firstName} ${userDetails.lastName}`}</Text>
                        <Text style={{ fontFamily: "Poppins", color: secondaryColor }}>{userDetails.email}</Text>
                    </View>}

                </View>
                <Text style={{ fontFamily: "PoppinsSemibold", paddingVertical: 20, fontSize: 15 }}>Profile Details</Text>
                {profileLoader ? <>
                    <ProfileLoadingState />
                    <ProfileLoadingState />
                    <ProfileLoadingState />
                    <ProfileLoadingState />
                </> : userDetails ? <>
                    <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View>

                            <View style={{ paddingVertical: 20, flexDirection: "row" }}>
                                <Entypo name="location-pin" style={{ paddingHorizontal: 5 }} size={24} color={primaryColor} />
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "PoppinsSemibold" }}>
                                        Location
                                    </Text>
                                    <Text style={{ fontFamily: "PoppinsSemibold", color: secondaryColor }}>
                                        {currentLocation}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View onTouchEnd={() => { router.navigate("/address") }} style={{ justifyContent: "center" }}>


                            <Feather style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="edit" size={24} color={primaryColor} />
                        </View>
                    </View>

                    <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View onTouchEnd={() => router.navigate("/favourite")}>

                            <View style={{ paddingVertical: 20, flexDirection: "row" }}>


                                <AntDesign name="heart" style={{ paddingHorizontal: 10 }} size={24} color={primaryColor} />
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "PoppinsSemibold" }}>
                                        Favorites
                                    </Text>

                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View onTouchEnd={() => router.navigate("/orders")}>

                            <View style={{ paddingVertical: 20, flexDirection: "row" }}>

                                <Ionicons name="receipt" style={{ paddingHorizontal: 10 }} size={24} color={primaryColor} />

                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "PoppinsSemibold" }}>
                                        Orders
                                    </Text>

                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View>

                            <View style={{ paddingVertical: 20, flexDirection: "row" }}>
                                {/* <Entypo name="location-pin" style={{ paddingHorizontal: 5 }} size={24} color={primaryColor} /> */}
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "PoppinsSemibold", color: "red" }}>
                                        Sign Out
                                    </Text>

                                </View>
                            </View>
                        </View>
                        <View onTouchEnd={() => {
                            clearAuthToken()
                        }} style={{ justifyContent: "center" }}>



                            <MaterialIcons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="logout" size={24} color={"red"} />
                        </View>
                    </View>
                </> : <><Text style={{ color: secondaryColor }}>Please login to access further features</Text>
                    <View>
                        <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View onTouchEnd={() => router.navigate("/signin")}>

                            <View style={{ paddingVertical: 20, flexDirection: "row" }}>


                                <AntDesign name="login" style={{ paddingHorizontal: 10 }} size={24} color={primaryColor} />
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "PoppinsSemibold" }}>
                                        Login
                                    </Text>

                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View onTouchEnd={() => router.navigate("/signup")}>

                            <View style={{ paddingVertical: 20, flexDirection: "row" }}>


                                <AntDesign name="login" style={{ paddingHorizontal: 10 }} size={24} color={primaryColor} />
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: "PoppinsSemibold" }}>
                                        Sign Up
                                    </Text>

                                </View>
                            </View>
                        </View>

                    </View>
                    </View>
                </>}
            </View>


        </View>
    )
}

export default Profile