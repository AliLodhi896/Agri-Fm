import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Share, ImageBackground } from 'react-native'
import ChannelCard from '../../components/Cards/ChannelCard';
import Colors from '../../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../../components/Cards/FeaturedCard';
import Toast from 'react-native-simple-toast';


import Podcast from '../../components/Sections/Podcast';
import Channel from '../../components/Sections/Channel';


import { useRoute } from '@react-navigation/native';
let api = '';

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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ListModals from '../../components/Cards/Modals/ListModals';
import Fontisto from 'react-native-vector-icons/Fontisto'

const CategoriesDetail = ({ props, route }) => {
  const navigation = useNavigation();
  const { details, image, name } = route.params
  console.log('details-------------------->', details)
  const [user, setUser] = useState([]);
  const [podcast, setPodcast] = useState(true)
  const [channels, setChannels] = useState(false)
  const { language, selectedlang, setSelectedlang, setSate, } = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [channelsdata, setchannelsdata] = useState([])
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchFavoritePodcast = async () => {
    setLoading(true);
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/category-post-app.php?category_id=${details}&lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`;
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
        // alert('failed to get fav fav');
      }
      setLoading(false);
    } catch (error) {
      console.log('error => ', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFavoritePodcast();
  }, [])
  const getChannels = () => {
    // setLoading(true);
    return fetch(`https://socialagri.com/agriFM/wp-json/wp/v2/canales/?lang=${selectedlang}`)
      .then((response) => response.json())
      .then((data) => {
        setchannelsdata(data);
        // setLoading(false)
      })
      .catch((err) => {
        console.log(err, 'API Failed');
        // setLoading(false);
      });
  }
  useEffect(() => {
    getChannels()
  }, [])
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

  return (
    <ScrollView style={styles.mainBox}>
      <ListModals
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        navigatetolibrary={() => (setModalVisible(false), navigation.navigate(language?.Library))}
        onPressaddTo={() => Toast.show(language.registerationError, Toast.LONG)}
        onClose={() => setModalVisible(false)}
        onPressDownload={() => Toast.show(language.registerationError, Toast.LONG)}
        onPressShare={() => onShare()}
      />
      <View style={styles.imageBox}>
        {/* <Image
          source={require('../../assets/Images/water.png')}
          style={{ width: '100%', height: '100%' }}
        /> */}
        <ImageBackground
          source={{ uri: image }}
          style={{ width: '100%', height: '100%', position: "relative" }}
        >
          <TouchableOpacity style={{ paddingLeft: 15, paddingTop: 20 }} onPress={() => navigation.goBack()}>
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

            {

              podCastData?.length == 0 ?
                <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginTop: '20%', textAlign: 'center' }}>No Podcasts in this Category !</Text>
                :
                podCastData?.map((item) => {
                  return (
                    <FeaturedCard
                      purpleIcon
                      onPressIcon={() => {
                        setModalVisible(true);
                        setmuusicUrl(item?.LINK)
                      }}
                      onPressDownload={() => Toast.show(language.registerationError, Toast.LONG)}
                      onPress={() => trackResetAndNavgate(item)}
                      // channelName={item?.channel_name[0]}
                      // podcastname={item?.title}
                      textstyle={{ color: Colors.primary }}
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
    marginHorizontal: 20
  },
  playButton: {
    padding: 5,
    borderRadius: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.primary,
    alignContent: 'center',
    alignItems: 'center',

  },
  playButtonActive: {
    padding: 5,
    borderRadius: 50,
    width: "100%",
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
    marginTop: 10
  }

})

export default CategoriesDetail