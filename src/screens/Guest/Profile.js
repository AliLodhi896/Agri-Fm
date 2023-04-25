import React, {useContext, useState} from 'react';
import { StyleSheet, View,Image,Text,ScrollView,TouchableOpacity,Pressable } from "react-native"
import WhiteButton from '../../components/Buttons/WhiteButton';
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from '../../components/Header/Header';
import Colors from "../../constant/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/Context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../../components/Buttons/CommonButton';

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();
    const {language, selectedlang, setSelectedlang,UserData} = useContext(AuthContext);

    return (
        <ScrollView style={styles.mainBox}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')}  style={styles.second_view} >
                        <MaterialIcons name='close' color={Colors.primary} size={35} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Pressable style={{ paddingBottom: 0, padding: 15 }} >
                            <Image source={require('../../assets/Images/agrim3.png')} resizeMode='cover' style={{ width: 110, height: 110}} />
                        </Pressable>
                        <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: '600' , width : '85%' , textAlign : 'center'}}> {language?.youhavetologin}</Text>
                        <CommonButton onPress={()=>navigation.navigate('VerifyPassword')} green={true} title={language?.Register} />
                        <CommonButton onPress={()=>navigation.navigate('LoginEmail')} title={language?.Login} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'50%'
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        width: '70%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
    },
    second_view: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // padding: 20,
        paddingHorizontal : 15,
        paddingTop : 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    successText: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 15,
        fontFamily: 'Poppins-Regular',
    },
    para: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
})


export default Profile;
