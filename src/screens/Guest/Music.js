import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View, Image, Text,ScrollView } from "react-native"
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WhiteButton from "../../components/Buttons/WhiteButton";
import FeaturedCard from "../../components/Cards/FeaturedCard";
import ListModals from '../../components/Cards/Modals/ListModals';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {useNavigation,useFocusEffect} from '@react-navigation/native';

const Music = ({route}) => {
    const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    const {podcastDetails}= route.params

    const podcasts = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
    ];
    const [modalVisible, setModalVisible] = useState(false);
    const [podCastData, setPodcastData] = useState([]);
    const navigation = useNavigation();

    const track = {
        url: podcastDetails?.acf?.link_podcast1, // Load media from the app bundle
        title: podcastDetails?.title?.rendered,
        artist: 'deadmau5',
        artwork: podcastDetails?.acf?.imagen_podcast1, // Load artwork from the app bundle
        duration: 166
    };


// Add an event listener for the 'remote-play' event
TrackPlayer.addEventListener('remote-pause', () => {
    // Handle the 'remote-play' event
    TrackPlayer.pause();
  });
  // Add an event listener for the 'remote-play' event
TrackPlayer.addEventListener('remote-play', () => {
    // Handle the 'remote-play' event
    TrackPlayer.play();
  });

    // Add an event listener for the 'remote-play' event
TrackPlayer.addEventListener('remote-jump-forward', () => {
    // Handle the 'remote-play' event
    forward();
  });
    // Add an event listener for the 'remote-play' event
TrackPlayer.addEventListener('remote-jump-backward', () => {
    // Handle the 'remote-play' event
    backward();

  });


    const setupPlayermusic = async()=> {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add(track)
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
    },[])
    const [sate, setSate] = useState(0)
    const toogle = async() => {
        // setupPlayermusic();
        const state = await TrackPlayer.getState();
        setSate(state)
        console.log('state',state)
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
    return (
        <ScrollView style={styles.mainBox}>
             <ListModals
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPress={() => setModalVisible(false)}
            />
            <Header icon={true} rightIcon={true} />
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 170, width: 170, borderRadius: 10 }} source={{uri: podcastDetails?.acf?.imagen_podcast1}} />
                <View style={{ padding: 10 }}>
                    {/* <Text>50 min</Text> */}
                    <Text style={{ width: '45%', color: 'white', fontWeight: 'bold' }}>{podcastDetails?.title?.rendered} </Text>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginTop: '5%', justifyContent: 'center', width: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 22, width: 30 }} source={require('../../assets/Images/whiteshare.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
                        </View>
                        <View style={{ marginTop: '5%', justifyContent: 'center', marginLeft: '15%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 27, width: 30 }} source={require('../../assets/Images/downloadwhite.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>{language?.Download}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%',justifyContent:'center' }}>
                <AntDesign name="hearto" size={25} color={'white'} />
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>{language?.AddToMyLibrary}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', alignSelf: 'center', marginTop: '10%' }}>
                <TouchableOpacity onPress={()=> backward()}> 
                    <Image style={{ height: 32, width: 30 }} source={require('../../assets/Images/replay.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> toogle()}>
                    <AntDesign name={sate == 2  || sate == 0 ? "play" : "pause"} size={80} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> forward()}>
                    <Image style={{ height: 32, width: 30 }} source={require('../../assets/Images/replay1.png')} />
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
                            onPress={()=>navigation.navigate('Music',{podcastDetails:item})}
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