import React, { useState, useEffect, useContext, useCallback } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator,

  Linking,
  Share,
  PermissionsAndroid
} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../components/Cards/FeaturedCard';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ListModals from '../components/Cards/Modals/ListModals';
import { ref, remove, set } from 'firebase/database';
import database from '../../firebaseConfig';
import Toast from 'react-native-simple-toast';

const SeeAll = (props) => {

  const navigation = useNavigation();
  const [podcast, setPodcast] = useState(true)
  const [loading, setLoading] = useState(false)
  const [channels, setChannels] = useState(false)
  const { setmusicdatafordownload, musicdatafordownload, downloadedPodcast, downloadedPodcastID, language, selectedlang, sate, setSate, UserData, setpodcast_id, podcast_id, setfavoritePodcat_id, setdownloadedPodcastID, setdownloadedPodcast } = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const [channelsdata, setchannelsdata] = useState([])
  // const l
  const fetchData = () => {
    setLoading(true)
    return fetch(`https://socialagri.com/agriFM/wp-json/wp/v2/podcast?lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`)
      .then((response) => response.json())
      .then((data) => {
        setPodcastData(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, 'API Failed');
        setLoading(false)
      });
  }

  const getChannels = () => {
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/canales?lang=en")
      .then((response) => response.json())
      .then((data) => {
        setchannelsdata(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, 'API Failed');
      });
  }
  useEffect(() => {
    // getChannels()
    fetchData()
  }, [])
  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', { podcastDetails: item, Fromlibrary: false });
  }


  const [newpodcast, setnewpodcast] = useState([])
  const fetchNewPodcast = async () => {
    try {
      var baseUrl = ''
      if (selectedlang == 'en' || selectedlang == 'es') {
        baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/podcast-app.php?lang=${selectedlang}`;
      } else {
        baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/podcast-app.php?lang=pt-br`;

      }
      const response = await fetch(baseUrl, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log('responseData---------------------------->', responseData)
      if (responseData) {
        setnewpodcast(responseData)
      } else {
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }


  // useEffect(()=>{
  //     fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/?lang=en')
  //     .then(res=>res.json())
  //     .then((data) =>{ 
  //       setInterest(data.length == 0 ? undefined || null : (data));
  //     })
  // },[])

  useFocusEffect(
    useCallback(() => {
      fetchData();
      // getChannels();
      fetchNewPodcast()
    }, []),
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          muusicUrl + ' ' + 'This Podcast has been share from AgriFM app',
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


  const AddPodcastToLiabrary = async () => {
    console.log("🚀 ~ file: SeeAll.js:173 ~ AddPodcastToLiabrary ~ selectedPodcast:", selectedPodcast)
    setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favp-app.php?id_user=${UserData[0]?.user}&id_podcast=${podcast_id}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      setModalVisible(false);
      if (responseData[0].favoritos_podcast) {
        if(selectedPodcast?.yoast_head_json?.twitter_misc){
          delete selectedPodcast?.yoast_head_json?.twitter_misc;
        }

        set(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id), selectedPodcast);


        Toast.show('Podcast Added to liabrary', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)
        // navigation.navigate('MyLibrary')
      } else {
        alert('Failed to add to liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }

  const RemovePodcastFromLiabrary = async () => {
    remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id))
    setModalVisible(false);
    Toast.show('Podcast removed from liabrary', Toast.LONG);

    setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${podcast_id}`;
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
        // navigation.navigate('MyLibrary')
      } else {
        alert('Failed to remove from liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }

  const fetchFavoritePodcast = async () => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/misintereses-app.php?id_user=${UserData[0]?.user}`;
      const response = await fetch(baseUrl, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData) {
        setfavoritePodcast(responseData)
        let courseName = responseData?.map(itemxx => {
          return itemxx.ID
        })
        setfavoritePodcat_id(courseName)
      } else {
        // alert('failed to get fav fav');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }

  useEffect(() => {
    fetchFavoritePodcast();
  }, [podcast_id])

  const download = (item, channelName) => {
    console.log('item', item)
    setSelectedPodcast({ ...item, channelName: channelName });

    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
    setpodcast_id(JSON.stringify(item?.id))
    setmusicdatafordownload(item)
    // downloadPodcast(item)s
  }

  const getDownloadMusic = async () => {
    const value = await AsyncStorage.getItem('musics')
    const parseMusics = JSON.parse(value)
    let courseName = parseMusics?.map(itemxx => {
      return itemxx.ID
    })
    setdownloadedPodcastID(courseName)
    setdownloadedPodcast(parseMusics)
  }
  const downloadPodcast = async (item) => {
    console.log('download by button ', item)
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
      const path = RNFetchBlob.fs.dirs.DownloadDir + `/${name}.mp3`;

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
          getDownloadMusic();
          Toast.show('Successfully Downloaded at ' + res.path(), Toast.LONG);
          navigation.navigate('MyLibrary')
        });
    } else {
      alert('Permission Not Granted !')
    }
  }
  useFocusEffect(
    useCallback(() => {
      getDownloadMusic();
    }, []),
  );
  const RemoveDownload = async () => {
    let newItems = downloadedPodcast.filter(e => e?.ID !== podcast_id);

    setdownloadedPodcast(newItems)
    const dataString = JSON.stringify(downloadedPodcast);
    await AsyncStorage.setItem('musics', dataString);
    let newItemsID = downloadedPodcastID.filter(e => e !== podcast_id);
    setdownloadedPodcastID(newItemsID)
    // downloadedPodcastID
    // setdownloadedPodcastID()
  }








  const [modalVisible, setModalVisible] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [favoritePodcast, setfavoritePodcast] = useState()
  const [selectedPodcast, setSelectedPodcast] = useState(null);



  return (
    <ScrollView style={styles.mainBox}>
      <ListModals
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={() => AddPodcastToLiabrary()}
        onClose={() => setModalVisible(false)}
        onPressDownload={() => download()}
        onPressShare={() => onShare()}
        onPressRemoveDownload={() => RemoveDownload()}
        onPressRemove={() => RemovePodcastFromLiabrary()}
      />
      <Text style={{ paddingTop: 20, paddingLeft: 20, fontSize: 22, fontWeight: "bold", color: "black" }}>{language?.Podcasts}</Text>


      {
        loading ?
          <View style={{ paddingTop: 150 }}>
            <ActivityIndicator size="large" color="blue" />
          </View> :
          podcast == true ?
            <View style={styles.featuredBox}>

              {podCastData?.length == 0 ?
                <Text style={{ fontSize: 20, color: Colors.primary, fontWeight: 'bold', marginTop: '50%', textAlign: 'center' }}>No Podcasts !</Text>
                :
                podCastData?.map((item) => {
                  const match = newpodcast.find(item2 => item2?.id == item?.id);
                  return (
                    <FeaturedCard
                      onPressIcon={() => download(item, match?.channel_name == undefined ? 'agriBusiness International' : match?.channel_name)}
                      onPressDownload={() => downloadPodcast(item)}
                      onPress={() => trackResetAndNavgate(item)}
                      channelName={match?.channel_name == undefined ? 'agriBusiness International' : match?.channel_name}
                      purpleIcon={true}
                      podcastname={item.title?.rendered}
                      textstyle={{ color: Colors.primary }}
                      headingText={{ color: 'grey' }}
                      timeText={{ color: 'grey' }}
                      image={item?.acf?.imagen_podcast1}
                      time={item?.yoast_head_json?.twitter_misc ? Object.values(item?.yoast_head_json?.twitter_misc)[0]: null}
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
  mainBox: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  imageBox: {
    height: 120,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
  cardBox: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20
  },
  switchComponentsBox: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  playButton: {
    padding: 5,
    borderRadius: 50,
    width: 110,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignContent: 'center',
    alignItems: 'center',

  },
  playButtonActive: {
    padding: 5,
    borderRadius: 50,
    width: 110,
    backgroundColor: Colors.primary,
    alignContent: 'center',
    alignItems: 'center',
  },
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '700'
  },
  buttonTextActive: {
    color: Colors.secondary,
    fontWeight: '700'
  },
  featuredBox: {
    marginHorizontal: 10,
    marginTop: 40
  }

})

export default SeeAll