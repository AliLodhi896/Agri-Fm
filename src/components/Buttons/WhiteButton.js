import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../constant/Colors";

const WhiteButton = (props) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

            <TouchableOpacity style={[styles.mainBox, props.style]}>
                <Text style={{ fontWeight: '900', fontSize: 18, textAlign: 'center', color: Colors.primary }}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBox: { backgroundColor: Colors.secondary, padding: 30, width: '90%', borderRadius: 10, marginTop: 20 },
})


export default WhiteButton;