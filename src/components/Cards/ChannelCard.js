import React,{useContext,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'
import Colors from '../../constant/Colors';

// import Constants
// import components
// import packages

const ChannelCard = (props) => {
  return (
                <View style={[styles.mainBox,props.mainStyle]}>
                    <TouchableOpacity style={[styles.subBox,props.style]} onPress={props.onPress}>
                    {props.staticimg == true ?
                        <Image
                            source={{uri: 'https://images.socialagri.com/agriFM/wp-content/uploads/2022/10/20155206/agriBusiness-500x500-1.jpg'}}
                            style={{width: '100%', height: '63%',borderRadius:10}}
                        />
                        :
                        <Image
                            source={{uri: props.image}}
                            style={{width: '100%', height: '63%',borderRadius:10}}
                        />
                    }
                    <Text style={[styles.channelName,props.titleStyle]}>{props.title}</Text>
                    <Text style={[styles.channelDescription,props.descriptionStyle]}>{props.description}</Text>
                </TouchableOpacity>
                </View>
  )
}
const styles = StyleSheet.create({
    mainBox:{
        height:'auto',
        width:190,
        marginTop:20,
    },
    subBox:{
        marginHorizontal:10,
        height:250
    },
    channelName:{
        fontSize:14,
        fontWeight:'700',
        color:Colors.secondary,
        marginTop:10,
        marginLeft:20
    },
    channelDescription:{
        fontSize:16,
        fontWeight:'700',
        marginHorizontal:20,
        color:'grey'
    }
});
export default ChannelCard