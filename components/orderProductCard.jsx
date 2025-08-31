import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import AppContext from '../context/appContext';
const OrderProductCard = ({product,quantity}) => {
    const context = useContext(AppContext)
    const {userDetails} = context
    const {_id:id, title:name, image, price} =product
    const router = useRouter()
    const primaryColor = "#F2994A"
    // console.log(id);

    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"

    
    const isProductFavourite = () => {
        if (userDetails) {
            const userFavouriteProduct = userDetails.favourites.find((e) => e._id == id)
            console.log('This is the favourite product', userFavouriteProduct);

            if (userFavouriteProduct) {
                console.log('This is the favourite product', userFavouriteProduct);

                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
    return (
        <>
            <Card onPress={() => router.navigate(`/product/${id}`)} style={{ backgroundColor: "#ffffff", width: 300, marginHorizontal: 10, borderWidth: 0, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>
                <Card.Cover
                    source={{ uri: `${image}` }}
                    style={{ padding: 10, backgroundColor: "#ffffff", position: "relative" }} />
                <View style={{ position: "absolute", top: 20, right: 20 }}>
                    {/* <Ionicons style={{ padding: 10,  borderRadius: 100 ,backgroundColor:"rgba(128 128 128 / 0.5)"}} name="bag-handle-outline" size={24} color={"white"} /> */}
                    <AntDesign name={`heart${isProductFavourite()?"":"o"}`} size={20} color="white" style={{ padding: 10, borderRadius: 100, backgroundColor: "rgba(128 128 128 / 0.4)" }} />

                </View>
                <Card.Title title={<Text style={{ fontFamily: "PoppinsSemibold" }}>{name}</Text>}
                    subtitle=
                    {
                        <Text>Quantity {quantity}</Text>
                    } />
                <Card.Content>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold" }}>PKR {price}</Text>
                        {/* <Ionicons name="bag-handle-outline" size={24} color={"#4999F1"} /> */}
                    </View>
                </Card.Content>

            </Card>
        </>
    )
}

export default OrderProductCard