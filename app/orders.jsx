import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCard from '../components/orderCard';
import AppContext from '../context/appContext';
const Orders = () => {
    const router = useRouter()
    const context = useContext(AppContext)
    const {userDetails} = context

    console.log(userDetails);
    
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <View style={{flex:1}}>
            <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20}}>
                    <View style={{ justifyContent: "center" }}>

                    <Ionicons onPress={()=>router.back()} style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="chevron-back" size={24} color={"black"} />

                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: "black" ,fontFamily:"PoppinsSemibold"}}>
                        Orders
                    </Text>
                   
                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <ScrollView>
                
                {
                
                [...userDetails?.orders].reverse().map((e)=>{
                    return <OrderCard key={e._id} id={e._id} status={e.status} price={e.total} />
                })}
                
            </ScrollView>
        </View>
    )
}

export default Orders