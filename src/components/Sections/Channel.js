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
                        <ChannelCard descriptionStyle={{marginHorizontal:0}} mainStyle={{width:180}} style={{marginHorizontal:0}} title={item.name} description={item.description} titleStyle={{color:Colors.primary,marginLeft:0}} />
                    );
                })}
            </View>
  )
}
const styles = StyleSheet.create({

      interestlList:{
        marginTop:10,
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'wrap',
        marginHorizontal:10
    },
});
export default Channel