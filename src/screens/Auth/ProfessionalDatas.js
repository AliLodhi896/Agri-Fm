import React, {useState,useContext} from 'react';
import { StyleSheet, View, Image, Text, TextInput } from "react-native"
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";

// ====================== icons ==================== 

import CheckBoxWithLable from "../../components/CheckBox/CheckboxWithLable";
import CommonButton from "../../components/Buttons/CommonButton";
import CommonBack from "../../components/CommonBack";
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/Context';

const ProfessionalDatas = () => {
    const navigation = useNavigation();
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
    <View style={{height:100,marginHorizontal:20,marginTop:30}}>
        <Image style={{ height: '100%', width: '100%' }} source={require('../../assets/Images/last.jpg')} />
    </View>
            <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: Colors.secondary, marginTop: '10%' }}>{language?.SelectYourProduction}</Text>
            <View style={{ marginHorizontal: '10%', marginTop: '10%' }}>
                <CheckBoxWithLable status={true} lable={'Avicultura'} />
                <CheckBoxWithLable status={true} lable={'Swine'} />
                <CheckBoxWithLable status={true} lable={'Ruminant'} />
                <CheckBoxWithLable status={true} lable={'Avicultura'} />
            </View>

            <CommonButton  green={true} onPress={()=>navigation.navigate('SelectInterest')} title={language?.Next} />
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


export default ProfessionalDatas;