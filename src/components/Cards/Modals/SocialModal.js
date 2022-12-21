import React, {useState,useContext} from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../../Buttons/CommonButton';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../../context/Context';

const SocialModal = ({ isVisible,onClose, error,onPressLogin }) => {
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    const navigation = useNavigation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.second_view} onPress={onClose}>
                        <MaterialIcons name='close' color={Colors.primary} size={35} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Pressable style={{ paddingBottom: 20, padding: 15 }} onPress={onClose}>
                            <Image source={require('../../../assets/Images/agrim1.png')} resizeMode='stretch' style={{ width: 70, height: 70 }} />
                        </Pressable>
                        <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: '600' , width : '85%' , textAlign : 'center'}}> You have to be login or register to do more</Text>
                        <CommonButton onPress={()=>navigation.navigate('AccountDetails')} green={true} title={language?.Register} />
                        <CommonButton onPress={()=>navigation.navigate('LoginEmail')} title={language?.Login} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default SocialModal;