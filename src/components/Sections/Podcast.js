import React,{useContext,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';


const Podcast = (props) => {
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
      const podcasts = [
        {
            id:1,
        },
        {
            id:2,
        },
        {
            id:3,
        },
        {
          id:4,
        },
        {
            id:5,
        },
      ];
  return (
    <View>
          <View style={styles.cardBox}>
                  <ScrollView style={styles.categoryBox} horizontal>
                      {channelsList.map((item)=>{
                          return(
                              <ChannelCard title={item.name}  description={item.description} titleStyle={{color:Colors.primary}} />
                          );
                      })
                      }
                  </ScrollView>
          </View> 
          <View style={styles.cardBox}>
                {podcasts.map(()=>{
                    return(
                        <FeaturedCard 
                          textstyle={{color:Colors.primary}} 
                          headingText={{color:'grey'}} 
                          timeText={{color:'grey'}} 
                        />
                    );
                })}
          </View> 
        </View>
  )
}
const styles = StyleSheet.create({
    cardBox:{
        marginTop:20,
        marginBottom:20,
        marginHorizontal:10
      },
    
});
export default Podcast