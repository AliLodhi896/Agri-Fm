import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constant/Colors';

const Header = (props) => {
    return (
        <View style={[styles.centeredView, props.style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Fontisto name="angle-left" color={props.style ? Colors.primary : Colors.secondary} size={20} />
                <Text style={[{ color: Colors.secondary, fontSize: 20, marginLeft: 10 , fontWeight : 'bold' }, props.textStyle]}>{props.title}</Text>
            </View>
            <Ionicons name="settings" color={props.icon ? Colors.secondary : Colors.primary} size={20} />
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between'
        , paddingVertical: 20
    },
});

export default Header;