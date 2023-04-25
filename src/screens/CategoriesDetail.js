import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, PermissionsAndroid, Share, ImageBackground } from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../components/Cards/FeaturedCard';
import Toast from 'react-native-simple-toast';


import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';

import { useRoute } from '@react-navigation/native';
let api = '';

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
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListModals from '../components/Cards/Modals/ListModals';
import { ref, remove, set } from 'firebase/database';
import database from '../../firebaseConfig';
import Fontisto from 'react-native-vector-icons/Fontisto'

const CategoriesDetail = ({ props, route }) => {
  const { details, image, name } = route.params
  const navigation = useNavigation();

  const [user, setUser] = useState([]);
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const { language, setSate, selectedlang, setSelectedlang, setfavoritePodcat_id, setdownloadedPodcastID, setpodcast_id, setmusicdatafordownload, setdownloadedPodcast, UserData } = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const [channelsdata, setchannelsdata] = useState([])
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [downloadItem, setDownloadItem] = useState({});
  const [loaderwhileLoader, setloaderwhileLoader] = useState(false)
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [muusicUrl, setmuusicUrl] = useState(null)

  const fetchFavoritePodcast = async () => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/category-post-app.php?category_id=${details}&lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`;
      const response = await fetch(baseUrl, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      console.log("🚀 ~ file: CategoriesDetail.js:50 ~ fetchFavoritePodcast ~ responseData:", responseData)
      if (responseData) {
        setPodcastData(responseData)

      } else {
        // alert('failed to get fav fav');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }
  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', {
      podcastDetails: {
        acf: { link_podcast1: item?.LINK, imagen_podcast1: item?.IMG },
        id: item.ID,
        title: { rendered: item.TITLE },
      }, Fromlibrary: false
    });
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
    setloaderwhileLoader(true)
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
      let url = item?.LINK;
      let name = item?.TITLE;
      const path = RNFetchBlob.fs.dirs.DownloadDir + `/${name}.mp3`;

      const newObject = {
        ID: item?.ID,
        TITLE: name,
        image: item?.IMG,
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
          setloaderwhileLoader(false)
          navigation.navigate('MyLibrary')
        })
        .catch(err => {
          console.log('error', err);
        })
    } else {
      alert('Permission Not Granted !')
    }
  }

  useEffect(() => {
    fetchFavoritePodcast();
  }, [])
  const getChannels = () => {
    setLoading(true)
    return fetch(`https://socialagri.com/agriFM/wp-json/wp/v2/canales/?lang=${selectedlang}`)
      .then((response) => response.json())
      .then((data) => {
        setchannelsdata(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, 'API Failed');
        setLoading(false)
      });
  }
  useEffect(() => {
    getChannels()
  }, [])

  const download = (item, channelName) => {
    setModalVisible(true);
    setSelectedPodcast({
      acf: {
        id: item.ID,
        imagen_podcast1: item.IMG,
        link_podcast1: item.LINK,
        content: null,
        time: null,
      }, title: { rendered: item.TITLE }, channelName: "", id: item.ID,
    });

    setDownloadItem(item)

    setmuusicUrl(item?.LINK)
    setpodcast_id(JSON.stringify(item?.ID))
    setmusicdatafordownload(item)
    // downloadPodcast(item)s
  }


  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          selectedPodcast?.LINK + ' This Channel has been share form AgriFM app',
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

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPodcast(null);
  }


  const AddPodcastToLiabrary = async () => {
    set(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + selectedPodcast.acf.id), selectedPodcast);
    Toast.show('Podcast Added to liabrary', Toast.LONG);
    setModalVisible(false);

    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favp-app.php?id_user=${UserData[0]?.user}&id_podcast=${selectedPodcast.acf.id}`;
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const string = await response.text();
      const responseData = string === "" ? {} : JSON.parse(string);
      if (responseData[0]?.favoritos_podcast) {



        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)

        // remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + JSON.stringify(selectedPodcast?.id)))
        closeModal();
      } else {
        alert('Failed to add to liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }

    // setLoading(false)
  }

  const RemovePodcastFromLiabrary = async () => {

    // setLoading(true)

    remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + selectedPodcast.acf.id))
    setModalVisible(false);
    Toast.show('Podcast removed from liabrary', Toast.LONG);

    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${selectedPodcast.acf.id}`;
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
        setSelectedPodcast(null);

        // navigation.navigate('MyLibrary')
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
        isVisible={modalVisible}
        onPressClose={() => (setModalVisible(false), setSelectedPodcast(null))}
        onPressaddTo={() => AddPodcastToLiabrary()}
        onPressRemove={() => RemovePodcastFromLiabrary()}
        onClose={() => (setModalVisible(false), setSelectedPodcast(null))}
        onPressDownload={() => downloadPodcast(downloadItem)}
        onPressShare={() => onShare()}
        onPressRemoveDownload={() => RemoveDownload()}
      />
      <View style={styles.imageBox}>
        {/* <Image
          source={{ uri: image }}
          style={{ width: '100%', height: '100%' }}
        /> */}
        <ImageBackground
          source={{ uri: image }}
          style={{ width: '100%', height: '100%', position: "relative" }}
        >
          <TouchableOpacity style={{ paddingLeft: 15, paddingTop: 20}} onPress={() => navigation.goBack()}>
            <Fontisto name="angle-left" color={"white"} size={15} />
          </TouchableOpacity>
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.4)" }}>
            <Text style={{ color: "white", fontWeight: "700", fontSize: 20, marginVertical: 10, textAlign: "center" }}>{name}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.switchComponentsBox}>
        {/* <TouchableOpacity style={podcast == true ? styles.playButtonActive : styles.playButton} onPress={() => [setPodcast(true), setChannels(false)]}>
          <Text style={podcast == true ? styles.buttonTextActive : styles.buttonText}>{language?.Podcasts}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={channels == true ? styles.playButtonActive : styles.playButton} onPress={() => [setChannels(true), setPodcast(false)]}>
          <Text style={channels == true ? styles.buttonTextActive : styles.buttonText}>{language?.Channels}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.playButton}>
          <Ionicons
            name="ios-options-outline"
            color={Colors.primary}
            size={20}
          />
        </TouchableOpacity> */}
      </View>
      {loading ?
        <View style={{ paddingTop: 150 }}>
          <ActivityIndicator size="large" color="purple" />
        </View> : podcast == true ?
          <View style={styles.featuredBox}>

            {podCastData?.length == 0 ?
              <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginTop: '20%', textAlign: 'center' }}>No Podcasts in this Category !</Text>
              :
              podCastData?.map((item) => {
                return (
                  <FeaturedCard
                    onPressDownload={() => downloadPodcast(item)}
                    purpleIcon
                    onPressIcon={() => download(item)}
                    // onPressDownload={()=>downloadPodcast()}
                    onPress={() => trackResetAndNavgate(item)}
                    // channelName={item?.channel_name[0]}
                    // podcastname={item?.title}
                    textstyle={{ color: Colors.primary }}
                    downloadLoading={loaderwhileLoader}
                    headingText={{ color: 'grey' }}
                    timeText={{ color: 'grey' }}
                    podcastname={item?.TITLE}
                    image={item?.IMG}
                  // time={item?.time}
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
    marginHorizontal: 20,
  },
  playButton: {
    padding: 5,
    borderRadius: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.primary,
    alignContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5

  },
  playButtonActive: {
    padding: 5,
    borderRadius: 50,
    width: "100%",
    backgroundColor: Colors.primary,
    alignContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5
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
    marginTop: 10
  }

})

export default CategoriesDetail