import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constant/Colors';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.centeredView, { backgroundColor: Colors.primary, ...props.style }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.playButton} onPress={() => navigation.goBack()}>
                    <Fontisto name="angle-left" color={props.style ? Colors.primary : Colors.secondary} size={20} />
                </TouchableOpacity>
                <Text style={[{ color: props?.txtColor ? props.txtColor : Colors.secondary, fontSize: 20, marginLeft: 10, fontWeight: 'bold' }, props.textStyle]}>{props.title}</Text>
            </View>
            {props.rightIcon == true ?
                <Image style={{ height: 35, width: 35 }} source={require('../../assets/Images/asdsa.png')} />

                :
                null

            }
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
        , paddingVertical: 20
    },
});

export default Header;