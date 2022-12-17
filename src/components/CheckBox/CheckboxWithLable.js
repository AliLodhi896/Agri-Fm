import { View, Text, StyleSheet } from "react-native"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Colors from "../../constant/Colors"

const CheckBoxWithLable = (props) => {
    return (
        <View style={styles.mainView}>

            <View style={styles.iconView}>
                {props.status && <FontAwesome5 name="check" color={'black'} size={20} />}
            </View>
            <Text style={styles.lable}>{props.lable}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    mainView: { flexDirection: 'row', alignItems: 'center' , marginTop : 20 },
    iconView: { backgroundColor: 'white', width: 50, aspectRatio: 1 / 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 20 },
    lable: { fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: Colors.secondary }
})

export default CheckBoxWithLable