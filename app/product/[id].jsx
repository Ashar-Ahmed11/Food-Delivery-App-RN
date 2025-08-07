import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppContext from '../../context/appContext'
const Product = () => {
    const context = useContext(AppContext)
    const { getProduct, product ,addToCart} = context

    const [quantity, setQuantity] = useState(1)



    const router = useRouter()
    const { id } = useLocalSearchParams()
    console.log(id);


    useEffect(() => {
        getProduct(id)
    }, [])

    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <>
            {product && <View style={{ flex: 1, position: "relative" }}>
                <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                    <View style={{ justifyContent: "center" }}>

                        <Ionicons onPress={() => router.back()} style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="chevron-back" size={24} color={"black"} />

                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: "black", fontFamily: "PoppinsSemibold" }}>
                            Product Detail
                        </Text>

                    </View>
                    <View style={{ justifyContent: "center" }}>

                        <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="heart-outline" size={24} color={"black"} />

                    </View>
                </SafeAreaView>
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <Image
                            style={{ width: "100%", height: 335, borderRadius: 20 }}
                            source={product.image}
                            transition={1000}
                            contentFit="cover"

                        />
                    </View>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>
                            {product.title}
                        </Text>
                        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color={tertiaryColor} />
                            <Text style={{ color: secondaryColor, paddingHorizontal: 5 }}>4.3(1,2k vote)</Text>
                        </View>
                        <Text style={{ color: secondaryColor, paddingVertical: 20 }}>
                           {product.description}

                        </Text>

                        <View style={{ flexDirection: "row", paddingVertical: 20, paddingBottom: 100 }}>
                            <AntDesign onPress={()=>setQuantity((e)=>e==1?1:e-1)} name="minuscircle" size={30} color={quantity>1?"black":secondaryColor} />
                            <Text style={{ paddingHorizontal: 20, fontSize: 20 }}>{quantity}</Text>
                            <AntDesign onPress={()=>setQuantity((e)=>e+1)} name="pluscircle" size={30} color="black" />

                        </View>

                    </View>


                </ScrollView>
                <View style={{ position: "absolute", bottom: 0, backgroundColor: "white", width: "100%", boxShadow: `0px -10px 15px ${tertiaryColor}`, padding: 20, borderRadius: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ color: secondaryColor }}>Total Price</Text>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>
                            PKR {product.price}
                        </Text>
                    </View>
                    <Button onPress={()=>addToCart(product,quantity)} textColor="white" style={{ borderRadius: 10, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2, justifyContent: "center" }} mode="outlined">
                        Add To Cart
                    </Button>

                </View>

            </View>}
        </>
    )
}

export default Product