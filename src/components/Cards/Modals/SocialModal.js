import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../../Buttons/CommonButton';

const SocialModal = ({ isVisible,onClose, error }) => {
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
                    <View style={styles.second_view}>
                        <MaterialIcons name='close' color={Colors.primary} size={35} />
                    </View>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Pressable style={{ paddingBottom: 20, padding: 15 }} onPress={onClose}>
                            <Image source={require('../../../assets/Images/logo.png')} resizeMode='stretch' style={{ width: 70, height: 70 }} />
                        </Pressable>
                        <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: '600' , width : '85%' , textAlign : 'center'}}> You have to be login o register to do more</Text>
                        <CommonButton green={true} title={'Register'} />
                        <CommonButton title={'Login'} />
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