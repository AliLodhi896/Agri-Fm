import React, {useContext, useState} from 'react';
import { StyleSheet, View } from "react-native"
import SocialModal from "../components/Cards/Modals/SocialModal";
import Colors from "../constant/Colors";

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={styles.mainBox}>
            <SocialModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPress={() => setModalVisible(false)}
            />
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