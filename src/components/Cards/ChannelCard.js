import React,{useContext,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'
import Colors from '../../constant/Colors';

// import Constants
// import components
// import packages

const ChannelCard = (props) => {
  return (
                <TouchableOpacity style={styles.mainBox}>
                    <Image
                        source={require('../../assets/Images/hen1.png')}
                        style={{width: '90%', height: '75%',borderRadius:10}}
                    />
                    <Text style={styles.channelName}>{props.title}</Text>
                    <Text style={styles.channelDescription}>{props.description}</Text>
                </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    mainBox:{
        height:200,
        width:180,
        marginTop:20
    },
    channelName:{
        fontSize:14,
        fontWeight:'700',
        color:Colors.secondary,
        marginTop:10
    },
    channelDescription:{
        fontSize:16,
        fontWeight:'700',
    }
});
export default ChannelCard