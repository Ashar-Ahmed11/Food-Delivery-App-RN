import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
const LoadingCard = ({ id,name, image, price }) => {
    const router = useRouter()
    const primaryColor = "#F2994A"
    // console.log(id);
    
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <>
            <Card   style={{ backgroundColor: "#ffffff", width: 300, marginHorizontal: 10 ,borderWidth:0,boxShadow:`0px 10px 15px ${tertiaryColor}`}}>
                <Card.Cover 
                // source={{ uri: `${image}` }} 
                style={{ padding: 10, backgroundColor: "#ffffff",position:"relative" }} />
                <View style={{position:"absolute",top:20,right:20}}>
                                                {/* <Ionicons style={{ padding: 10,  borderRadius: 100 ,backgroundColor:"rgba(128 128 128 / 0.5)"}} name="bag-handle-outline" size={24} color={"white"} /> */}
<AntDesign name="hearto" size={20} color="white" style={{ padding: 10,  borderRadius: 100 ,backgroundColor:"rgba(128 128 128 / 0.4)"}} />

                </View>
                <Card.Title title={<Text style={{ fontFamily: "PoppinsSemiBold" }}>
                    {/* {name} */}
                    </Text>}
                    subtitle=
                    {
                        <View style={{ flexDirection: "row" }}>
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color="#F2C71C" />
                            <FontAwesome name="star" size={16} color={tertiaryColor} />
                        </View>
                    } />
                <Card.Content>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontFamily: "PoppinsSemiBold" }}>
                            {/* PKR {price} */}
                            </Text>
                        <Ionicons name="bag-handle-outline" size={24} color={"#4999F1"} />
                    </View>
                </Card.Content>

            </Card>
        </>
    )
}

export default LoadingCard