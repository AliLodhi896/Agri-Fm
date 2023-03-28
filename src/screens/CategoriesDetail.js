import React,{useState,useEffect,useContext} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../components/Cards/FeaturedCard';


import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';

import { useRoute } from '@react-navigation/native';
let api = '';

import { AuthContext } from '../context/Context';
import TrackPlayer,{
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior 
} from 'react-native-track-player';
import {useNavigation,useFocusEffect} from '@react-navigation/native';

const CategoriesDetail = ({props,route}) => {
const {details} = route.params
const navigation = useNavigation();

  const [user, setUser] = useState([]);
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const [channelsdata, setchannelsdata] = useState([])

  const fetchFavoritePodcast =async () =>{
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/category-post-app.php?category_id=${details}`;
      const response = await fetch(baseUrl, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData) {
        setPodcastData(responseData)
        
      } else {
        // alert('failed to get fav fav');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }
  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music',{podcastDetails:item,Fromlibrary:false});
  }
  useEffect(() => {
    fetchFavoritePodcast();
  },[])
  const getChannels = () => {
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/canales?lang=en")
          .then((response) => response.json())
          .then((data) =>{ 
            setchannelsdata(data);
            setLoading(false)
          })
          .catch((err) => {
            console.log(err,'API Failed');
          });   
  }
  useEffect(() => {
    getChannels()
  }, [])
  
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
          <View style={styles.featuredBox}>

          {podCastData?.length == 0 ?
          <Text style={{fontSize:16,color:Colors.primary,fontWeight:'bold',marginTop:'20%',textAlign:'center'}}>No Podcasts in this Category !</Text>
          :
          podCastData?.map((item)=>{
              return(
                <FeaturedCard
                // onPressIcon={()=>download(item)}
                // onPressDownload={()=>downloadPodcast()}
                // onPress={() => trackResetAndNavgate(item)}
                channelName={item?.channel_name[0]}
                podcastname = {item?.title}
                textstyle={{color:Colors.primary}} 
                          headingText={{color:'grey'}} 
                          timeText={{color:'grey'}} 
                image = {item?.imagen_podcast1}
                time = {item?.time}
              />
              );
          })}
    </View> 
          :
          <Channel user={user} />
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
    },
    featuredBox:{
      marginHorizontal:10,
      marginTop:10
    }

})

export default CategoriesDetail