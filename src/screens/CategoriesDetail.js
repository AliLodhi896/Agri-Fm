import React, {useState,useContext} from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../components/Cards/FeaturedCard';

import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';
import { AuthContext } from '../context/Context';

const CategoriesDetail = () => {
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);


  return (
    <ScrollView style={styles.mainBox}>
        <View style={styles.imageBox}>
            <Image
                source={require('../assets/Images/water.png')}
                style={{width: '100%', height: '100%'}}
            />
        </View>
        <View style={styles.switchComponentsBox}>
          <TouchableOpacity style={podcast == true ? styles.playButtonActive : styles.playButton} onPress={()=>[setPodcast(true),setChannels(false)]}>
            <Text style={podcast == true ? styles.buttonTextActive : styles.buttonText}>{language?.Podcasts}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={channels == true ? styles.playButtonActive : styles.playButton} onPress={()=>[setChannels(true),setPodcast(false)]}>
            <Text style={channels == true ? styles.buttonTextActive : styles.buttonText}>{language?.Channels}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons
                  name="ios-options-outline"
                  color={Colors.primary}
                  size={20}
              />
          </TouchableOpacity>
        </View>
        {podcast == true ?
          <Podcast />
          :
          <Channel />
        }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        backgroundColor:Colors.secondary,
    },
    imageBox:{
        height:120,
        width:'100%',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    textStyle:{
        textAlign:'center',
        color:'white',
    },
    cardBox:{
      marginTop:20,
      marginBottom:20,
      marginHorizontal:20
    },
    switchComponentsBox:{
      marginTop:20,
      flexDirection:"row",
      justifyContent:'space-between',
      marginHorizontal:20
    },
    playButton:{
      padding:5,
      borderRadius:50,
      width:110,
      borderWidth:1,
      borderColor:Colors.primary,
      alignContent:'center',
      alignItems:'center',
      
     },
     playButtonActive:{
      padding:5,
      borderRadius:50,
      width:110,
      backgroundColor:Colors.primary,
      alignContent:'center',
      alignItems:'center',
     },
     headingBox:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    buttonText:{
      color:Colors.primary,
      fontWeight:'700'
    },
    buttonTextActive:{
      color:Colors.secondary,
      fontWeight:'700'
    }

})

export default CategoriesDetail