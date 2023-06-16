import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Share, PermissionsAndroid } from 'react-native'

import Colors from '../constant/Colors'
import SearchInput from '../components/Inputs/SearchInput';
import InterestCard from '../components/Cards/InterestCard';
import Header from '../components/Header/Header';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/Context';
import FeaturedCard from '../components/Cards/FeaturedCard';
import SkeletonLoader from '../components/Loader/Skeleton';
import SkeletonChannelLoader from '../components/Loader/SkeletonChannel';
import ListModals from '../components/Cards/Modals/ListModals';
import Toast from 'react-native-simple-toast';
import TrackPlayer from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, remove, set } from 'firebase/database';
import database from '../../firebaseConfig';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import downloadFile from '../constant/download';

const Explore = ({ navigation }) => {
  const { downloadedPodcastID, downloadedPodcast, setdownloadedPodcast, setdownloadedPodcastID, setmusicdatafordownload, musicdatafordownload, language, selectedlang, setSelectedlang, setSate, UserData, podcast_id, setfavoritePodcat_id, setpodcast_id } = useContext(AuthContext);


  const [loading, setLoading] = useState(false)
  const [interest, setInterest] = useState([])
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchProductCopy, setSearchProductCopy] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelsCopy, setChannelsCopy] = useState([]);
  const [podCastData, setPodcastData] = useState([]);
  const [serachText, setserachText] = useState()
  const [searchLoading, setSearchLoading] = useState(false);
  const [channelLoading, setChannelLoading] = useState(false);
  const [serachInpVal, setSerachInpVal] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [podcastID, setPodcastID] = useState(null);
  const [channelNamefordownload, setchannelNamefordownload] = useState('')
  const [isSearch, setIsSearch] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
    setIsSearch(false);

      setLoading(true)
      fetch(`https://socialagri.com/agriFM/wp-json/wp/v2/intereses/?lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`)
        .then(res => res.json())
        .then((data) => {
          // console.log("🚀 ~ file: Explore.js:47 ~ .then ~ data:", data)
          setInterest(data.length == 0 ? undefined || null : (data));
          // setSearchProduct(data.length == 0 ? undefined || null : (data))
          setLoading(false)
        })

    }
  }, [focus])

  const fetchData = async () => {
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

  const fetchData1 = () => {
    setSearchLoading(true);
    const url = `https://socialagri.com/agriFM/wp-json/wp/v2/podcast/?lang=${selectedlang == "pt" ? "pt-br" : selectedlang}&per_page=100`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log("🚀 ~ file: Explore.js:94 ~ setProducts ~ data:", data)
        setSearchProduct(data)
        setSearchProductCopy(data)
        setSearchLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSearchLoading(false);
      });
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

  const fetchChannels = () => {
    setChannelLoading(true);
    fetch(
      `https://socialagri.com/agriFM/wp-json/wp/v2/canales/?lang=${selectedlang}&per_page=100`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setChannels(responseJson);
        setChannelLoading(false);
        setChannelsCopy(responseJson);

      })
      .catch((error) => {
        console.error(error);
        setChannelLoading(false);
      });
  }

  useEffect(() => {
    // fetchData();
    if (focus) {
      fetchData1();
      fetchChannels();
      fetchNewPodcast()

    }
  }, [focus])

  const setProducts = text => {
    // setSerachInpVal(text);

    if (!text) {
      // setIsSearch(false);
      setSearchProduct(searchProductCopy)

      setserachText('');

      setChannels(channelsCopy);

      return;
    };

    setserachText(text)
    setIsSearch(true);
    // setSearchProduct(interest);


    setSearchProduct(
      searchProductCopy.filter(item =>
        item?.title?.rendered.toLowerCase().includes(text.toLowerCase()),
      ),
    );

    setChannels(
      channelsCopy.filter(item =>
        item?.name?.toLowerCase().includes(text.toLowerCase()),
      ),
    );

  };
  const [activeTab, setactiveTab] = useState(true)

  const renderChannels = () => {
    // const temp = activeTab == false ? channels : channels.slice(0, 10);
    const temp = serachText == '' ? channels : channels.slice(0, 10);

    const searchedChannels = <>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {
          channelLoading ? Array(6).fill().map((_, i) => <SkeletonChannelLoader />) : null
        }
      </View>
      <Animatable.View style={styles.interestlList} animation="fadeInUpBig" >
        {temp.map((item) => {
          return (
            <InterestCard onPress={() => navigation.navigate('ChannelDetails', { details: item })} description={item.name} img_intereses={item.acf.imagen_perfil} id={item.id} />
          );
        })}
      </Animatable.View>

    </>

    if (!temp.length) {
      return <>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 200 }}>
          <Text>No Result</Text>
        </View>
      </>
    }

    return searchedChannels;
  }


  const download = (item, channelName) => {
    setSelectedPodcast({ ...item, channelName: channelName });
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
    setpodcast_id(item?.id)
    setchannelNamefordownload(channelName)
    setmusicdatafordownload(item)
  }


  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          muusicUrl + ' This Podcast has been share from AgriFM app',
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
    // console.log(item);
    // console.log({
    //   acf: { link_podcast1: item?.acf?.link_podcast1, imagen_podcast1: item?.acf?.imagen_podcast1 },
    //   id: item.id,
    //   title: { rendered: item.title?.rendered },
    // });

    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', {
      podcastDetails: {
        acf: { link_podcast1: item?.acf?.link_podcast1, imagen_podcast1: item?.acf?.imagen_podcast1 },
        id: item.id,
        title: { rendered: item.title?.rendered },
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
  const downloadPodcast = async (item, channelName) => {
    setchannelNamefordownload(channelName)
    // setloaderwhileLoader(true)
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
          } else {
            data.push(newObject);
            const dataString = JSON.stringify(data);
            await AsyncStorage.setItem('musics', dataString);
          }
          getDownloadMusic()
          Toast.show('Successfully Downloaded at ' + res.path(), Toast.LONG);
          // setloaderwhileLoader(false)
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

  const renderPodcasts = () => {
    const temp = serachText == '' ? searchProduct : searchProduct.slice(0, 10);

    if (!temp.length) {
      return <>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 200 }}>
          <Text>No Result</Text>
        </View>
      </>
    }

    return temp.map((item, index) => {
      const match = newpodcast.find(item2 => item2?.id == item?.id);
      return (
        <>
          <FeaturedCard
            key={index}
            onPressIcon={() => download(item, match?.channel_name)}
            onPressDownload={() => downloadPodcast(item)}
            onPress={() => trackResetAndNavgate(item)}
            channelName={match?.channel_name}
            podcastname={item.title?.rendered}
            image={item?.acf?.imagen_podcast1}
            link={item?.acf?.link_podcast1}
            id={item?.id}
          />
        </>
      );
    })
  }

  const AddPodcastToLiabrary = async () => {
    // console.log(podcast_id);
    // return;
    // setLoading(true)
    selectedPodcast.channelName = selectedPodcast?.channelName ? selectedPodcast?.channelName : null;
    if (selectedPodcast?.yoast_head_json?.twitter_misc) {
      delete selectedPodcast?.yoast_head_json?.twitter_misc;
    }
    set(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id), selectedPodcast);
    Toast.show('Podcast Added to library', Toast.LONG);
    setModalVisible(false);

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
    // setLoading(false)
  }

  const RemovePodcastFromLiabrary = async () => {
    remove(ref(database, 'Library/Podcasts/' + UserData[0]?.user + "/" + podcast_id))
    Toast.show('Podcast removed from library', Toast.LONG);
    setModalVisible(false);


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

        // closeModal()

      } else {
        alert('Failed to remove from library !');
      }

    } catch (error) {
      console.log('error => ', error);
    }

    setSelectedPodcast(null);

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
  return (
    <ScrollView style={styles.mainBox}  >
      <ListModals
        navigatetolibrary={() => navigation.navigate(language?.Library)}
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={() => AddPodcastToLiabrary()}
        onPressRemoveDownload={() => RemoveDownload()}
        onPressRemove={() => RemovePodcastFromLiabrary()}
        onClose={() => setModalVisible(false)}
        // onPressDownload={() => downloadPodcast(musicdatafordownload)}
        onPressDownload={() => {
          downloadFile(
            selectedPodcast.acf.link_podcast1,
            selectedPodcast?.title?.rendered,
            selectedPodcast.id,
            selectedPodcast.acf.imagen_podcast1,
            selectedPodcast?.channelName,
            getDownloadMusic)
        }}
        onPressShare={() => onShare()}
      />

      <Header icon={true} />
      <View style={styles.searchBar}>
        <SearchInput
          onPressCrosss={() => { setIsSearch(false), setProducts() }}
          // onPressCrosss={() => { setSerachInpVal(''), setProducts(), setserachText(undefined), setactiveTab(true) }}
          placeholder={language?.ExploreOurPodcast}
          value={serachText}
          onChangeText={setProducts}
        />
      </View>
      <View style={styles.cardBox}>
        <View style={styles.headingBox}>
          {!isSearch ?
            <Text style={styles.mainHeading}>{language?.Interests}</Text>
            : null
          }
        </View>

        {
          !isSearch ?
            <>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {
                  channelLoading ? Array(8).fill().map((_, i) => <SkeletonChannelLoader />) : null
                }
              </View>
              <Animatable.View style={styles.interestlList} animation="fadeInUpBig" >
                {interest ? interest.slice(0, 10)?.map((item) => {
                  return (
                    <InterestCard onPress={() => navigation.navigate('InterestPodcast', { interest_detail: item })} description={item.name} img_intereses={item.acf.img_intereses} id={item.id} />
                  );
                }) : null}
              </Animatable.View>
            </>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
              <TouchableOpacity onPress={() => setactiveTab(true)} style={{ borderBottomWidth: activeTab == true ? 2 : null, borderBottomColor: Colors.secondary }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.secondary }}>Podcasts</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setactiveTab(false)} style={{ borderBottomWidth: activeTab == false ? 2 : null, borderBottomColor: Colors.secondary }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.secondary }}>Channels</Text>
              </TouchableOpacity>
            </View>
        }

        {
          isSearch ? <>

            {
              activeTab == false ?
                renderChannels() : null
            }

            {
              activeTab == true ?
                searchLoading ? <>
                  {Array(6).fill().map((_, i) => <SkeletonLoader key={i} />)}
                </> : <>
                  {
                    renderPodcasts()
                  }

                </> : null}

          </> : null
        }



      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
  },
  cardBox: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 25
  },
  headingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary
  },
  interestlList: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },


})

export default Explore