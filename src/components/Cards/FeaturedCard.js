import React,{useContext,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'
import Colors from '../../constant/Colors';

// import Constants
// import components
// import packages

const ChannelCard = (props) => {
  return (
    <View style={styles.featuredCards}>
    <View style={styles.imageBox}>
        <Image
            source={require('../assets/Images/hen1.png')}
            style={{width: '100%', height: '100%',borderRadius:10}}
        />
    </View>
    <View styles={styles.detailBox}>
        <View style={styles.channelnameBox}>
            <Text style={styles.channelname}>Channel Name</Text>
        </View>
        <View style={styles.descriptionBox}>
            <Text style={styles.description}>Testing: Dessxription of featured podcast</Text>
        </View>
        <View style={styles.cardiconBox}>
            <View style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}> 
                <TouchableOpacity style={styles.playButton}>
                    <Text >Play</Text>
                </TouchableOpacity>
                <Text style={styles.timeText}>45:00</Text>
            </View>
            <View>
            <Ionicons
                name="ios-cloud-download-outline"
                color="white"
                size={25}
            />
            </View>
        </View>
    </View>
</View>
  )
}
const styles = StyleSheet.create({
    featuredCards:{
        flexDirection:'row',
        marginTop:20
       },
       imageBox:{
        height:100,
        width:'30%'
       },
       detailBox:{
        marginHorizontal:20
       },
       channelnameBox:{
        marginHorizontal:10,
        flexDirection:'row'
       },
       descriptionBox:{
        width:'85%',
        marginHorizontal:10,
       },
       description:{
            fontSize:16,
            fontWeight:'600',
            color:Colors.secondary
       },
       cardiconBox:{
        flexDirection:'row',
        marginHorizontal:10,
        alignContent:'center',
        alignItems:"center",
        marginTop:10,
        justifyContent:'space-between',
        width:'60%',
       },
       playButton:{
        backgroundColor:Colors.button,
        padding:5,
        borderRadius:50,
        width:80,
        alignItems:'center'
       },
       timeText:{
        marginLeft:10
       }
    
    
});
export default ChannelCard