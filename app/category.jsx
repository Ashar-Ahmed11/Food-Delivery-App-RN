import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalCard from '../components/horizontalCard'
const Category = () => {
    const router = useRouter()
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
                        Hamburger
                    </Text>
                   
                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <ScrollView>
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/720"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/721"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/722"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/723"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/724"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/725"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/726"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/727"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/728"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/729"} price={"200"} />
            </ScrollView>
        </View>
    )
}

export default Category