import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Linking,
  Share,
  PermissionsAndroid
} from 'react-native';
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors';
import FeaturedCard from '../components/Cards/FeaturedCard';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import ListModals from '../components/Cards/Modals/ListModals';
import InterestCard from '../components/Cards/InterestCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../context/Context';
import LangModal from '../components/Cards/Modals/LangModal';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
import MiniPlayerCard from '../components/Cards/MiniPlayerCard';
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
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Podcast from '../components/Sections/Podcast';
import { child, onValue, push, ref, remove, set } from 'firebase/database';
import database from '../../firebaseConfig';

const Home = () => {


  const { setmusicdatafordownload, musicdatafordownload, downloadedPodcast, setfavouritePodcasts, downloadedPodcastID, language, selectedlang, sate, setSate, UserData, setpodcast_id, podcast_id, setfavoritePodcat_id, setdownloadedPodcastID, setdownloadedPodcast } = useContext(AuthContext);
  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const [interest, setInterest] = useState([])
  const [loading, setLoading] = useState(false)
  const [channelsdata, setchannelsdata] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [libLoading, setLibLoading] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [favoritePodcast, setfavoritePodcast] = useState()
  const [newpodcast, setnewpodcast] = useState([])
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loaderwhileLoader, setloaderwhileLoader] = useState(false)
  const [channelNamefordownload, setchannelNamefordownload] = useState('')
  // const categories = [
  //   {
  //     id: 2,
  //     name: language?.Poultry,
  //     image: require('../assets/Images/poultry.png'),
  //   },
  //   {
  //     id: 6,
  //     name: language?.Ruminant,
  //     image: require('../assets/Images/ruminant.png'),
  //   },
  //   {
  //     id: 8,
  //     name: language?.Swine,
  //     image: require('../assets/Images/swine.png'),
  //   },
  //   {
  //     id: 4,
  //     name: language?.Nutrition,
  //     image: require('../assets/Images/nutrition.png'),
  //   },
  //   {
  //     id: 8,
  //     name: language?.Aqua,
  //     image: require('../assets/Images/aqua.png'),
  //   },
  //   {
  //     id: 8,
  //     name: selectedlang == 'en' ? 'Others' : 'Otras',
  //     image: require('../assets/Images/aqua.png'),
  //   },
  // ];
  // console.log('selectedlang',selectedlang)

  const focus = useIsFocused();

  const fetchCategories = async () => {
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/category-app-end.php?lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`;
      const response = await fetch(baseUrl, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      const modifiedData = responseData?.map(item => ({ ...item, error: false }))
      setCategories(modifiedData);
    } catch (error) {
      console.log('error => ', error);
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
      // console.log('responseData---------------------------->', responseData)
      if (responseData) {
        setnewpodcast(responseData)
      } else {
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }
  const getChannels = () => {
    setLoading(true)
    return fetch(`https://socialagri.com/agriFM/wp-json/wp/v2/canales/?lang=${selectedlang}&per_page=100`)
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
    fetchCategories();

    fetch(`https://socialagri.com/agriFM/wp-json/wp/v2/intereses/?lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`)
      .then(res => res.json())
      .then((data) => {
        setInterest(data.length == 0 ? undefined || null : (data));
      })
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (focus) {
        fetchData();
        getChannels();
        fetchNewPodcast()
      }
    }, []),
  );
  // useEffect(() => {
  //   fetchData();
  //   getChannels();
  //   fetchNewPodcast()
  // }, [])

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

  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', { podcastDetails: item, Fromlibrary: false });
  }

  const AddPodcastToLiabrary = async () => {
    // console.log(podcast_id);
    // console.log(UserData[0]?.user);
    // console.log(selectedPodcast);



    // setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favp-app.php?id_user=${UserData[0]?.user}&id_podcast=${podcast_id}`;
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      setModalVisible(false);

      if (responseData[0].favoritos_podcast) {
        delete selectedPodcast.yoast_head_json.twitter_misc;

        set(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id), selectedPodcast);

        Toast.show('Podcast Added to liabrary', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return itemxx
        })
        setfavoritePodcat_id(courseName)

        setSelectedPodcast(null);
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

    // setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${podcast_id}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      setModalVisible(false);

      if (responseData[0].favoritos_podcast) {
        remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id))

        Toast.show('Podcast removed from liabrary', Toast.LONG);
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

  function convertToString(value) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number') {
      return value.toString();
    } else {
      return value;
    }
  }


  const fetchFavoritePodcast1 = () => {
    setLibLoading(true);
    const dbRef = ref(database, `Library/Podcasts/${UserData[0]?.user}`);
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      setfavoritePodcast(data || data?.length ? Object.values(data) : []);
      setfavouritePodcasts(data || data?.length ? Object.keys(data) : []);
      setLibLoading(false);
    })
  }

  useEffect(() => {
    if (focus) fetchFavoritePodcast1();
  }, [focus])

  // useEffect(() => {
  //   fetchFavoritePodcast();
  // }, [podcast_id])

  const download = (item, channelName) => {
    setSelectedPodcast({ ...item, channelName: channelName });
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
    setpodcast_id(item?.id)
    setchannelNamefordownload(channelName)
    setmusicdatafordownload(item)
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

  const downloadPodcast = async (item,channelName) => {
    setchannelNamefordownload(channelName)
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
          path: path, // Android platform
          description: 'Downloading the file',
        },
      })
        .fetch('GET', url)
        .then(async res => {
          console.log('res', res);
          const newObject = {
            ID: item?.id,
            TITLE: item?.title?.rendered,
            image: item?.acf?.imagen_podcast1,
            LINK: path,
            CHANNEL_NAME: channelName
          }
          const previousData = await AsyncStorage.getItem('musics');
          let data = [];
          if (previousData !== null) {
            data = JSON.parse(previousData);
            data.push(newObject);
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem('musics', dataString);
          }else{
            data.push(newObject);
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem('musics', dataString);
          }
          getDownloadMusic()
          Toast.show('Successfully Downloaded at ' + res.path(), Toast.LONG);
          setloaderwhileLoader(false)
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
    const dataString = JSON.stringify(newItems);
    await AsyncStorage.setItem('musics', dataString);
    let newItemsID = downloadedPodcastID.filter(e => e !== podcast_id);
    Toast.show('Podcast has been removed from downloads', Toast.LONG);

    setdownloadedPodcastID(newItemsID)
  }

  function obtenNombreCanal(value) {
    for (let i = 0; i < channelsdata.length; i++) {
      if (value == channelsdata[i].id) {
        var nombre = channelsdata[i].name;
        return nombre;
      }
    }
  }

  return (
    <View style={{ backgroundColor: Colors.primary, flex: 1 }}>
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <ScrollView style={styles.mainBox}>
          <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 20 }}>
            <ListModals
              isVisible={modalVisible}
              onPressClose={() => (setModalVisible(false), setSelectedPodcast(null))}
              onPressaddTo={() => AddPodcastToLiabrary()}
              onClose={() => (setModalVisible(false), setSelectedPodcast(null))}
              onPressDownload={() => downloadPodcast(musicdatafordownload)}
              onPressShare={() => onShare()}
              onPressRemoveDownload={() => RemoveDownload()}
              onPressRemove={() => RemovePodcastFromLiabrary()}
            />
            <LangModal
              isVisible={modalVisible2}
              onClose={() => setModalVisible2(false)}
              onPress={() => setModalVisible2(false)}
            />
            <View style={styles.headerBox}>
              <View></View>
              <View style={styles.logoBox}>
                <Image
                  resizeMode='contain'
                  source={require('../assets/Images/logo.png')}
                  style={{ width: '60%', height: '65%' }}
                />
              </View>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() => setModalVisible2(true)}>
                {selectedlang == 'es' ?
                  <Image
                    source={require('../assets/Images/spain-flag.png')}
                    style={{ width: '100%', height: '100%', borderRadius: 100 }}
                  />
                  : selectedlang == 'pt' ?
                    <Image
                      source={require('../assets/Images/brazil-flag.jpg')}
                      style={{ width: '100%', height: '100%', borderRadius: 100 }}
                    />
                    :
                    <Image
                      source={require('../assets/Images/uk-flag.png')}
                      style={{ width: '100%', height: '100%', borderRadius: 100 }}
                    />
                }
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <ScrollView showsHorizontalScrollIndicator={false} style={styles.categoryBox} horizontal>
                {categories.map(item => {
                  return (
                    <TouchableOpacity
                      style={[styles.categories, { marginRight: 3 }]}
                      onPress={() => {
                        navigation.navigate('CategoriesDetail', { details: item.ID })

                      }}>
                      {
                        item.error ?
                          <Image
                            source={{
                              uri: "https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-250x200.png",
                            }}
                            style={{ width: '80%', height: '80%', borderRadius: 100 }}
                          /> : <Image
                            onError={() => { setCategories(prevCategoryState => prevCategoryState.map(c => c.ID === item.ID ? { ...c, error: true } : c)) }}
                            source={{
                              uri: item.IMG,
                            }}
                            style={{ width: '80%', height: '80%', borderRadius: 100 }}
                          />
                      }
                      <Text style={styles.categoriesName}>{item.NAME}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.cardBox}>
              <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>{language?.LastChannels}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SeeAllChannels')}>
                  <Text style={styles.subHeading}>{language?.seeAll}</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.categoryBox} horizontal  >
                {loading == true ?
                  <View style={{ padding: 100, marginLeft: 70 }}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                  :
                  channelsdata?.slice(0, 10).map(item => {
                    return (
                      <ChannelCard
                        onPress={() => navigation.navigate('ChannelDetails', { details: item })}
                        title={item.name}
                        image={item?.acf?.imagen_perfil}
                      // description={item.description}
                      />
                    );
                  })}
              </ScrollView>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.secondary,
                opacity: 0.5,
              }}></View>
            <View style={styles.cardBox} animation="fadeInUpBig">
              <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>{language?.Youarelistening}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SeeAll')}>
                  <Text style={styles.subHeading}>{language?.seeAll}</Text>
                </TouchableOpacity>
              </View>
              {loading == true ?
                <View style={{ padding: 100 }}>
                  <ActivityIndicator size="large" color="white" />
                </View>
                :

                podCastData.slice(0, 5).map((item) => {
                  // const match = newpodcast.find(item2 => item2?.id == item?.id);
                  const match = obtenNombreCanal(item.canales);
                  return (
                    <FeaturedCard
                      onPressDownload={() => downloadPodcast(item,match)}
                      onPressIcon={() => download(item, match)}
                      onPress={() => trackResetAndNavgate(item)}
                      // channelName={match?.channel_name == undefined ? 'Chatting with poultry experts' : match?.channel_name}
                      channelName={match}
                      downloadLoading={loaderwhileLoader}
                      podcastname={item.title?.rendered}
                      image={item?.acf?.imagen_podcast1}
                      id={item?.id}
                    />
                  );
                })}
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.secondary,
                opacity: 0.5,
              }}></View>
            <View style={styles.cardBox} animation="fadeInUpBig">
              <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>{language?.channelofInterest}</Text>
                <Text style={styles.subHeading}>{language?.seeAll}</Text>
              </View>
              <ScrollView style={styles.categoryBox} horizontal  >
                {loading == true ?
                  <View style={{ padding: 100, marginLeft: 70 }}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                  :
                  channelsdata?.slice(0, 10).map(item => {
                    return (
                      <ChannelCard
                        onPress={() => navigation.navigate('ChannelDetails', { details: item })}
                        title={item.name}
                        image={item?.acf?.imagen_perfil}
                      />
                    );
                  })}
              </ScrollView>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.secondary,
                opacity: 0.5,
              }}></View>

          </View>
          <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
            <View style={styles.headingBox}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.primary }}>{language?.YourLiabrary}</Text>
            </View>
            {libLoading == true ?
              <View style={{ padding: 100, marginLeft: 20 }}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
              :
              favoritePodcast?.length == 0 ?
                <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginTop: '20%', textAlign: 'center' }}>No Podcasts In your Liabrary !</Text>
                :
                favoritePodcast?.map((item) => {
                  return (
                    <FeaturedCard
                      onPressDownload={() => downloadPodcast(item)}
                      textstyle={{ color: Colors.primary }}
                      headingText={{ color: 'grey' }}
                      timeText={{ color: 'grey' }}
                      onPressIcon={() => download(item)}
                      onPress={() => trackResetAndNavgate(item)}
                      purpleIcon={true}
                      channelName={item?.channelName}
                      podcastname={item.title?.rendered}
                      image={item?.acf?.imagen_podcast1}
                    />
                  );
                })}


            <View style={styles.headingBox}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.primary }}>{language?.YourInterest}</Text>
            </View>
            <ScrollView horizontal style={styles.interestlList}>
              {interest.map((item) => {
                return <InterestCard onPress={() => navigation.navigate('InterestPodcast', { interest_detail: item })} mainStyle={{ width: 100, marginHorizontal: 10 }} textStyle={{ color: Colors.primary }} description={item.name} img_intereses={item.acf.img_intereses} id={item.id} />;
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      {/* <View style={{ backgroundColor: Colors.primary, bottom: -15 }}> */}
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        {sate !== 0 ?
          <MiniPlayerCard />
          :
          null
        }
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
  },
  image: { width: 100, height: 100, borderRadius: 100, },
  headerBox: {
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoBox: {
    width: '70%',
    height: 60,
    marginLeft: 80,
  },
  iconBox: {
    width: 20,
    height: 20,
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  categoryBox: {
    flexDirection: 'row',
  },
  categories: {
    height: 80,
    width: 80,
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3
  },
  categoriesName: {
    color: Colors.secondary,
  },
  cardBox: {
    marginTop: 40,
    marginBottom: 20,
  },
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
  },
  interestlList: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  edit: { backgroundColor: Colors.button, borderRadius: 100, padding: 5 },
});

export default Home;
