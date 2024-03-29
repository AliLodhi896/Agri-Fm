import React, { useContext, useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, Share, PermissionsAndroid, ActivityIndicator, Alert } from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Context';
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
import ListModals from '../Cards/Modals/ListModals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { onValue, ref, remove } from 'firebase/database';
import database from '../../../firebaseConfig';
import downloadFile from '../../constant/download';
import removeDownloadFile from '../../constant/removeDownload';

const Podcast = (props) => {
  const { UserData, setSate, setpodcast_id, podcast_id, setTracks, firstMusicPlay, downloadedPodcast, favoritePodcat_id, setfavoritePodcat_id, setdownloadedPodcastID, setdownloadedPodcast, downloadedPodcastID, language } = useContext(AuthContext);
  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fromDownload, setFromDownload] = useState(false);
  const [podcastLoading, setPodcastLoading] = useState(false);
  const [loading, setLoading] = useState(false)
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [musicdatafordownload, setmusicdatafordownload] = useState({})

  let filteredArr = downloadedPodcast?.filter(value => {
    return value?.ID !== undefined;
  });

  const focus = useIsFocused();

  // const fetchFavoritePodcast = async () => {
  //   console.log(UserData[0]?.user);
  //   setPodcastLoading(true);
  //   try {
  //     let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/misintereses-app.php?id_user=${UserData[0]?.user}`;
  //     const response = await fetch(baseUrl, {
  //       method: 'Get',
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     });
  //     const responseData = await response.json();
  //     // console.log("🚀 ~ file: Podcast.js:51 ~ fetchFavoritePodcast ~ responseData:", responseData)
  //     if (responseData) {
  //       setPodcastData(responseData)
  //       // let courseName = responseData?.map(itemxx => {
  //       //   return  itemxx.ID
  //       // })
  //       // setfavoritePodcat_id(courseName)
  //     } else {
  //       // alert('failed to get fav fav');
  //     }
  //     setPodcastLoading(false);
  //   } catch (error) {
  //     console.log('error => ', error);
  //     setPodcastLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   const interval = setInterval(() => fetchFavoritePodcast(), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };

  // }, [podcast_id])

  const fetchFavoritePodcast1 = () => {
    const dbRef = ref(database, `Library/Podcasts/${UserData[0]?.user}`);
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      setPodcastData(data || data?.length ? Object.values(data) : [])
    })
  }

  useEffect(() => {
    if (focus) fetchFavoritePodcast1();
  }, [focus])

  // useEffect(() => {
  //   if (focus) {
  //     const dbRef = ref(database, "Library");
  //     onValue(dbRef, (snapshot) => {
  //       let data = snapshot.val();
  //       console.log("🚀 ~ file: Podcast.js:87 ~ onValue ~ data:", data)
  //     })
  //   };
  // }, [focus])

  const trackResetAndNavgate = (item) => {
    const itemID = item?.acf?.id ? item?.acf?.id : item?.ID ? item?.ID : item?.id;

    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', {
      podcastDetails: {
        acf: { link_podcast1: item?.acf.link_podcast1, imagen_podcast1: item?.acf.imagen_podcast1 },
        id: itemID,
        title: { rendered: item.title.rendered },
      }, Fromlibrary: false
    });

    const track = {
      id: itemID,
      url: item?.acf.link_podcast1,
      title: item.title.rendered,
      artist: 'deadmau5',
      artwork: item?.acf.imagen_podcast1,
      duration: 166
    };

    setTracks(track)
    TrackPlayer.add([track])

  }

  const trackResetAndNavgateDownload = (item) => {
    // console.log("🚀 ~ file: Podcast.js:136 ~ trackResetAndNavgateDownload ~ item:", item);
    // return
    const itemID = item?.acf?.id ? item?.acf?.id : item?.ID ? item?.ID : item?.id;

    RNFS.exists(item?.LINK)
      .then(exists => {
        if (exists) {

          TrackPlayer.reset();
          setSate(0)
          navigation.navigate('Music', {
            podcastDetails: {
              acf: { link_podcast1: item?.LINK, imagen_podcast1: item?.image },
              id: itemID,
              title: { rendered: item.TITLE },
            }, Fromlibrary: false, pause: !firstMusicPlay ? true : false
          });

        } else {
          console.log('File does not exist.');

          Alert.alert('File Not Found', 'Do you want to delete podcast?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Delete', onPress: () => removeDownloadFile(itemID, getDownloadMusic) },
          ]);

        }

      })
      .catch(error => {
        console.log(error);
        Toast.show('Error parsing file try again. ', Toast.SHORT);
      });



  }

  // console.log('item', podcast_id)

  const download = (item, download = false) => {
    // console.log(item.id);
    // console.log(item.acf);
    // console.log(item.channelName);
    // return;
    // musicdatafordownload
    setFromDownload(download)
    const itemID = item?.acf?.id ? item?.acf?.id : item?.ID ? item?.ID : item?.id;
    // console.log(itemID);
    // return;
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
    setpodcast_id(itemID)
    setmusicdatafordownload(item)
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPodcast = async (item) => {
    await requestpermissionforDownlaod();
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
  const RemoveDownload = async () => {
    let newItems = downloadedPodcast.filter(e => e?.ID !== podcast_id);

    setdownloadedPodcast(newItems)
    const dataString = JSON.stringify(newItems);
    await AsyncStorage.setItem('musics', dataString);
    let newItemsID = downloadedPodcastID.filter(e => e !== podcast_id);
    setdownloadedPodcastID(newItemsID)
    // downloadedPodcastID
    // setdownloadedPodcastID()
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          muusicUrl + ' This Podcast has been share form AgriFM app',
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
        Toast.show('Podcast Added to library', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)
      } else {
        alert('Failed to add to library !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }

  const RemovePodcastFromLiabrary = async () => {
    // console.log(UserData[0]?.user);
    // console.log(podcast_id);
    // return;
    setModalVisible(false);
    setLoading(true)

    remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id))
    setLoading(false)

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

        Toast.show('Podcast removed from library', Toast.LONG);
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
  }
  // const download = (item, channelName) => {
  //   setModalVisible(true);
  //   setmuusicUrl(item?.acf?.link_podcast1)
  //   setpodcast_id(item?.id)
  //   // setchannelNamefordownload(channelName)
  //   setmusicdatafordownload(item)
  //   // downloadPodcast(item)s
  // }
  // console.log('downloadedPodcast', downloadedPodcast)
  const getDownloadMusic = async () => {
    const value = await AsyncStorage.getItem('musics')
    const parseMusics = JSON.parse(value)
    let courseName = parseMusics?.map(itemxx => {
      return itemxx.ID
    })
    setdownloadedPodcastID(courseName)
    setdownloadedPodcast(parseMusics)
    // TrackPlayer.play()
  }

  useEffect(() => {
    if (focus) {
      let filteredArr = downloadedPodcast?.filter(value => {
        return value?.ID !== undefined;
      });
      if (!filteredArr?.length) {
        setModalVisible(false)
      }

    }
  }, [downloadedPodcast])

  useFocusEffect(
    React.useCallback(() => {

      return () => setModalVisible(false);
    }, [])
  );

  return (
    <View>
      <ListModals
        removeOnlyLib
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={() => AddPodcastToLiabrary()}
        onClose={() => setModalVisible(false)}
        // onPressDownload={() => downloadPodcast()}
        onPressDownload={() => {
          downloadFile(musicdatafordownload.acf.link_podcast1, musicdatafordownload?.title?.rendered, musicdatafordownload.id, musicdatafordownload.acf.imagen_podcast1, musicdatafordownload?.channelName, getDownloadMusic)
        }}
        onPressShare={() => onShare()}
        onPressRemoveDownload={() => RemoveDownload()}
        onPressRemove={() => RemovePodcastFromLiabrary()}
        addRemoveLib={fromDownload}
      />
      <View style={styles.cardBox}>
        <Text style={{ fontSize: 20, color: Colors.primary, fontWeight: 'bold' }}>Your Downloads</Text>
        {filteredArr?.length == 0 || filteredArr == null ?
          <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginVertical: '20%', textAlign: 'center' }}>No Podcasts In your Downloads !</Text>
          :
          downloadedPodcast?.map((item) => {
            console.log('item', item)
            if (!item?.image || !item?.ID || !item.TITLE) return;
            return (
              <FeaturedCard
                // onPressDownload={()=>downloadPodcast(item)}
                textstyle={{ color: Colors.primary }}
                headingText={{ color: 'grey' }}
                timeText={{ color: 'grey' }}
                onPressIcon={() => download(item, true)}
                onPress={() => trackResetAndNavgateDownload(item)}
                purpleIcon={true}
                channelName={item?.CHANNEL_NAME}
                podcastname={item.TITLE}
                image={item?.image}
                id={item?.ID}
              />
            );
          })}
      </View>
      <View style={styles.featuredBox}>
        <Text style={{ fontSize: 20, color: Colors.primary, fontWeight: 'bold', marginTop: 20 }}>{language?.YourLiabrary}</Text>

        {
          podcastLoading ? (
            <View style={{ paddingTop: 150 }}>
              <ActivityIndicator size="large" color="purple" />
            </View>
          ) :
            podCastData.length == 0 ?
              <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginTop: '20%', textAlign: 'center' }}>No Podcasts In your Liabrary !</Text>
              :
              podCastData.map((item) => {
                // console.log('lib item >>>>>>>>>>>>>', item?.acf?.link_podcast1);
                return (
                  <FeaturedCard
                    onPressDownload={() => downloadPodcast(item)}
                    textstyle={{ color: Colors.primary }}
                    headingText={{ color: 'grey' }}
                    timeText={{ color: 'grey' }}
                    onPressIcon={() => download(item)}
                    onPress={() => trackResetAndNavgate(item)}
                    purpleIcon={true}
                    channelName={item.channelName}
                    podcastname={item.title.rendered}
                    image={item?.acf?.imagen_podcast1}
                    link={item?.acf?.link_podcast1}
                    id={item.id}
                  />
                );
              })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cardBox: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10
  },
  featuredBox: {
    marginBottom: 20,
    marginHorizontal: 10,
    marginTop: -30
  }

});
export default Podcast