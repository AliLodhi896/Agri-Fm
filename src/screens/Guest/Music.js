import React, { useState, useContext, useEffect, useCallback } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, Share } from "react-native"
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";
import Toast from 'react-native-simple-toast';

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WhiteButton from "../../components/Buttons/WhiteButton";
import FeaturedCard from "../../components/Cards/FeaturedCard";
import ListModals from '../../components/Cards/Modals/ListModals';
import { AuthContext } from '../../context/Context';
import TrackPlayer, {
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Music = ({ route }) => {
  const { language, tracks, setTracks, setSate, sate, trackForMiniPlayer, settrackForMiniPlayer, selectedlang } = useContext(AuthContext);
  const [channelsdata, setchannelsdata] = useState([])
  const { podcastDetails } = route.params
  // console.log("🚀 ~ file: Music.js:35 ~ Music ~ podcastDetails:", podcastDetails)

  const getChannels = () => {
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/canales")
      .then((response) => response.json())
      .then((data) => {
        setchannelsdata(data);
      })
      .catch((err) => {
        console.log(err, 'API Failed');
      });
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          podcastDetails?.acf?.link_podcast1 + ' ' + 'This Podcast has been share form AgriFM app',
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
  const [modalVisible, setModalVisible] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)

  const [podCastData, setPodcastData] = useState([]);
  const navigation = useNavigation();

  const track = {
    id: podcastDetails?.id,
    url: podcastDetails?.acf?.link_podcast1, // Load media from the app bundle
    title: podcastDetails?.title?.rendered,
    artist: 'deadmau5',
    artwork: podcastDetails?.acf?.imagen_podcast1, // Load artwork from the app bundle
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
  const setupPlayermusic = async () => {
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
  }, [podcastDetails])

  const toogle = async () => {
    const state = await TrackPlayer.getState();
    setSate(state)
    if (state == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }
  const fetchData = async () => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-json/wp/v2/podcast?lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`;
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
  const fetchNewPodcast = async () => {
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
    getChannels()
    fetchNewPodcast()
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const { position, buffered, duration } = useProgress()
  // let position_minutes = Math.floor(position / 60);
  // let duration_minutes = Math.floor(duration / 60);

  const forward = () => {
    TrackPlayer.seekTo(position + 15);
  }
  const backward = () => {
    TrackPlayer.seekTo(position - 15);
  }
  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', { podcastDetails: item });
    setTracks(track)
    TrackPlayer.add([track])
  }


  const download = (item) => {
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
  }

  return (
    <ScrollView style={styles.mainBox}>
      <ListModals
        navigatetolibrary={() => navigation.navigate(language?.Library)}
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={() => {
          Toast.show('Please first login to add to library', Toast.LONG);
        }}
        onClose={() => setModalVisible(false)}
        onPressDownload={() => {
          Toast.show('Please first login to download', Toast.LONG);
        }}
        onPressShare={() => onShare()}
      />
      <Header icon={true} rightIcon={false} />
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ height: 170, width: 170, borderRadius: 10 }} source={{ uri: podcastDetails?.acf?.imagen_podcast1 }} />
        <View style={{ padding: 10 }}>
          {/* <Text>50 min</Text> */}
          <Text style={{ width: '45%', color: 'white', fontWeight: 'bold' }}>{podcastDetails?.title?.rendered} </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginTop: '5%', justifyContent: 'center', width: 70, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => onShare()} style={{ alignItems: "center"}}>
                <Image style={{ height: 22, width: 30 }} source={require('../../assets/Images/whiteshare.png')} />
                <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {
                Toast.show('Please first login to download', Toast.LONG);
              }}>
                <Image style={{ height: 27, width: 30 }} source={require('../../assets/Images/downloadwhite.png')} />
                <Text style={{ fontSize: 12, color: 'white' }}>{language?.Download}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%', justifyContent: 'center' }}>
        <AntDesign name="hearto" size={25} color={'white'} />
        <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>{language?.AddToMyLibrary}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', alignSelf: 'center', marginTop: '10%' }}>
        <TouchableOpacity onPress={() => backward()}>
          <Image style={{ height: 32, width: 30 }} source={require('../../assets/Images/replay.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toogle()}>
          <AntDesign name={sate == 2 || sate == 0 ? "play" : "pause"} size={80} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => forward()}>
          <Image style={{ height: 32, width: 30 }} source={require('../../assets/Images/replay1.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {/* {position_minutes} minutes */}
            {formatTime(position)}
          </Text>

          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {/* {duration_minutes} minutes */}
            {formatTime(duration)}
          </Text>
        </View>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          value={position}
          thumbTintColor={Colors.button}
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold' }} numberOfLines={5}>{podcastDetails?.yoast_head_json?.description}</Text>
        <View style={styles.cardBox}>
          <View style={styles.headingBox}>
            <Text style={styles.mainHeading}>{language?.RelatedPodcast}</Text>
          </View>
          {podCastData.slice(0, 5).map((item) => {
            const match = newpodcast.find(item2 => item2?.id == item?.id);
            return (
              <FeaturedCard

                // onPressIcon={()=>setModalVisible(true)}
                // onPress={()=>navigation.navigate('Music',{podcastDetails:item})}
                onPressIcon={() => download(item)}
                onPressDownload={() => {
                  Toast.show('Please first login to download', Toast.LONG);
                }}
                onPress={() => trackResetAndNavgate(item)}
                channelName={match?.channel_name}
                podcastname={item.title?.rendered}
                image={item?.acf?.imagen_podcast1}
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