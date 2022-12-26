import React, {useState,useContext} from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CommonButton from '../../Buttons/CommonButton';
import { AuthContext } from '../../../context/Context';

const ListModals = ({ isVisible,onClose, error,onPressLogin }) => {
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
                        <MaterialIcons name='close' color={Colors.primary} size={27} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30,   width: '100%' }}>
                        <TouchableOpacity style={styles.second_view} onPress={onClose}>
                            <Text style={{color:Colors.primary,fontSize:16}}>
                            {language?.GoToLibrary}
                            </Text>
                            <Image style={{width: '12%', height: 25}} source={require('../../../assets/Images/asdsa.png')} />
                        </TouchableOpacity>
                        <View style={{height:1,backgroundColor:Colors.primary,opacity:0.5,marginTop:15}}></View>
                        <TouchableOpacity style={styles.second_view} onPress={onClose}>
                            <Text style={{color:Colors.primary,fontSize:16}}>
                            {language?.DownloadPodcast}
                            </Text>
                            <Image  style={{width: '12%', height: 27}} source={require('../../../assets/Images/downlaod.png')} />
                        </TouchableOpacity>
                        <View style={{height:1,backgroundColor:Colors.primary,opacity:0.5,marginTop:15}}></View>
                        <TouchableOpacity style={styles.second_view} onPress={onClose}>
                            <Text style={{color:Colors.primary,fontSize:16}}>
                            {language?.Share}
                            </Text>
                            <Image  style={{width: '12%', height: 20}} source={require('../../../assets/Images/shares.png')} />
                        </TouchableOpacity>
                        <View style={{height:1,backgroundColor:Colors.primary,opacity:0.5,marginTop:15}}></View>

                        <TouchableOpacity style={styles.second_view} onPress={onClose}>
                            <Text style={{color:Colors.primary,fontSize:16}}>
                            {language?.AddToLibrary}
                            </Text>
                            <Image style={{width: '12%', height: 25}} source={require('../../../assets/Images/fav.png')} />
                        </TouchableOpacity>
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

export default ListModals;