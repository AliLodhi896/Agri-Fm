import React,{useState,useContext,useEffect,useCallback} from 'react'
import { StyleSheet, View, Image, Text,ScrollView,Share } from "react-native"
import Header from "../components/Header/Header";
import Colors from "../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WhiteButton from "../components/Buttons/WhiteButton";
import FeaturedCard from "../components/Cards/FeaturedCard";
import ListModals from '../components/Cards/Modals/ListModals';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const Music = ({route}) => {
    const {language,setTracks,setSate,sate,favoritePodcat_id,UserData,trackForMiniPlayer,settrackForMiniPlayer} = useContext(AuthContext);
    const {podcastDetails,Fromlibrary}= route.params

    const [modalVisible, setModalVisible] = useState(false);
    const [podCastData, setPodcastData] = useState([]);
    const navigation = useNavigation();

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
          Fromlibrary == false ? podcastDetails?.acf?.link_podcast1 : podcastDetails?.LINK + 'This Podcast has been share form AgriFM app',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const track = {
        id: podcastDetails?.id,
        url: Fromlibrary == false ? podcastDetails?.acf?.link_podcast1 : podcastDetails?.LINK, // Load media from the app bundle
        title:Fromlibrary == false ? podcastDetails?.title?.rendered : podcastDetails?.TITLE,
        artist: 'deadmau5',
        artwork:Fromlibrary == false ? podcastDetails?.acf?.imagen_podcast1 : podcastDetails?.image, // Load artwork from the app bundle
        duration: 166
    };
TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });
TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });
TrackPlayer.addEventListener('remote-jump-forward', () => {
    forward();
  });
TrackPlayer.addEventListener('remote-jump-backward', () => {
    backward();
});

useFocusEffect(
    useCallback(() => {
        setTracks(track)
         TrackPlayer.add([track])
    }, []),
  );
    const setupPlayermusic = async()=> {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add([track])
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
      // Obviously, color property would not work if artwork is specified. It can be used as a fallback.
      color: 99410543
    });
    
    }

    useEffect(() => {
        setupPlayermusic();
        setSate(3)
        TrackPlayer.play();
        settrackForMiniPlayer(podcastDetails)
    },[podcastDetails])
    const toogle = async() => {
        const state = await TrackPlayer.getState();
        setSate(state)
        if (state == State.Playing) {
            TrackPlayer.pause();
        }else{
            TrackPlayer.play();
        }
    }
    const fetchData = () => {
      
        return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/podcast")
              .then((response) => response.json())
              .then((data) =>{ 
                setPodcastData(data);
              })
              .catch((err) => {
                console.log(err,'API Failed');
              });
      }
      useEffect(() => {
        fetchData();
      },[])
    const { position, buffered, duration } = useProgress()
    const forward = () => {
        TrackPlayer.seekTo(position + 15);
    }
    const backward = () => {
        TrackPlayer.seekTo(position - 15);
    }

    const AddPodcastToLiabrary =async () =>{
        try {
          let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favp-app.php?id_user=${UserData[0]?.user}&id_podcast=${Fromlibrary == false ? podcastDetails?.id : podcastDetails?.ID}`;
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          });
          const responseData = await response.json();
          if (responseData[0].favoritos_podcast ) {
            Toast.show('Podcast Added to liabrary', Toast.LONG);
            navigation.navigate('MyLibrary')
          } else {
            alert('Failed to add to liabrary !');
          }
        } catch (error) {
          console.log('error => ', error);
        }
      }
      
    const RemovePodcastFromLiabrary =async () =>{
        try {
          let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${Fromlibrary == false ? podcastDetails?.id : podcastDetails?.ID}`;
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          });
          const responseData = await response.json();
          if (responseData[0].favoritos_podcast ) {
            Toast.show('Podcast removed from liabrary', Toast.LONG);
            navigation.navigate('MyLibrary')
          } else {
            alert('Failed to remove from liabrary !');
          }
        } catch (error) {
          console.log('error => ', error);
        }
    }

    let stringID = Fromlibrary == false ?  JSON.stringify(podcastDetails?.id) : podcastDetails?.ID
    let numberID =  podcastDetails?.ID
    return (
        <ScrollView style={styles.mainBox}>
             <ListModals
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPress={() => setModalVisible(false)}
            />
            <Header icon={true} rightIcon={true} />
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 170, width: 170, borderRadius: 10 }} source={{uri: Fromlibrary == false ? podcastDetails?.acf?.imagen_podcast1 : podcastDetails?.image}} />
                <View style={{ padding: 10 }}>
                    {/* <Text>50 min</Text> */}
                    <Text style={{ width: '45%', color: 'white', fontWeight: 'bold' }}>{Fromlibrary == false ? podcastDetails?.title?.rendered : podcastDetails?.TITLE} </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View  style={{ marginTop: '5%', justifyContent: 'center', width: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>onShare()}>
                        <Image style={{ height: 22, width: 30 }} source={require('../assets/Images/whiteshare.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: '5%', justifyContent: 'center',width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 27, width: 30 }} source={require('../assets/Images/downloadwhite.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>{language?.Download}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {favoritePodcat_id.includes(stringID) && stringID === stringID ?
            <TouchableOpacity onPress={()=>RemovePodcastFromLiabrary()} style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%',justifyContent:'center' }}>
                <AntDesign name="hearto" size={25} color={'white'} />
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>{language?.RemoveFromLibrary}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>AddPodcastToLiabrary()} style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%',justifyContent:'center' }}>
                <AntDesign name="hearto" size={25} color={'white'} />
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>{language?.AddToMyLibrary}</Text>
            </TouchableOpacity>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', alignSelf: 'center', marginTop: '10%' }}>
                <TouchableOpacity onPress={()=> backward()}> 
                    <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> toogle()}>
                    <AntDesign name={sate == 2  || sate == 0 ? "play" : "pause"} size={80} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> forward()}>
                    <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay1.png')} />
                </TouchableOpacity>
            </View>
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                value={position}
                thumbTintColor={Colors.button}
                onSlidingComplete={async(value)=>{
                await TrackPlayer.seekTo(value);
                }}
                />
                <Text style={{}} numberOfLines={5}>{podcastDetails?.yoast_head_json?.description}</Text>
                <View style={styles.cardBox}>
                    <View style={styles.headingBox}>
                        <Text style={styles.mainHeading}>{language?.FeaturedPodcasts}</Text>
                    </View>
                    {podCastData.slice(0, 5).map((item) => {
                        return (
                            <FeaturedCard
                            
                            onPressIcon={()=>setModalVisible(true)}
                            onPress={()=>navigation.navigate('Music',{podcastDetails:item,Fromlibrary:false})}
                            channelName='Channel Name'
              podcastname = {item.title?.rendered}
              image = {item?.acf?.imagen_podcast1}
                            />
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    cardBox: {
        marginTop: 40,
        marginBottom: 20
    },
    headingBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainHeading: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.secondary
    },
})


export default Music;