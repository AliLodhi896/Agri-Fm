import React,{useContext,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';


const Channel = (props) => {
    const channelsList = [
        {
            id:1,
            name:'Less is more',
            description:'CEVA'
        },
        {
            id:2,
            name:'Less is more',
            description:'CEVA'
        },
        {
            id:3,
            name:'Less is more',
            description:'CEVA'
        },
      ] ;
  return (
            <View style={styles.interestlList}>
                {channelsList.map((item)=>{
                    return(
                        <ChannelCard mainStyle={{width:180}} title={item.name} titleStyle={{color:Colors.primary,textAlign:'center'}} />
                    );
                })}
            </View>
  )
}
const styles = StyleSheet.create({

      interestlList:{
        marginTop:20,
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'wrap'
    },
});
export default Channel