import React, {useState,useContext} from 'react';
import { StyleSheet, View, Image, Text, TextInput,TouchableOpacity,ScrollView } from "react-native"
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import WhiteButton from "../../components/Buttons/WhiteButton";
import Input from "../../components/Input/Input";
import CommonButton from "../../components/Buttons/CommonButton";
import {useNavigation} from '@react-navigation/native';
import CommonBack from "../../components/CommonBack";
import { AuthContext } from '../../context/Context';

const AccountDetails = () => {
    const navigation = useNavigation();
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    const [registration, setRegistration] = useState({Name : '' , Surname:'', Company:'',Phone:''})
    return (
        <ScrollView style={styles.mainBox}>
            <Header
                style={{ backgroundColor: 'white', paddingHorizontal: 20 }}
                textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
                backgroundColor={'white'}
                icon={true}
                title={'Registration'}
            />
            <View style={{height:100,marginHorizontal:20,marginTop:30}}>
        <Image style={{ height: '100%', width: '100%' }} source={require('../../assets/Images/first.jpg')} />
    </View>
            <View style={{marginVertical:30}}>
            <TextInput style={styles.input} onChangeText={(username)=>{setRegistration(prev => ({...prev, Name: username})) }} placeholder ={language?.Name} />
                <TextInput style={styles.input} onChangeText={(username)=>{setRegistration(prev => ({...prev, Surname: username})) }} placeholder ={language?.Surname} />
                <TextInput style={styles.input} onChangeText={(username)=>{setRegistration(prev => ({...prev, Company: username})) }}placeholder ={language?.Company} />
                <TextInput style={styles.input} onChangeText={(username)=>{setRegistration(prev => ({...prev, Phone: username})) }} placeholder ={language?.Phone} />


                <View style={{marginVertical:30}}>
                    <CommonButton  green={true} onPress={()=>navigation.navigate('UserData',{form:registration})} title={language?.Next} />
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
    welcome: { color: Colors.secondary, fontSize: 25, fontWeight: '800', marginTop: 20 },
    input: { backgroundColor: 'white', marginTop: 20, marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 20, borderRadius: 8, fontSize: 16, color: Colors.placeholder }
})


export default AccountDetails;

