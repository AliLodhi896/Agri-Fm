import { StyleSheet, TextInput } from "react-native"
import Colors from "../../constant/Colors"

const Input = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            style={styles.input}
            placeholderTextColor={Colors.placeholder}
        />
    )
}

export default Input

const styles = StyleSheet.create({
    input: { backgroundColor: 'white', marginTop: 20, marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 20, borderRadius: 8, fontSize: 16, color: Colors.placeholder }
})