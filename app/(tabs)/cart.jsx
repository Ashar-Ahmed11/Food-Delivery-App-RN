import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartCard from '../../components/cartCard';
import AppContext from '../../context/appContext';
const Cart = () => {
    const context = useContext(AppContext)
    const { cart,subTotal,setsubTotal } = context
    console.log('THis is cart from cart:', cart);

    const initialValue = 0;

    
    const cartSubTotal = cart.reduce(
        (accumalator, element) => accumalator + element.prod.price*element.quantity ,
        initialValue,
    );

    useEffect(() => {
      setsubTotal(cartSubTotal)
    }, [cartSubTotal])
    

    // console.log(initialValue);
    



    console.log(Array.from(cart,(({prod,quantity})=>{return {product:prod._id,quantity}})));
    
    console.log(cartSubTotal);
    


    const router = useRouter()
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
                        Cart
                    </Text>

                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <ScrollView>
                {cart.map((e, i) => { return <CartCard product={e} key={e.prod._id} /> }
                )}
                {/* <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/720"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/721"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/722"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/723"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/724"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/725"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/726"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/727"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/728"} price={"200"} />
                <CartCard name={"Airforce Jumpman"} image={"https://picsum.photos/729"} price={"200"} /> */}
            </ScrollView>
            <View style={{
                position: "absolute", bottom: 0, backgroundColor: "white", width: "100%", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: tertiaryColor
            }}>
                <View>
                    <Text style={{ color: secondaryColor }}>Total Price</Text>
                    <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 20 }}>
                        PKR {subTotal}
                    </Text>
                </View>
                <Link href="/checkout"><Button textColor="white" style={{ borderRadius: 10, backgroundColor: "#F2994A", borderWidth: 0, paddingVertical: 2, justifyContent: "center" }} mode="outlined">
                    Checkout
                </Button>
                </Link>

            </View>
        </View>
    )
}

export default Cart