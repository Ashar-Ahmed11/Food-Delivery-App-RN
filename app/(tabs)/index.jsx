import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView as AnimatedScrollView } from "@gemcook/react-native-animated-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import Constants from 'expo-constants';
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import ProductCard from "../../components/Cards";
import Fab from "../../components/Fab";
import HorizontalCard from "../../components/horizontalCard";
import LoadingCard from "../../components/LoadingCard";
import AppContext from "../../context/appContext";
const HomeScreen = () => {
    // const scrollRef = useRef(null)
    console.log(Constants.statusBarHeight);
    
    const router = useRouter()
    const context = useContext(AppContext)
    const { isLoggedIn, products, getProducts, productLoader, categories } = context
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

    // console.log(scrollRef);
    const [maxCustomHeaderHeight, setMaxCustomHeaderHeight] = useState(null)
    const [searchBarHeaight, setsearchBarHeaight] = useState(null)
    const secondaryColor = "#838383"
    return (
        <View style={{ flex: 1 }}>
            
            <StatusBar current style="dark" />
            <AnimatedScrollView
                maxHeaderHeight={maxCustomHeaderHeight}
                minHeaderHeight={searchBarHeaight}
                floating={true}
                animationHeaderStyle={{}}
                AnimationHeaderComponent={

                    <View
                        onLayout={e => console.log('layout',setMaxCustomHeaderHeight(e.nativeEvent.layout.height))}
                        onContentSizeChange={e =>
                            console.log('contentSize', e.nativeEvent.contentSize)
                        }

                    >
                      
                        <View style={{ backgroundColor:"white",paddingTop:Constants.statusBarHeight,flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20}}>
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

                        <View
                        onLayout={e => console.log('layout',setsearchBarHeaight(e.nativeEvent.layout.height))}
                        style={{paddingTop:Constants.statusBarHeight, paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row", justifyContent: "space-between", width: "100%" ,backgroundColor:"white"}}>
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
                    </View>
                }
            >


                {/* <ScrollView  > */}
                    <ScrollView style={{ paddingTop: 10 }} horizontal contentContainerStyle={{ paddingHorizontal: 20 }}>
                        {categories.map((element, index) => {
                            return <Fab key={index} title={element.title} id={element._id} icon={element.icon} />
                        })}

                    </ScrollView>
                    <View>
                        <View style={{ paddingVertical: 20, paddingHorizontal: 30, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: "PoppinsSemibold" }}>Popular</Text>
                            <Text style={{ color: secondaryColor, fontFamily: "Poppins" }}>See All</Text>
                        </View>
                        <View >
                            <ScrollView horizontal style={{ paddingBottom: 40, paddingTop: 10 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
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

                {/* </ScrollView> */}
            </AnimatedScrollView>

        </View>
    )
}

export default HomeScreen