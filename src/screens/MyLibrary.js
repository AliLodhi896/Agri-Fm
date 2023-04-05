import React,{useState,useContext,useEffect} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';
import Header from '../components/Header/Header';
import { AuthContext } from '../context/Context';

const MyLibrary = () => {
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const {language, selectedlang, setSelectedlang,setdownloadedPodcastID,setdownloadedPodcast,downloadedPodcast} = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [musicdatafordownload, setmusicdatafordownload] = useState()



  return (
    <ScrollView style={styles.mainBox}>
            <Header
                style={{ backgroundColor:Colors.lightBackground, paddingHorizontal: 20 }}
                textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
                icon={true}
                title={language.MyLibrary}
            />
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
    cardBox:{
      marginTop:20,
      marginBottom:20,
      marginHorizontal:10
    },
    switchComponentsBox:{
      marginTop:30,
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

export default MyLibrary