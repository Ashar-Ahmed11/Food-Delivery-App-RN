import { Entypo, Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingCard from '../../components/LoadingCard';
import OrderProductCard from '../../components/orderProductCard';
import AppContext from '../../context/appContext';
const primaryColor = "#F2994A"
const tertiaryColor = "#EDEDED"
const secondaryColor = "#838383"
const Orders = () => {
    const { id: orderID } = useLocalSearchParams()
    console.log('ORDER ID',orderID);

    const router = useRouter()
    const context = useContext(AppContext)
    const { userDetails, products, productLoader } = context

    console.log(userDetails);

    

    const orderDetails = userDetails.orders.find((e) => e._id == orderID)
    console.log('order details', orderDetails);
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

    let {total,status} = orderDetails

    

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons onPress={() => router.navigate("/orders")} style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="chevron-back" size={24} color={"black"} />

                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: "black", fontFamily: "PoppinsSemibold" }}>
                        Order Details
                    </Text>

                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <ScrollView>
                <View >
                    <ScrollView horizontal style={{ paddingBottom: 40, paddingTop: 10 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
                        {productLoader ? <>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </> : orderDetails.products.map(({ product, quantity }, i) => {
                            return <OrderProductCard key={i} product={product} quantity={quantity} />

                        })}

                        {/* <ProductCard name={"Airforce Jumpman"} image={"https://picsum.photos/710"} price={"300"} />
                            <ProductCard name={"Airforce Jumpman"} image={"https://picsum.photos/750"} price={"100"} />
                            <ProductCard name={"Airforce Jumpman"} image={"https://picsum.photos/700"} price={"100"} /> */}


                    </ScrollView>
                </View>
                <View>
                    <View style={[{ padding: 20, marginHorizontal: 20, borderRadius: 20, marginVertical: 10 }, styles.boxShadow]}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 15 }}>Order ID {orderID.substring(orderID.length - 4)}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: secondaryColor,fontSize:15 ,paddingVertical:5}}>Subtotal</Text>
                            <Text style={{ color: secondaryColor,fontSize:15 ,paddingVertical:5}}>PKR {total-150}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: secondaryColor ,fontSize:15,paddingVertical:5}}>Delivery</Text>
                            <Text style={{ color: secondaryColor ,fontSize:15,paddingVertical:5}}>PKR 150</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: "PoppinsSemibold" ,fontSize:15,paddingVertical:5}}>Total</Text>
                            <Text style={{ fontFamily: "PoppinsSemibold",fontSize:15,paddingVertical:5 }}>PKR {total}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[{ padding: 20, marginHorizontal: 20, borderRadius: 20, marginVertical: 10 }, styles.boxShadow]}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 15 }}>Order Status</Text>
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="clock-time-eight-outline" size={44} color={primaryColor} />
                            <Text style={{ fontFamily: "PoppinsSemibold", color: primaryColor }}>{status}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.boxShadow, { borderRadius: 20, marginHorizontal: 20,marginBottom:20, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 10 }]}>
                    <View>

                        <View style={{ paddingVertical: 20, flexDirection: "row" }}>
                            <Entypo name="location-pin" style={{ paddingHorizontal: 5 }} size={24} color={primaryColor} />
                            <View style={{ width: "80%" }}>
                                <Text style={{ fontFamily: "PoppinsSemibold" }}>
                                    Location
                                </Text>
                                <Text style={{ fontFamily: "PoppinsSemibold", color: secondaryColor }}>
                                    {JSON.parse(orderDetails?.address).currentAddress}
                                </Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    boxShadow: { borderWidth: 0, boxShadow: `0px 2px 15px ${tertiaryColor}` }
})

export default Orders