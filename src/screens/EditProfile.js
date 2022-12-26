import React, {useState,useContext} from 'react';
import { StyleSheet, View, Image, Text, TextInput,TouchableOpacity,ScrollView } from "react-native"
import SocialModal from "../components/Cards/Modals/SocialModal";
import Header from "../components/Header/Header";
import Colors from "../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import WhiteButton from "../components/Buttons/WhiteButton";
import Input from "../components/Input/Input";
import CommonButton from "../components/Buttons/CommonButton";
import { AuthContext } from '../context/Context';

const EditProfile = () => {
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    return (
        <ScrollView style={styles.mainBox}>
            <Header
                style={{ backgroundColor: 'white', paddingHorizontal: 20 }}
                textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
                backgroundColor={'white'}
                icon={true}
                title={'Edit Profile'}
            />

            <View style={{marginVertical:30}}>
                <Input placeholder ={language?.ActualName} />
                <Input placeholder ={language?.ActualSurname} />
                <Input placeholder ={language?.ActualCompany} />
                <Input placeholder ={language?.ActualMobilePhone} />

                <Input placeholder ={language?.NewJob} />
                <Input placeholder ={language?.NewActivity} />
                <Input placeholder ={language?.NewLanguage} />
                <Input placeholder ={language?.NewCountry} />
                <View style={{marginVertical:30}}>
                    <CommonButton  green={true} title={language?.Update} />
                    <Text style={{marginTop:20,textAlign:'center',fontSize:16,color:'white',fontWeight:'bold'}}>Cancel</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
        // paddingHorizontal: 20,
    },
    edit: { backgroundColor: Colors.primary, borderWidth: 1, borderRadius: 100, padding: 5 },
    image: { width: 100, height: 100, borderRadius: 100, },
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 }
})


export default EditProfile;

const data = [
    {
        key: 'Mobile',
        value: '+44444'
    },
    {
        key: 'Company',
        value: 'Testing'
    },
    {
        key: 'Job',
        value: 'Full time'
    },
    {
        key: 'Activity',
        value: 'Media'
    },
    {
        key: 'Production',
        value: 'Avicultura'
    },
    {
        key: 'Details',
        value: 'list of intrestList of intrests'
    },
    {
        key: 'List of intrests',
    },
    {
        key: 'List of intrests',
    },
    {
        key: 'List of intrests',
    },
    {
        key: 'List of intrests',
    },
    {
        key: 'List of intrests',
    },
]