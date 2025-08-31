import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import AppContext from '../context/appContext';
const primaryColor = "#F2994A"
const tertiaryColor = "#EDEDED"
const secondaryColor = "#838383"
const OrderCard = ({ id, price, status }) => {
    const router = useRouter()
    const context = useContext(AppContext)
    const { removeFromFavourite } = context

    return (
        <>
            <Card style={{ backgroundColor: "#ffffff", borderWidth: 0, boxShadow: `0px 10px 15px ${tertiaryColor}`, margin: 10 }}>

                {/* <Card.Cover source={{ uri: `${image}` }} style={{ padding: 10, backgroundColor: "#ffffff", position: "relative", height: 120, width: 100 }} /> */}

                {/* <Card.Title
                    style={{ flexGrow: 10 ,paddingVertical:0,marginVertical:0}}
                    leftStyle={{ flexGrow: 10, paddingHorizontal: 10,paddingVertical:0,marginVertical:0 }}
                    left={() =>
                        <View >
                            <View>
                                <View style={{ flexDirection: "row" }}>
                                    <Octicons name="package" size={24} color={primaryColor} />
                                    <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 14, paddingHorizontal: 10 }}>Order ID {id.substring(id.length - 4)}</Text>

                                </View>

                            </View>

                        </View>
                    }



                /> */}

                <View style={{paddingHorizontal:20,marginTop:20}}>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Octicons name="package" size={24} color={primaryColor} />
                            <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 14, paddingHorizontal: 10 }}>Order ID {id.substring(id.length - 4)}</Text>

                        </View>

                    </View>

                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 }}>
                    <View style={[styles.boxShadow, { padding: 10, borderRadius: 10, marginHorizontal: 10, flexGrow: 1 }]}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 12, color: secondaryColor, paddingVertical: 5 }}>Total Amount</Text>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 14 }}>PKR {price}</Text>
                    </View>
                    <View style={[styles.boxShadow, { padding: 10, borderRadius: 10, marginHorizontal: 10, flexGrow: 1 }]}>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 12, color: secondaryColor, paddingVertical: 5 }}>Order Status</Text>
                        <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 14 }}>{status}</Text>
                    </View>

                </View>

                <Card.Content style={{ justifyContent: "space-between", flexGrow: 1, alignItems: "", flexDirection: "row" }} >
                    <Button onPress={() => router.navigate(`/order/${id}`)} mode='outlined' style={{ borderRadius: 10, flexGrow: 1, borderColor: primaryColor }} textColor={primaryColor}>Details</Button>
                    {/* <Button mode='elevated' style={{ borderRadius: 10 }}>Track</Button> */}

                </Card.Content>
            </Card>
        </>
    )
}
const styles = StyleSheet.create({
    boxShadow: { borderWidth: 0, boxShadow: `0px 5px 15px ${tertiaryColor}` }
})
export default OrderCard