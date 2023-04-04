import React,{useState,useEffect,useContext} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../components/Cards/FeaturedCard';


import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';
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

const SeeAll = (props) => {
  
const navigation = useNavigation();
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const {language, selectedlang, setSelectedlang,sate,setSate} = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const [channelsdata, setchannelsdata] = useState([])
  const fetchData = () => {
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/podcast?lang=en")
          .then((response) => response.json())
          .then((data) =>{ 
            setPodcastData(data);
            setLoading(false)
          })
          .catch((err) => {
            console.log(err,'API Failed');
          });      
  }

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
  fetchData()
}, [])
const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music',{podcastDetails:item,Fromlibrary:false});
  }
  return (
    <ScrollView style={styles.mainBox}>
       
        {podcast == true ?
         <View style={styles.featuredBox}>

         {podCastData?.length == 0 ?
         <Text style={{fontSize:20,color:Colors.primary,fontWeight:'bold',marginTop:'50%',textAlign:'center'}}>No Podcasts !</Text>
         :
         podCastData?.map((item)=>{
           const match = channelsdata.find(item2 => item2?.id == item?.canales[0]);
             return(
               <FeaturedCard
               // onPressIcon={()=>download(item)}
               // onPressDownload={()=>downloadPodcast()}
               onPress={() => trackResetAndNavgate(item)}
               channelName={match?.name}
               purpleIcon={true}
               podcastname = {item.title?.rendered}
               textstyle={{color:Colors.primary}} 
                         headingText={{color:'grey'}} 
                         timeText={{color:'grey'}} 
               image = {item?.acf?.imagen_podcast1}
               time = {Object.values(item?.yoast_head_json?.twitter_misc)[0]}
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
      marginTop:40
    }

})

export default SeeAll