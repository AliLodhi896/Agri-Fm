import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View, Image, Text,ScrollView } from "react-native"
import SocialModal from "../components/Cards/Modals/SocialModal";
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
    useTrackPlayerEvents
} from 'react-native-track-player';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    var track = {
        url: podcastDetails?.acf?.link_podcast1, // Load media from the network
        title: podcastDetails?.title?.rendered,
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'http://example.com/cover.png', // Load artwork from the network
        duration: 402 // Duration in seconds
    };

    const setupPlayer = async()=> {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add(track)

    }
    const toggleplay = async(playbackState) => {
        const currentTrack  = await TrackPlayer.getCurrentTrack();
        if(currentTrack !== null){
            if(playbackState == State.Paused){
            await TrackPlayer.play();
            }else{
                await TrackPlayer.pause();
            }
        } 
    }
    const playbackState = usePlaybackState();

    console.log('playbackState',playbackState)

    useEffect(() => {
        setupPlayer();
      },[])


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
                        <Image style={{ height: 22, width: 30 }} source={require('../assets/Images/whiteshare.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
                        </View>
                        <View style={{ marginTop: '5%', justifyContent: 'center', marginLeft: '15%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 27, width: 30 }} source={require('../assets/Images/downloadwhite.png')} />
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
                {/* <FontAwesome name="repeat" size={30} color={'white'} /> */}
                <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay.png')} />
                <TouchableOpacity onPress={()=> toggleplay(playbackState)}>
                    <AntDesign name={playbackState == State.Playing ? "play" : "pause"} size={80} color={'white'} />
                </TouchableOpacity>
                <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay1.png')} />
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Text style={{}} numberOfLines={5}>{podcastDetails?.yoast_head_json?.description}</Text>
                <View style={styles.cardBox}>
                    <View style={styles.headingBox}>
                        <Text style={styles.mainHeading}>{language?.FeaturedPodcasts}</Text>
                    </View>
                    {podcasts.map(() => {
                        return (
                            <FeaturedCard onPressIcon={()=>setModalVisible(true)} />
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