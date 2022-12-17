import { StyleSheet, View } from "react-native"
import SocialModal from "../components/Cards/Modals/SocialModal";
import Colors from "../constant/Colors";

const Profile = () => {
    return (
        <View style={styles.mainBox}>
            {/* <Text>Ayan</Text> */}
            <SocialModal />
        </View>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
})


export default Profile;