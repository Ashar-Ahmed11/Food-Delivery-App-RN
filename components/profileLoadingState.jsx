import { Text, View } from "react-native"
const ProfileLoadingState = () => {
    
    const primaryColor = "#F2994A"
    const tertiaryColor = "#EDEDED"
    const secondaryColor = "#838383"
    return (
        <View style={{ borderRadius: 10, boxShadow: `0px 10px 15px ${tertiaryColor}`, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
            <View >

                <View style={{ paddingVertical: 20, flexDirection: "row" }}>


                
                    <View style={{ width: "80%" }}>
                        <Text style={{ fontFamily: "PoppinsSemibold" }}>
                      
                        </Text>

                    </View>
                </View>
            </View>

        </View>
    )
}

export default ProfileLoadingState