import React, {useState,useContext} from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../../Buttons/CommonButton';
import { AuthContext } from '../../../context/Context';

const ErrorModal = ({ isVisible,onClose, message,onPressLogin },props) => {
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
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
                        <MaterialIcons name='close'  color={Colors.primary} size={35} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30,   width: '100%' }}>
                        <Text style={{ fontSize: 20, color: Colors.primary, fontWeight: '600' , width : '100%' , textAlign : 'center',marginVertical:20}}>{message}</Text>
                        <CommonButton green={true} title='Try Again' />
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
        paddingBottom:30
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

export default ErrorModal;