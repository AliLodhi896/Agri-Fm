import React, { useState, useContext, useEffect, useCallback } from 'react'
import { StyleSheet, View, Image, Text, ScrollView, Share, PermissionsAndroid, ActivityIndicator } from "react-native"
import Header from "../components/Header/Header";
import Colors from "../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'

import FeaturedCard from "../components/Cards/FeaturedCard";
import ListModals from '../components/Cards/Modals/ListModals';
import { AuthContext } from '../context/Context';
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
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../firebaseConfig';
import { ref, remove, set } from 'firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import downloadFile from '../constant/download';
import removeDownloadFile from '../constant/removeDownload';
import { navigate } from '../constant/navigationServices';

const Music = ({ route }) => {
  const { downloadedPodcast, downloadedPodcastID, podcast_id, setmusicdatafordownload, favouritePodcasts, musicdatafordownload, selectedlang, language, setTracks, setSate, sate, favoritePodcat_id, UserData, setfavoritePodcat_id, settrackForMiniPlayer, setpodcast_id, setdownloadedPodcast, setdownloadedPodcastID, setFirstMusicPlay } = useContext(AuthContext);
  const { podcastDetails, Fromlibrary } = route.params
  const [channelNamefordownload, setchannelNamefordownload] = useState('')
  const [channelsdata, setchannelsdata] = useState([])

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
  const [modalVisible, setModalVisible] = useState(false);
  const [podCastData, setPodcastData] = useState([]);
  const navigation = useNavigation();
  const { position, buffered, duration } = useProgress()
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [showLoader, setShowLoader] = useState(null);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPodcast(null);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  };

  const track = {
    id: podcastDetails?.id,
    url: Fromlibrary == false ? podcastDetails?.acf?.link_podcast1 : podcastDetails?.LINK, // Load media from the app bundle
    title: Fromlibrary == false ? podcastDetails?.title?.rendered : podcastDetails?.TITLE,
    artist: 'deadmau5',
    artwork: Fromlibrary == false ? podcastDetails?.acf?.imagen_podcast1 : podcastDetails?.image, // Load artwork from the app bundle
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
      TrackPlayer.play();

    }, []),
  );
  const setupPlayermusic = async () => {
    // await TrackPlayer.setupPlayer()
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
  }, [podcastDetails])

  useEffect(() => {
    setFirstMusicPlay(true);
    // setShowLoader(true);
    // setTimeout(() => {
    //   setShowLoader(false);
    // }, 100);
  }, [])

  const toogle = async (alwaysPause) => {
    if (route.params?.pause) {
      route.params.pause = false;
    }
    const state = await TrackPlayer.getState();
    setSate(alwaysPause ? 0 : state)
    if (state == State.Playing || alwaysPause) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  let stringID = Fromlibrary == false ? JSON.stringify(podcastDetails?.id) : podcastDetails?.ID

  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', { podcastDetails: item, Fromlibrary: false });
    setTracks(track)
    TrackPlayer.add([track])
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
    fetchNewPodcast()
  }, [])

  const forward = () => {
    TrackPlayer.seekTo(position + 15);
  }
  const backward = () => {
    TrackPlayer.seekTo(position - 15);
  }


  const AddPodcastToLiabrary = async (directBtn) => {
    // console.log(favouritePodcasts);
    // console.log(stringID);
    // return;
    let reqData = {};
    if (directBtn) {
      reqData = podcastDetails;
    } else {
      reqData = selectedPodcast;
    }
    const itemID = reqData?.acf?.id ? reqData?.acf?.id : reqData?.ID ? reqData?.ID : reqData?.id;
    // console.log(itemID);

    // return;
    if (reqData?.yoast_head_json?.twitter_misc) delete reqData.yoast_head_json.twitter_misc;
    set(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + JSON.stringify(itemID)), reqData);
    Toast.show('Podcast Added to library', Toast.LONG);
    setModalVisible(false);


    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favp-app.php?id_user=${UserData[0]?.user}&id_podcast=${itemID}`;
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData[0].favoritos_podcast) {


        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)
        closeModal()
      } else {
        alert('Failed to add to library !');
      }
    } catch (error) {
      console.log('error => ', error);
    }

    setSelectedPodcast(null);

  }

  const RemovePodcastFromLiabrary = async (directBtn) => {
    let reqData = {};
    if (directBtn) {
      reqData = podcastDetails;
    } else {
      reqData = selectedPodcast;
    }
    const itemID = reqData?.acf?.id ? reqData?.acf?.id : reqData?.ID ? reqData?.ID : reqData?.id;

    remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + JSON.stringify(itemID)))
    Toast.show('Podcast removed from library', Toast.LONG);
    closeModal()

    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${itemID}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData[0].favoritos_podcast) {


        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)

      } else {
        alert('Failed to remove from library !');
      }
    } catch (error) {
      console.log('error => ', error);
    }

    setSelectedPodcast(null);

  }

  const getDownloadMusic = async () => {
    const value = await AsyncStorage.getItem('musics')
    const parseMusics = JSON.parse(value)
    let courseName = parseMusics?.map(itemxx => {
      return itemxx.ID
    })
    setdownloadedPodcastID(courseName)
    setdownloadedPodcast(parseMusics)
    TrackPlayer.play()
  }

  const getDownloadMusic1 = async () => {
    const value = await AsyncStorage.getItem('musics')
    const parseMusics = JSON.parse(value)
    let courseName = parseMusics?.map(itemxx => {
      return itemxx.ID
    })
    setdownloadedPodcastID(courseName)
    setdownloadedPodcast(parseMusics)
  }

  const downloadPodcast = async (item, channelName) => {
    // setloaderwhileLoader(true)
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Music',
        message:
          'App needs access to your Files... ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let url = item?.acf?.link_podcast1;
      let name = item?.title?.rendered;
      const path = RNFetchBlob.fs.dirs.DownloadDir + `/${name}.mp3`;
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp3',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: name,
          path: path,
          description: 'Downloading the file',
        },
      })
        .fetch('GET', url)
        .then(async res => {
          // console.log('res', res);
          const newObject = {
            ID: item?.id,
            TITLE: item?.title?.rendered,
            image: item?.acf?.imagen_podcast1,
            LINK: path,
            CHANNEL_NAME: channelName ? channelName : ""
          }
          const previousData = await AsyncStorage.getItem('musics');
          let data = [];
          if (previousData !== null) {
            data = JSON.parse(previousData);
            data.push(newObject);
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem('musics', dataString);
          } else {
            data.push(newObject);
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem('musics', dataString);
          }
          getDownloadMusic()
          Toast.show('Successfully Downloaded at ' + res.path(), Toast.LONG);
          // setloaderwhileLoader(false)
          navigation.navigate('MyLibrary')
        })
        .catch(err => {
          alert('Error: ')
          console.log(err);
        })
    } else {
      alert('Permission Not Granted !')
    }
  }

  useFocusEffect(
    useCallback(() => {
      getDownloadMusic();
    }, []),
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          Fromlibrary == false ? podcastDetails?.acf?.link_podcast1 : podcastDetails?.LINK + ' This Podcast has been share form AgriFM app',
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
  const download = (item, channelName) => {
    const itemID = item?.acf?.id ? item?.acf?.id : item?.ID ? item?.ID : item?.id;

    setSelectedPodcast({ ...item, channelName: channelName.channel_name });
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
    setpodcast_id(itemID)
    setchannelNamefordownload(channelName)
    setmusicdatafordownload(item)
  }
  const RemoveDownload = async () => {
    let newItems = downloadedPodcast.filter(e => e?.ID !== podcast_id);
    setdownloadedPodcast(newItems)
    const dataString = JSON.stringify(newItems);
    await AsyncStorage.setItem('musics', dataString);
    let newItemsID = downloadedPodcastID.filter(e => e !== podcast_id);
    Toast.show('Podcast has been removed from downloads', Toast.LONG);

    setdownloadedPodcastID(newItemsID)
  }

  const pauseTrack = async () => {
    navigate(language?.Home, { pauseMusic: true })
    toogle(true);
  }


  return (
    <ScrollView style={styles.mainBox}>
      <ListModals
        isVisible={modalVisible}
        onPressClose={closeModal}
        onClose={closeModal}
        // onPressDownload={() => downloadPodcast(musicdatafordownload)}
        onPressDownload={() => {
          downloadFile(musicdatafordownload.acf.link_podcast1, musicdatafordownload?.title?.rendered, musicdatafordownload.id, musicdatafordownload.acf.imagen_podcast1, musicdatafordownload?.channelName, getDownloadMusic)
          // getDownloadMusic();
        }}
        onPressShare={() => onShare()}
        onPressaddTo={() => AddPodcastToLiabrary()}
        onPressRemoveDownload={() => RemoveDownload()}
        onPressRemove={() => RemovePodcastFromLiabrary()}
      />
      <Header icon={true} rightIcon={false} />
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ height: 170, width: 170, borderRadius: 10 }} source={{ uri: Fromlibrary == false ? podcastDetails?.acf?.imagen_podcast1 : podcastDetails?.image }} />
        <View style={{ padding: 10 }}>
          {/* <Text>50 min</Text> */}
          <Text style={{ width: '45%', color: 'white', fontWeight: 'bold' }}>{Fromlibrary == false ? podcastDetails?.title?.rendered : podcastDetails?.TITLE} </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginTop: '5%', justifyContent: 'center', width: 70, alignItems: "center", justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => onShare()} style={{ alignItems: "center" }} >
                <Image style={{ height: 22, width: 30 }} source={require('../assets/Images/whiteshare.png')} />
                <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
              </TouchableOpacity>
            </View>
            {
              downloadedPodcastID?.includes(podcastDetails.id) && podcastDetails.id === podcastDetails.id ? <>
                <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => {
                    removeDownloadFile(podcastDetails.id, getDownloadMusic1, pauseTrack)
                  }} style={{ alignItems: "center", justifyContent: "center", }}>
                    {/* <Image style={{ height: 27, width: 30 }} source={require('../assets/Images/downloadwhite.png')} /> */}
                    <Ionicons
                      name="ios-cloud-download-outline"
                      color={'green'}
                      size={27}
                    />
                    <Text style={{ fontSize: 12, color: 'green', textAlign: "center" }}>Remove download</Text>
                  </TouchableOpacity>
                </View>
              </> :
                <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => {
                    downloadFile(podcastDetails.acf.link_podcast1, podcastDetails?.title?.rendered, podcastDetails.id, podcastDetails.acf.imagen_podcast1, podcastDetails?.channelName, getDownloadMusic)
                    // getDownloadMusic();
                  }} style={{ alignItems: "center" }}>
                    <Image style={{ height: 27, width: 30 }} source={require('../assets/Images/downloadwhite.png')} />
                    <Text style={{ fontSize: 12, color: 'white' }}>{language?.Download}</Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
      </View>
      {/* {favoritePodcat_id.includes(stringID) && stringID === stringID ? */}
      {favouritePodcasts.includes(stringID) && stringID === stringID ?
        <TouchableOpacity onPress={() => RemovePodcastFromLiabrary(true)} style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%', justifyContent: 'center' }}>
          <AntDesign name="hearto" size={25} color={'white'} />
          <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>{language?.RemoveFromLibrary}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => AddPodcastToLiabrary(true)} style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%', justifyContent: 'center' }}>
          <AntDesign name="hearto" size={25} color={'white'} />
          <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>{language?.AddToMyLibrary}</Text>
        </TouchableOpacity>
      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', alignSelf: 'center', marginTop: '10%' }}>
        <TouchableOpacity onPress={() => backward()}>
          <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toogle()}>
          {
            duration < 1 ?
              <ActivityIndicator size={80} color="white" /> :
              <AntDesign name={sate == State.Playing ? "play" : "pause"} size={80} color={'white'} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => forward()}>
          <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay1.png')} />
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
        <Text style={{}} numberOfLines={5}>{podcastDetails?.yoast_head_json?.description}</Text>
        <View style={styles.cardBox}>
          <View style={styles.headingBox}>
            <Text style={styles.mainHeading}>{language?.RelatedPodcast}</Text>
          </View>
          {podCastData.slice(0, 5).map((item) => {
            const match = newpodcast.find(item2 => item2?.id == item?.id);
            return (
              <FeaturedCard
                // onPressDownload={() => downloadPodcast(item)}
                onPressIcon={() => download(item, match)}
                onPress={() => trackResetAndNavgate(item)}
                channelName={match?.channel_name}
                podcastname={item.title?.rendered}
                image={item?.acf?.imagen_podcast1}
                link={item.acf.link_podcast1}
                id={item?.id}
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