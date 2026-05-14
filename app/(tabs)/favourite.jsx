import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavouriteCard from '../../components/favouriteCard';
import AppContext from '../../context/appContext';
const Favourite = () => {
    const router = useRouter()
    const context = useContext(AppContext)
    const {userDetails, isLoggedIn} = context
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
                        Favorite
                    </Text>
                   
                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <ScrollView>
                {
                    isLoggedIn ?
                        userDetails?.favourites.map((e) => {
                            return <FavouriteCard key={e._id} id={e._id} name={e.title} image={e.image} price={e.price} />
                        })
                        :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name="heart-dislike-outline" size={100} color={secondaryColor} />
                            <Text style={{ fontFamily: "PoppinsBold", fontSize: 20, textAlign: "center", marginHorizontal: 20, marginTop: 10, color: secondaryColor }}>Please login to view your favorite items.</Text>
                            <TouchableOpacity onPress={() => router.navigate("signin")} style={{ backgroundColor: primaryColor, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, marginTop: 20 }}>
                                <Text style={{ fontFamily: "PoppinsSemibold", fontSize: 16, color: "white" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                }
            </ScrollView>
        </View>
    )
}

export default Favourite