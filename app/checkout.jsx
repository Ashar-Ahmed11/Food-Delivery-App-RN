import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, usePathname, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../context/appContext';
const Checkout = () => {
    const context = useContext(AppContext)
    const { cart, subTotal, setsubTotal } = context
    const router = useRouter()
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    const [currentLocation, setcurrentLocation] = useState("Loading")
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const pathname = usePathname()
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


    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons onPress={() => router.back()} style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="chevron-back" size={24} color={"black"} />

                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: "black", fontFamily: "PoppinsSemibold" }}>
                        Checkout
                    </Text>

                </View>
                <Link href="/cart">
                    <View style={{ justifyContent: "center", position: "relative" }}>

                        <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="bag-handle-outline" size={24} />
                        <Text style={{ position: "absolute", top: 0, right: 0, color: "white", backgroundColor: primaryColor, paddingHorizontal: 5, borderRadius: 20 }}>{cart.length}</Text>

                    </View>
                </Link>
            </SafeAreaView>
            <View style={{
                paddingHorizontal: 20
            }}>
                <View>
                    <Text style={{ fontFamily: "PoppinsSemibold", paddingVertical: 20, fontSize: 15 }}>Shipping To</Text>
                    <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 10 }}>
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
                    <Text style={{ fontFamily: "PoppinsSemibold", paddingVertical: 20, fontSize: 15 }}>Payment Method</Text>
                    <View>
                        <View style={{ boxShadow: `0px 10px 15px ${tertiaryColor}`, borderRadius: 10, padding: 10 }}>
                            {/* Cash */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialCommunityIcons name="cash-multiple" size={24} style={{ paddingHorizontal: 10 }} color={primaryColor} />
                                    <Text>Cash</Text>
                                </View>
                                <RadioButton
                                    value="cash"
                                    onPress={() => setPaymentMethod("cash")}
                                    color={primaryColor}
                                    uncheckedColor={secondaryColor}
                                    status={paymentMethod === "cash" ? "checked" : "unchecked"}
                                />
                            </View>

                            {/* Credit Card */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome6 name="credit-card" size={24} style={{ paddingHorizontal: 10 }} color={primaryColor} />
                                    <Text>Credit Card</Text>
                                </View>
                                <RadioButton
                                    value="card"
                                    onPress={() => setPaymentMethod("card")}
                                    color={primaryColor}
                                    uncheckedColor={secondaryColor}
                                    status={paymentMethod === "card" ? "checked" : "unchecked"}
                                />
                            </View>

                            {/* Paypal */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Entypo name="paypal" size={24} style={{ paddingHorizontal: 10 }} color={primaryColor} />
                                    <Text>Paypal</Text>
                                </View>
                                <RadioButton
                                    value="paypal"
                                    onPress={() => setPaymentMethod("paypal")}
                                    color={primaryColor}
                                    uncheckedColor={secondaryColor}
                                    status={paymentMethod === "paypal" ? "checked" : "unchecked"}
                                />
                            </View>

                            {/* Google Pay */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <AntDesign name="google" size={24} style={{ paddingHorizontal: 10 }} color={primaryColor} />
                                    <Text>Google Pay</Text>
                                </View>
                                <RadioButton
                                    value="google"
                                    onPress={() => setPaymentMethod("google")}
                                    color={primaryColor}
                                    uncheckedColor={secondaryColor}
                                    status={paymentMethod === "google" ? "checked" : "unchecked"}
                                />
                            </View>

                            {/* Apple Pay */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <AntDesign name="apple1" size={24} style={{ paddingHorizontal: 10 }} color={primaryColor} />
                                    <Text>Apple Pay</Text>
                                </View>
                                <RadioButton

                                    value="apple"
                                    onPress={() => setPaymentMethod("apple")}
                                    color={primaryColor}
                                    uncheckedColor={secondaryColor}
                                    status={paymentMethod === "apple" ? "checked" : "unchecked"}
                                />
                            </View>
                        </View>

                    </View>
                </View>
            </View>

            <View style={{
                position: "absolute", bottom: 0, backgroundColor: "white", width: "100%", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: "space-between", borderWidth: 1, borderColor: tertiaryColor
            }}>
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>Subtotal</Text>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>
                            PKR {subTotal}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20, color: secondaryColor }}>Delivery</Text>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20, color: secondaryColor }}>
                            PKR 150
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>Total</Text>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>
                            PKR {subTotal+150}
                        </Text>
                    </View>

                </View>
                <Button textColor="white" style={{ borderRadius: 10, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2, justifyContent: "center" }} mode="outlined">
                    Checkout
                </Button>

            </View>
        </View>
    )
}

export default Checkout