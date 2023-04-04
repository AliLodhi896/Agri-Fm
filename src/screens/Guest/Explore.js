import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Share } from 'react-native'

import Colors from '../../constant/Colors'
import SearchInput from '../../components/Inputs/SearchInput';
import InterestCard from '../../components/Cards/InterestCard';
import Header from '../../components/Header/Header';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/Context';
import FeaturedCard from '../../components/Cards/FeaturedCard';
import SkeletonLoader from '../../components/Loader/Skeleton';
import SkeletonChannelLoader from '../../components/Loader/SkeletonChannel';
import ListModals from '../../components/Cards/Modals/ListModals';
import Toast from 'react-native-simple-toast';
import TrackPlayer from 'react-native-track-player';

const Explore = ({ navigation }) => {
  const { language, selectedlang, setSelectedlang, setSate } = useContext(AuthContext);

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


  const [isSearch, setIsSearch] = useState(false);


  useEffect(() => {
    setLoading(true)
    fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/')
      .then(res => res.json())
      .then((data) => {
        console.log("🚀 ~ file: Explore.js:43 ~ .then ~ data:", data)
        setInterest(data.length == 0 ? undefined || null : (data));
        setSearchProduct(data.length == 0 ? undefined || null : (data))
        setLoading(false)
      })
  }, [])

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
    const url = `https://socialagri.com/agriFM/wp-json/wp/v2/podcast/?lang=${selectedlang}&per_page=100`;

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
    fetchData1();
    fetchChannels();
    fetchNewPodcast()
  }, [])

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


  const download = (item) => {
    setModalVisible(true);
    setmuusicUrl(item?.acf?.link_podcast1)
  }


  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          muusicUrl + 'This Podcast has been share from AgriFM app',
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
    navigation.navigate('Music', { podcastDetails: item });
  }

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
            onPressIcon={() => download(item)}
            onPressDownload={() => {
              Toast.show('Please first login to download', Toast.LONG);
            }}
            onPress={() => trackResetAndNavgate(item)}
            channelName={match?.channel_name}
            podcastname={item.title?.rendered}
            image={item?.acf?.imagen_podcast1}
            id={item?.id}
          />
        </>
      );
    })
  }


  return (
    <ScrollView style={styles.mainBox}  >
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
                {interest.slice(0, 10).map((item) => {
                  return (
                    <InterestCard onPress={() => navigation.navigate('InterestPodcast', { interest_detail: item })} description={item.name} img_intereses={item.acf.img_intereses} id={item.id} />
                  );
                })}
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