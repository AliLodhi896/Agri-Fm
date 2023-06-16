import React, {useState,useContext} from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../../Buttons/CommonButton';
import { AuthContext } from '../../../context/Context';
import {english, spain, brazil} from '../../../constant/language';

const LangModal = ({ isVisible,onClose, error,onPress }) => {
    const {language, selectedlang, setSelectedlang,setLanguage} = useContext(AuthContext);
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
                    <TouchableOpacity style={styles.second_view}  onPress={onClose}>
                        <MaterialIcons name='close' color={Colors.primary} size={27} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30,   width: '100%',    alignItems: 'center',marginTop:'40%'}}>
                    <TouchableOpacity style={styles.flagBox} onPress={()=>{setLanguage(spain),setSelectedlang('es')}}>
                        <Image
                            source={require('../../../assets/Images/spain-flag.png')}
                            style={{width: '100%', height: '100%',borderRadius:100}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flagBox} onPress={()=>{setLanguage(brazil),setSelectedlang('pt')}}>
                        <Image
                            source={require('../../../assets/Images/brazil-flag.jpg')}
                            style={{width: '100%', height: '100%',borderRadius:100}}
                        />
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.flagBox} onPress={()=>{setLanguage(english),setSelectedlang('en')}}>
                        <Image
                            source={require('../../../assets/Images/uk-flag.png')}
                            style={{width: '100%', height: '100%',borderRadius:100}}
                        />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    flagBox: {
        borderRadius: 100,
        width: 90,
        height: 90,
        marginTop: 30,
      },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        backgroundColor: 'white',
        height:'90%',
        alignItems: 'center',
        shadowColor: '#000',
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
        paddingBottom:30,
      
    },
    second_view: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 20,
        paddingHorizontal : 15,
        paddingTop : 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent:'space-between'
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

export default LangModal;