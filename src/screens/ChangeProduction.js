import React, {useState,useContext} from 'react';
import { StyleSheet, View, Image, Text, TextInput } from "react-native"
import SocialModal from "../components/Cards/Modals/SocialModal";
import Header from "../components/Header/Header";
import Colors from "../constant/Colors";

// ====================== icons ==================== 

import CheckBoxWithLable from "../components/CheckBox/CheckboxWithLable";
import CommonButton from "../components/Buttons/CommonButton";
import CommonBack from "../components/CommonBack";
import { AuthContext } from '../context/Context';

const ChangeProduction = () => {
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    return (
        <View style={styles.mainBox}>
            <Header
                style={{ backgroundColor: 'white', paddingHorizontal: 20 }}
                textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
                backgroundColor={'white'}
                icon={true}
                title={'Change Production'}
            />

            <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: Colors.secondary, marginTop: '20%' }}>{language?.SelectYourProduction}</Text>
            <View style={{ marginHorizontal: '10%', marginTop: '10%' }}>
                <CheckBoxWithLable status={true} lable={'Avicultura'} />
                <CheckBoxWithLable status={true} lable={'Avicultura'} />
                <CheckBoxWithLable status={true} lable={'Avicultura'} />
                <CheckBoxWithLable status={true} lable={'Avicultura'} />
            </View>

            <CommonButton style={{ marginTop: '15%' }} green={true} title={language?.Update} />
            <CommonBack title={language?.GoBack} />

        </View>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    edit: { backgroundColor: Colors.primary, borderWidth: 1, borderRadius: 100, padding: 5 },
    image: { width: 100, height: 100, borderRadius: 100, },
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 }
})


export default ChangeProduction;