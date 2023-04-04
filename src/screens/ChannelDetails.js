import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Share, ActivityIndicator, PermissionsAndroid } from "react-native"
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
import ChannelCard from "../components/Cards/ChannelCard";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/Context';
import Toast from 'react-native-simple-toast';
import TrackPlayer from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListModals from '../components/Cards/Modals/ListModals';

const ChannelDetails = ({ route }) => {
  const navigation = useNavigation();
  const { language, selectedlang, setSelectedlang, UserData, setSate, podcast_id, setfavoritePodcat_id } = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const { details } = route.params
  const [loading, setLoading] = useState(false)
  const [followedchannels, setfollowedchannels] = useState()
  const [followedID, setfollowedID] = useState([])

  const [modalVisible, setModalVisible] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)

  const fetchFollowedChannels = async () => {
    setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/miscanales-app.php?id_user=${UserData[0]?.user}`;
      const response = await fetch(baseUrl, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData) {
        setfollowedchannels(responseData)
        let courseName = responseData?.map(itemxx => {
          return itemxx.ID
        })
        setfollowedID(courseName)
      } else {
        alert('failed to add to fav');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)


  }

  // alert(route.params.details.id)
  console.log(route.params.details.id);

  const fetchData = () => {
    setLoading(true)
    // return fetch(`https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/channel-post-app.php?canales_id=${route.params.details.id}`)
    return fetch(`https://socialagri.com/agriFM/${selectedlang == "pt" ? "pt-br" : selectedlang}/wp-json/wp/v2/podcast?per_page=100&canales=${route.params.details.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPodcastData(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, 'API Failed');
      });
  }
  useEffect(() => {
    fetchData();
    fetchFollowedChannels();
  }, [])

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          details?.link + 'This Channel has been share form AgriFM app',
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

  const followChannel = async () => {
    setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favc-app.php?id_user=${UserData[0]?.user}&id_canal=${details?.id}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData[0].favoritos_canales) {
        Toast.show('Channel Followed', Toast.LONG);
        navigation.navigate('Home')
        fetchFollowedChannels()
      } else {
        alert(responseData[0].validation);
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }

  const UnfollowChannel = async () => {
    setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${details?.id}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData[0].favoritos_canales) {
        Toast.show('Channel Unfollowed', Toast.LONG);
        navigation.navigate('Home')
        fetchFollowedChannels()
      } else {
        alert(responseData[0].validation);
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }

  const trackResetAndNavgate = (item) => {
    TrackPlayer.reset();
    setSate(0)
    navigation.navigate('Music', {
      podcastDetails: {
        acf: { link_podcast1: item.link_podcast1, imagen_podcast1: item?.imagen_podcast1 },
        id: item.id,
        title: { rendered: item.title },
      }, Fromlibrary: false
    })
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
        // this.startDownload();
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

  const download = (item) => {
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)

  }

  const AddPodcastToLiabrary = async () => {
    setModalVisible(false);
    // setLoading(true)
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
    // setLoading(false)
  }


  return loading ? (
    <View style={{ backgroundColor: Colors.primary, flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <ScrollView style={styles.mainBox}>
      <ListModals
        navigatetolibrary={() => navigation.navigate(language?.Library)}
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
        onPressaddTo={() => AddPodcastToLiabrary()}
        onPressDownload={() => downloadPodcast()}
        onPressShare={() => onShare()}
      />
      <Header icon={true} />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
        <ChannelCard
          style={{ height: 280 }}
          titleStyle={{ textAlign: 'center', marginRight: 15 }}
          title={details.name}
          image={details?.acf?.imagen_perfil}
        />
        <View style={{ flexDirection: 'column', marginTop: 30 }}>
          <TouchableOpacity onPress={() => onShare()}>
            <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: 22, width: 31 }} source={require('../assets/Images/whiteshare.png')} />
              <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onShare()}>
            <View style={{ marginTop: '20%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: 26, width: 28 }} source={require('../assets/Images/with.png')} />
              <Text style={{ fontSize: 12, color: 'white' }}>123</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {followedID?.includes(JSON.stringify(details?.id)) ?
        <TouchableOpacity onPress={() => UnfollowChannel()} style={{ marginTop: -50, backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900', textAlign: 'center' }}>{language?.UnFollow}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => followChannel()} style={{ marginTop: -50, backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900', textAlign: 'center' }}>{language?.Follow}</Text>
        </TouchableOpacity>

      }

      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <Text style={{}} numberOfLines={5}>{details?.yoast_head_json?.description}</Text>

        <View style={styles.cardBox}>
          {loading == true ?
            <View style={{ padding: 100 }}>
              <ActivityIndicator size="large" color="white" />
            </View>
            :
            !podCastData?.length ? <Text style={{ textAlign: "center", paddingTop: 100 }}>No Podcast found.</Text> :
              podCastData?.map((item) => {
                return (
                  <FeaturedCard
                    onPress={() => trackResetAndNavgate(item)}

                    onPressIcon={() => download(item)}
                    onPressDownload={() => downloadPodcast(item)}
                    // channelName='Channel Name'
                    podcastname={item.title}
                    image={item?.imagen_podcast1}
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


export default ChannelDetails;