import React,{useContext,useState,useEffect} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'
import Colors from '../../constant/Colors';

// import Constants
// import components
// import packages
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../../context/Context';
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
import {useNavigation} from '@react-navigation/native';
const MiniPlayerCard = (props) => {
    const {language,tracks,setTracks,setSate,sate,trackForMiniPlayer} = useContext(AuthContext);
    const setupPlayermusic = async()=> {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add([tracks])

        await TrackPlayer.updateOptions({
      stopWithApp: true, 
      jumpInterval: 5,
      alwaysPauseOnInterruption: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      color: 99410543
    });
    }
    useEffect(() => {
        setupPlayermusic();
    },[tracks])

    const toogle = async() => {
        const state = await TrackPlayer.getState();
        setSate(state)
        if (state == State.Playing) {
            TrackPlayer.pause();
        }else{
            TrackPlayer.play();
        }
    }
    const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress={()=>navigation.navigate('Music',{Fromlibrary:false,podcastDetails:trackForMiniPlayer,miniPlayer:true})} style={{backgroundColor:'white',padding:10,flexDirection:'row',borderRadius:10,alignContent:"center",alignItems:'center',justifyContent:"space-between",
}}>
    <View style={styles.imageBox}>
      <Image
          source={{uri: trackForMiniPlayer?.acf?.imagen_podcast1}}
          style={{width: '100%', height: '100%',borderRadius:10,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity:  0.19,
          shadowRadius: 5.62,
          elevation: 6}}
      />
  </View>
      <View style={{width:'50%'}}>
        <Text numberOfLines={1} style={{color:Colors.primary,fontSize:16}}>{trackForMiniPlayer?.acf?.imagen_podcast1}</Text>
      </View>
      <View>
      <TouchableOpacity onPress={()=>toogle()} >
                  <AntDesign name={sate == 2  || sate == 0 ? "play" : "pause"} size={40} color={Colors.primary} />
              </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    },
    imageBox:{
        height:60,
        width:'20%',
        backgroundColor:'white',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 6,
        borderRadius:10
       },
});
export default MiniPlayerCard