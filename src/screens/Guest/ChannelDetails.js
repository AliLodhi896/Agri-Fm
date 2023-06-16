import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Share, ActivityIndicator } from "react-native"
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WhiteButton from "../../components/Buttons/WhiteButton";
import FeaturedCard from "../../components/Cards/FeaturedCard";
import ChannelCard from "../../components/Cards/ChannelCard";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Context';
import Toast from 'react-native-simple-toast';
import ListModals from '../../components/Cards/Modals/ListModals';

const ChannelDetails = ({ route }) => {
  const navigation = useNavigation();
  const { language, selectedlang, setSelectedlang } = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const { details } = route.params
  const [loading, setLoading] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [views, setviews] = useState(0);

  // alert(route.params.details.id)

  const fetchData = () => {
    setLoading(true)
    // return fetch(`https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/channel-post-app.php?canales_id=${route.params.details.id}`)
    // return fetch(`https://socialagri.com/agriFM/${selectedlang == "pt" ? "pt-br" : selectedlang}/wp-json/wp/v2/podcast?per_page=100&canales=${route.params.details.id}`)
    return fetch(`https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/channel-post-app.php?canales_id=${route.params.details.id}&lang=${selectedlang == "pt" ? "pt-br" : selectedlang}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: ChannelDetails.js:32 ~ .then ~ data:", data)
        setPodcastData(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, 'API Failed');
        setLoading(false)
      });
  }

  const fetchViews = async () => {
    const url = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/views-app.php?id_podcast=${route.params.details.id}`;

    fetch(url)
      .then((response) => response.json())
      .then((str) => {

        if (str) {
          let regex = /VIEWS:\s*(\d+)/;
          let match = str.match(regex);

          if (match) {
            let number = parseInt(match[1]);
            setviews(number);
          }
        } else {
          setviews(0);
        }

      })
      .catch((ex) => {
        console.log("🚀 ~ file: ChannelDetails.js:122 ~ fetchViews ~ ex:", ex)
      })
  };

  useEffect(() => {
    fetchData();
    fetchViews();
  }, [])

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          details?.link + ' This Channel has been share form AgriFM app',
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

  const followChannel = () => {
    Toast.show('Please first login to follow', Toast.LONG);
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
              <Image style={{ height: 22, width: 31 }} source={require('../../assets/Images/whiteshare.png')} />
              <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: '20%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 26, width: 28 }} source={require('../../assets/Images/with.png')} />
            <Text style={{ fontSize: 12, color: 'white' }}>{views}</Text>
          </View>

        </View>
      </View>

      <TouchableOpacity onPress={() => followChannel()} style={{ marginTop: -50, backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900', textAlign: 'center' }}>{language?.Follow}</Text>
      </TouchableOpacity>
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
                    onPress={() => navigation.navigate('Music', {
                      podcastDetails: {
                        acf: { link_podcast1: item?.link_podcast1, imagen_podcast1: item?.imagen_podcast1 },
                        id: item.id,
                        title: { rendered: item?.title },
                      }
                    })}
                    onPressDownload={() => {
                      Toast.show('Please first login to download', Toast.LONG);
                    }}
                    onPressIcon={() => download(item)}
                    podcastname={item?.title}
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