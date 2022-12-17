import React,{useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../components/Cards/FeaturedCard';

import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';

const MyLibrary = () => {
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)


  return (
    <ScrollView style={styles.mainBox}>
        <View style={styles.switchComponentsBox}>
          <TouchableOpacity style={podcast == true ? styles.playButtonActive : styles.playButton} onPress={()=>[setPodcast(true),setChannels(false)]}>
            <Text style={podcast == true ? styles.buttonTextActive : styles.buttonText}>Podcasts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={channels == true ? styles.playButtonActive : styles.playButton} onPress={()=>[setChannels(true),setPodcast(false)]}>
            <Text style={channels == true ? styles.buttonTextActive : styles.buttonText}>Channels</Text>
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
        paddingHorizontal:10,
    },
    cardBox:{
      marginTop:20,
      marginBottom:20,
      marginHorizontal:10
    },
    switchComponentsBox:{
      marginTop:80,
      flexDirection:"row",
      justifyContent:'space-between',
      marginHorizontal:20
    },
    playButton:{
      padding:10,
      borderRadius:50,
      width:100,
      borderWidth:1,
      borderColor:Colors.primary,
      alignContent:'center',
      alignItems:'center',
      
     },
     playButtonActive:{
      padding:10,
      borderRadius:50,
      width:100,
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

export default MyLibrary