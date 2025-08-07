import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
const HorizontalCard = ({ id,name, image, price ,category}) => {
    const router = useRouter()
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <>
            <Card  onPress={()=>router.navigate(`/product/${id}`)} style={{ backgroundColor: "#ffffff", borderWidth: 0, boxShadow: `0px 10px 15px ${tertiaryColor}`,margin:10 }}>
                <View style={{ flexDirection: "row"}}>
                    <Card.Cover source={{ uri: `${image}` }} style={{ padding: 10, backgroundColor: "#ffffff", position: "relative", height: 100, width: 100 }} />

                    <Card.Title
                    style={{flexGrow:10}}
                    leftStyle={{flexGrow:10}}
                    left={()=><View >
                          <View>
                        <Text style={{ fontFamily: "PoppinsSemibold",fontSize:14 }}>{name}</Text>
                               <Text style={{ fontFamily: "PoppinsSemibold",fontSize:12,color:secondaryColor,paddingVertical:5 }}>{category}</Text>

                    </View>
                        <View style={{ }}>
                               <Text style={{ fontFamily: "PoppinsSemibold",fontSize:14 }}>PKR {price}</Text>
                            </View>
                    </View>}
                   
               
                   
                        />
                    <Card.Content style={{justifyContent:"flex-end",flexDirection:"row",flexGrow:1,alignItems:"flex-end",paddingBottom:20}} >
                       
            
                            <Ionicons name="bag-handle-outline" size={24} color={"#4999F1"} />
                
                    </Card.Content>
                </View>
            </Card>
        </>
    )
}

export default HorizontalCard