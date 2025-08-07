import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/Cards";
import HorizontalCard from "../../components/horizontalCard";
import LoadingCard from "../../components/LoadingCard";
import AppContext from "../../context/appContext";
const HomeScreen = () => {
    const router = useRouter()
    const context = useContext(AppContext)
    const { isLoggedIn, products, getProducts, productLoader } = context
    // if (!isLoggedIn) {
    //     return <Redirect href="/signin" />
    // }
    const [currentLocation, setcurrentLocation] = useState("Loading")
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



    useEffect(() => {
        getProducts()
    }, [])



    console.log(products);

    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView ></SafeAreaView>
            <StatusBar style="dark" />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 10 }}>
                <View onTouchEnd={() => router.navigate("/address")} style={{ padding: 10 }}>
                    <Text style={{ color: secondaryColor }}>
                        Location
                    </Text>
                    <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                        <Entypo name="location-pin" size={24} color={primaryColor} />
                        <Text style={{ fontFamily: "PoppinsSemibold", width: "80%" }}>
                            {currentLocation}
                        </Text>
                    </View>
                </View>
                <View onTouchEnd={() => { router.navigate("/cart") }} style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="bag-handle-outline" size={24} color={secondaryColor} />

                </View>
            </View>

            <View style={{ paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Searchbar
                    placeholder="Search"
                    mode="bar"
                    placeholderTextColor={secondaryColor}
                    onIconPress={() => { console.log("button pressed"); }}
                    style={{ flexGrow: 8, backgroundColor: "#FBFBFB", borderColor: tertiaryColor, borderWidth: 1 }}

                />
                <View style={{ justifyContent: "center", flex: 2, alignItems: "center" }}>


                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color="black" />
                </View>

            </View>

            <ScrollView  >
                <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }} horizontal>
                    <View onTouchEnd={() => router.navigate("/category")} style={{ paddingHorizontal: 14 }}>
                        <View style={{ padding: 15, borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>
                            <FontAwesome5 name="pizza-slice" size={28} color={primaryColor} />
                        </View>
                        <Text style={{ color: secondaryColor, textAlign: "center", paddingVertical: 10 }}>
                            Pizza
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <View style={{ padding: 15, borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>
                            <FontAwesome5 name="hamburger" size={28} color={primaryColor} />
                        </View>
                        <Text style={{ color: secondaryColor, textAlign: "center", paddingVertical: 10 }}>
                            Burger
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <View style={{ padding: 15, borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>

                            <MaterialIcons name="icecream" size={28} color={primaryColor} />
                        </View>
                        <Text style={{ color: secondaryColor, textAlign: "center", paddingVertical: 10 }}>
                            Cream
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <View style={{ padding: 15, borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>

                            <FontAwesome5 name="hotdog" size={28} color={primaryColor} />
                        </View>
                        <Text style={{ color: secondaryColor, textAlign: "center", paddingVertical: 10 }}>
                            Hot Dog
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <View style={{ padding: 15, borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>


                            <FontAwesome6 name="martini-glass-citrus" size={28} color={primaryColor} />
                        </View>
                        <Text style={{ color: secondaryColor, textAlign: "center", paddingVertical: 10 }}>
                            Juice
                        </Text>
                    </View>
                </ScrollView>
                <View>
                    <View style={{ paddingVertical: 20, paddingHorizontal: 30, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold" }}>Popular</Text>
                        <Text style={{ color: secondaryColor, fontFamily: "Poppins" }}>See All</Text>
                    </View>
                    <View >
                        <ScrollView horizontal style={{ paddingBottom: 40, paddingTop: 10, paddingHorizontal: 20 }}>
                            {productLoader ? <>
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                            </> : products.map((e, i) => {
                                return <ProductCard key={i} id={e._id} name={e.title} image={e.image} price={e.price} />

                            })}

                            {/* <ProductCard name={"Airforce Jumpman"} image={"https://picsum.photos/710"} price={"300"} />
                            <ProductCard name={"Airforce Jumpman"} image={"https://picsum.photos/750"} price={"100"} />
                            <ProductCard name={"Airforce Jumpman"} image={"https://picsum.photos/700"} price={"100"} /> */}


                        </ScrollView>
                    </View>
                </View>
                <View>
                    <View style={{ paddingVertical: 20, paddingHorizontal: 30, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold" }}>Popular</Text>
                        <Text style={{ color: secondaryColor, fontFamily: "Poppins" }}>See All</Text>
                    </View>
                    <View >
                        <View horizontal style={{ paddingBottom: 40, paddingTop: 10, paddingHorizontal: 20 }}>
                            {products.map((e, i) => {
                                return <HorizontalCard key={i} id={e._id} category={e.category.title} name={e.title} image={e.image} price={e.price} />

                            })}
                            {/* <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/720"} price={"200"} /> */}


                        </View>
                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

export default HomeScreen