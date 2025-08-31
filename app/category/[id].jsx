import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useContext, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalCard from '../../components/horizontalCard'
import AppContext from '../../context/appContext'
const Category = () => {
    const router = useRouter()
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    const {id} = useLocalSearchParams()
    const {title,icon,id:categoryID} = JSON.parse(id)
    const {categoryProducts,getCategoryProduct,setCategoryProducts}  = useContext(AppContext)
    useEffect(() => {
      getCategoryProduct(categoryID)
      return ()=>{
        setCategoryProducts([])
      }
    }, [])
    
   
    
    return (
        <View style={{flex:1}}>
            <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20}}>
                    <View style={{ justifyContent: "center" }}>

                    <Ionicons onPress={()=>router.back()} style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="chevron-back" size={24} color={"black"} />

                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: "black" ,fontFamily:"PoppinsSemibold"}}>
                        {title}
                    </Text>
                   
                </View>
                <View style={{ justifyContent: "center" }}>

                    <Ionicons style={{ padding: 10, borderWidth: 1, borderColor: tertiaryColor, borderRadius: 100 }} name="options-outline" size={24} color={"black"} />

                </View>
            </SafeAreaView>
            <ScrollView>
                {categoryProducts.map(({title,_id,price,image})=>{
                    return  <HorizontalCard key={_id} name={title} id={_id} image={image} price={price} />
                })}
                {/* <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/720"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/721"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/722"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/723"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/724"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/725"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/726"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/727"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/728"} price={"200"} />
                <HorizontalCard name={"Airforce Jumpman"} image={"https://picsum.photos/729"} price={"200"} /> */}
            </ScrollView>
        </View>
    )
}

export default Category