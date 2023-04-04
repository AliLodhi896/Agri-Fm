import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, PermissionsAndroid, ActivityIndicator } from 'react-native'
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';
import Header from '../components/Header/Header';
import { AuthContext } from '../context/Context';
import FeaturedCard from '../components/Cards/FeaturedCard';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import ListModals from '../components/Cards/Modals/ListModals';
const InterestPodcast = ({ route }) => {
  const { interest_detail } = route.params
  const navigation = useNavigation();

  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const [interestPodcast, setInterestPodcast] = useState()
  const { UserData, setSate, setpodcast_id, podcast_id, downloadedPodcast, favoritePodcat_id, setfavoritePodcat_id, language, isSignin, selectedlang } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [muusicUrl, setmuusicUrl] = useState(null)

  const InterestPodcast = async () => {
    setLoading(true)
    try {
      // let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/interess-post-app.php?inter_id=${interest_detail.id}`;
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/interess-post-app.php?inter_id=${interest_detail.id}&lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`;
      console.log("🚀 ~ file: InterestPodcast.js:43 ~ InterestPodcast ~ baseUrl:", baseUrl)
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      // console.log("🚀 ~ file: InterestPodcast.js:47 ~ InterestPodcast ~ responseData:", await response.json())
      const responseData = await response.json();
      if (responseData) {
        setInterestPodcast(responseData)
      } else {
      }
      setLoading(false)
    } catch (error) {
      console.log('error => ', error);
      setLoading(false)
    }
  }
  useEffect(() => {
    InterestPodcast()
  }, [])

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
        setPodcastData(responseData)
        // let courseName = responseData?.map(itemxx => {
        //   return  itemxx.ID
        // })
        // setfavoritePodcat_id(courseName)
      } else {
        // alert('failed to get fav fav');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }
  // useEffect(() => {
  //   const interval = setInterval(() => fetchFavoritePodcast(), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };

  // }, [podcast_id])

  const trackResetAndNavgate = (item) => {
    // console.log({
    //   acf: { link_podcast1: item.link_podcast1, imagen_podcast1: item?.imagen_podcast1 },
    //   id: item.id,
    //   title: { rendered: item.title },
    // });
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', {
      podcastDetails: {
        acf: { link_podcast1: item.link_podcast1, imagen_podcast1: item?.imagen_podcast1 },
        id: item.id,
        title: { rendered: item.title },
      }, Fromlibrary: false
    });
  }

  const download = (item) => {
    // setModalVisible(true);
    // setmuusicUrl(item?.acf?.link_podcast1)
    // setpodcast_id(item?.ID)
    // setmusicdatafordownload(item)

    //for guest
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
  }

  const requestpermissionforDownlaod = async () => {
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
        console.log('startDownload...');
        this.startDownload();
        return true;
      } else {
        Toast.show('Permission denied.', Toast.LONG);
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPodcast = async (item) => {
    const permission = await requestpermissionforDownlaod();
    if (!permission) return;
    let url = item?.acf?.link_podcast1;
    let name = item?.title?.rendered;
    const path = RNFetchBlob.fs.dirs.DownloadDir + `/${name}.mp3`;
    const newObject = {
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          muusicUrl + 'This Podcast has been share form AgriFM app',
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
    setModalVisible(false);
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
      if (responseData[0].favoritos_podcast) {
        Toast.show('Podcast Added to liabrary', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)
      } else {
        alert('Failed to add to liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }

  const RemovePodcastFromLiabrary = async () => {
    setModalVisible(false);
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
      // console.log('responseData[0].favoritos_podcast', responseData);
      if (responseData) {
        Toast.show('Podcast removed from liabrary', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)

      } else {
        alert('Failed to remove from liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }
  return (
    <ScrollView style={styles.mainBox}>
      <ListModals
        navigatetolibrary={() => navigation.navigate(language?.Library)}
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={() => isSignin ? AddPodcastToLiabrary() : Toast.show('Please first login to add to library', Toast.LONG)}
        onClose={() => setModalVisible(false)}
        onPressDownload={() => isSignin ? downloadPodcast() : Toast.show('Please first login to download', Toast.LONG)}
        onPressShare={() => onShare()}
      />

      <Header
        style={{ backgroundColor: Colors.lightBackground, paddingHorizontal: 20 }}
        textStyle={{ color: Colors.primary, fontWeight: 'Bold' }}
        icon={true}
        title={interest_detail.name}
      />
      <View style={styles.featuredBox}>
        {
          loading == true ?
            <View style={{ padding: 100 }}>
              <ActivityIndicator size="large" color="blue" />
            </View>
            :
            interestPodcast?.length == 0 ?
              <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginTop: '20%', textAlign: 'center' }}>No Podcasts in this Interest !</Text>
              :
              interestPodcast?.map((item) => {
                return (
                  <FeaturedCard
                    renderHTML
                    //   onPressDownload={()=>downloadPodcast(item)}
                    onPressDownload={() => !isSignin ? Toast.show('Please first login to download', Toast.LONG) : downloadPodcast(item)}
                    onPressIcon={() => download(item)}
                    onPress={() => trackResetAndNavgate(item)}
                    textstyle={{ color: Colors.primary }}
                    headingText={{ color: 'grey' }}
                    timeText={{ color: 'grey' }}
                    //   onPressIcon={()=>download(item)}
                    //   onPress={()=>trackResetAndNavgate(item)}
                    purpleIcon={true}
                    channelName={item?.channel_name[0]}
                    podcastname={item.title}
                    image={item?.imagen_podcast1}
                  />
                );
              })
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  cardBox: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10
  },
  switchComponentsBox: {
    marginTop: 30,
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
  cardBox: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10
  },
  featuredBox: {
    marginHorizontal: 10,
    marginTop: 50
  }

})

export default InterestPodcast