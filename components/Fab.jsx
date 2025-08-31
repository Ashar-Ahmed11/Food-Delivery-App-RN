import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
const Fab = ({title,icon,id}) => {
    const router = useRouter()
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <View onTouchEnd={() => router.navigate(`/category/${JSON.stringify({title,icon,id})}`)} style={{ paddingHorizontal: 14 }}>
            <View style={{ padding: 15, borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}` }}>
                <FontAwesome5 name={icon} size={28} color={primaryColor} />
            </View>
            <Text style={{ color: secondaryColor, textAlign: "center", paddingVertical: 10 }}>
                {title}
            </Text>
        </View>
    )
}

export default Fab