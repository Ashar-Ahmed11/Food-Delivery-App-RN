import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import AppContext from '../context/appContext';
const CartCard = ({ product}) => {
    const context = useContext(AppContext)
    const {increaseQtyInCart,decreaseQtyInCart,removeFromCart} = context
    const {title:name,price,image} = product.prod
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <>
            <Card style={{ backgroundColor: "#ffffff", borderWidth: 0, boxShadow: `0px 10px 15px ${tertiaryColor}`, margin: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <Card.Cover source={{ uri: `${image}` }} style={{ padding: 10, backgroundColor: "#ffffff", position: "relative", height: 120, width: 100 }} />

                    <Card.Title
                        style={{ flexGrow: 10 }}
                        leftStyle={{ flexGrow: 10 }}
                        left={() => <View >
                            <View>
                                <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 14 }}>{name}</Text>
                                <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 12, color: secondaryColor, paddingVertical: 5 }}>Burger</Text>

                            </View>
                            <View style={{}}>
                                <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 14 }}>PKR {price}</Text>

                                <View style={{ flexDirection: "row" ,alignItems:'center'}}>
                                    <AntDesign onPress={()=>decreaseQtyInCart(product)} name="minuscircle" size={15} color="black" />
                                    <Text style={{ paddingHorizontal: 5, fontSize: 15 }}>{product.quantity}</Text>
                                    <AntDesign onPress={()=>increaseQtyInCart(product)} name="pluscircle" size={15} color="black" />

                                </View>
                            </View>
                        </View>}



                    />
                    <Card.Content style={{ justifyContent: "space-between", flexGrow: 1, alignItems: "", paddingVertical: 20 }} >
                        <MaterialIcons onPress={()=>removeFromCart(product)} name="remove-circle-outline" size={24} color={secondaryColor} />

                        {/* <Ionicons name="bag-handle-outline" size={24} color={"#4999F1"} /> */}

                    </Card.Content>
                </View>
            </Card>
        </>
    )
}

export default CartCard