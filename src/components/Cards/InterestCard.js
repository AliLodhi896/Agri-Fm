import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';


const InterestCard = (props) => {
    console.log(props.img_intereses)
    console.log(props.id, 'image')
    return (
        <TouchableOpacity style={[styles.mainBox1, props.mainStyle]}>
            {/* <Image
                        source={props.image}
                        style={{width: '100%', height: '100%',borderRadius:10,opacity:0.5}}
                    /> */}
            <Image
                style={{ width: '100%', height: '100%', borderRadius: 10, opacity: 0.5 }}
                source={{ uri: props.img_intereses }}
            />
            <TouchableOpacity
                style={{ position: 'absolute', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={styles.textStyle}>
                    {props.description}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    mainBox1: {
        height: 150,
        width: 150,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',

    }


});
export default InterestCard