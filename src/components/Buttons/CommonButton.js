import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../constant/Colors";

const CommonButton = (props) => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            {props.green ?
                <TouchableOpacity style={[styles.mainBox ,props.style]}>
                    <Text style={{ fontWeight: '900', fontSize: 25, textAlign: 'center', color: Colors.secondary }}>{props.title}</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={[styles.otherBox, { marginTop: 0 }]}>
                    <Text style={{ fontWeight: '800', fontSize: 25, textAlign: 'center', color: Colors.primary }}>{props.title}</Text>
                </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainBox: { backgroundColor: Colors.button, padding: 15, width: '80%', borderRadius: 10, marginTop: 20 },
    otherBox: { backgroundColor: Colors.secondary, padding: 20, width: '80%', borderRadius: 10, marginTop: 20 },
})


export default CommonButton;