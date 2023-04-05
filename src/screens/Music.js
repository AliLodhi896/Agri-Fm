import React,{useState,useContext,useEffect,useCallback} from 'react'
import { StyleSheet, View, Image, Text,ScrollView,Share,PermissionsAndroid } from "react-native"
import Header from "../components/Header/Header";
import Colors from "../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'

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
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Music = ({route}) => {
    const {selectedlang,language,setTracks,setSate,sate,favoritePodcat_id,UserData,setfavoritePodcat_id,settrackForMiniPlayer,setpodcast_id,setdownloadedPodcast,setdownloadedPodcastID} = useContext(AuthContext);
    const {podcastDetails,Fromlibrary}= route.params

    const [channelsdata, setchannelsdata] = useState([])
    const getChannels = () => {
        return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/canales")
              .then((response) => response.json())
              .then((data) =>{ 
                setchannelsdata(data);
              })
              .catch((err) => {
                console.log(err,'API Failed');
              });   
      }
    const [modalVisible, setModalVisible] = useState(false);
    const [podCastData, setPodcastData] = useState([]);
    const navigation = useNavigation();
    const { position, buffered, duration } = useProgress()
    const [muusicUrl, setmuusicUrl] = useState(null)

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
        getChannels()
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

    let stringID = Fromlibrary == false ?  JSON.stringify(podcastDetails?.id) : podcastDetails?.ID

    const trackResetAndNavgate = (item) => {
      TrackPlayer.reset();
      setSate(0)
      navigation.navigate('Music',{podcastDetails:item,Fromlibrary:false});
      setTracks(track)
       TrackPlayer.add([track])
    }

    const fetchData =async () =>{
      try {
        let baseUrl = `https://socialagri.com/agriFM/wp-json/wp/v2/podcast?lang=${selectedlang}`;
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
        }
      } catch (error) {
        console.log('error => ', error);
      }
    }
    const [newpodcast, setnewpodcast] = useState([])
    const fetchNewPodcast =async () =>{
      try {
        let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/podcast-app.php?lang=${selectedlang}`;
        const response = await fetch(baseUrl, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
          },
        });
        const responseData = await response.json();
        if (responseData) {
          setnewpodcast(responseData)
        } else {
        }
      } catch (error) {
        console.log('error => ', error);
      }
    }
      useEffect(() => {
        fetchData();
        fetchNewPodcast()
      },[])

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
            let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
              return  itemxx
            })
            setfavoritePodcat_id(courseName)
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
            let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
              return  itemxx
            })
            setfavoritePodcat_id(courseName)
          } else {
            alert('Failed to remove from liabrary !');
          }
        } catch (error) {
          console.log('error => ', error);
        }
    }

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

const download = (item) => {
  setModalVisible(true);
  setmuusicUrl(item?.acf?.link_podcast1)
  setpodcast_id(JSON.stringify(item?.id))
}

const requestpermissionforDownlaod = async () => {
 
};

const downloadPodcast = async (item) => {
  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Music', 
        message:
          'App needs access to your Files... ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let url = item?.acf?.link_podcast1;
  let name = item?.title?.rendered;
  const path = RNFetchBlob.fs.dirs.DownloadDir+`/${name}.mp3`;
  
  const newObject = {
    ID: item?.id,
    TITLE: item?.title?.rendered,
    image: item?.acf?.imagen_podcast1,
    LINK: path
  }
  const previousData = await AsyncStorage.getItem('musics');
  let data = [];
  if (previousData !== null) {
    data = JSON.parse(previousData);
  }
  data.push(newObject);
  const dataString = JSON.stringify(data);
  await AsyncStorage.setItem('musics', dataString);
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'mp3',
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: name,
      path: path, // Android platform
      description: 'Downloading the file',
    },
  })
    .fetch('GET', url)
    .then(res => {
      console.log('res', res);
      Toast.show('Successfully Downloaded at ' + res.path(), Toast.LONG);
    });
    }
  } catch (err) {
    console.log(err);
  }
  
}
const RemoveDownload = async() => {
  let newItems = downloadedPodcast.filter(e => e?.ID !== podcast_id);

  setdownloadedPodcast(newItems)
  const dataString = JSON.stringify(downloadedPodcast);
  await AsyncStorage.setItem('musics', dataString);
  let newItemsID = downloadedPodcastID.filter(e => e !== podcast_id);
  setdownloadedPodcastID(newItemsID)
  // downloadedPodcastID
  // setdownloadedPodcastID()
}

    return (
        <ScrollView style={styles.mainBox}>
             <ListModals
              isVisible={modalVisible}
              onPressClose={() => setModalVisible(false)}
              onPressaddTo={()=> AddPodcastToLiabrary()}
              onClose={() => setModalVisible(false)}
              onPressDownload={()=>downloadPodcast()}
              onPressShare={()=>onShare()}
              onPressRemoveDownload={()=>RemoveDownload()}
              onPressRemove={()=>RemovePodcastFromLiabrary()}
            />
            <Header icon={true} rightIcon={false} />
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
                        <Text style={styles.mainHeading}>{language?.RelatedPodcast}</Text>
                    </View>
                    {podCastData.slice(0, 5).map((item) => {
                        const match = newpodcast.find(item2 => item2?.id == item?.id);
                        return (
                            <FeaturedCard
                            
                            onPressDownload={()=>downloadPodcast(item)}
                            onPressIcon={()=>download(item)}
                            onPress={() => trackResetAndNavgate(item)}
                            channelName={match?.channel_name}
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