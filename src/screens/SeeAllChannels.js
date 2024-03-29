import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
// import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FeaturedCard from '../components/Cards/FeaturedCard';


// import Podcast from '../components/Sections/Podcast';
import Channel from '../components/Sections/Channel';
// import { AuthContext } from '../context/Context';
// import TrackPlayer, {
//   Capability,
//   Event,
//   RepeatMode,
//   State,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents,
//   AppKilledPlaybackBehavior
// } from 'react-native-track-player';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header/Header';

const SeeAllChannels = (props) => {

  // const navigation = useNavigation();
  // const [podcast, setPodcast] = useState(true)
  // const [channels, setChannels] = useState(false)
  // const { language, selectedlang, setSelectedlang, sate, setSate } = useContext(AuthContext);
  // const [podCastData, setPodcastData] = useState([]);
  // const [channelsdata, setchannelsdata] = useState([])


  return (
    <ScrollView style={styles.mainBox}>
      <Header title="All channels" icon={true} style={{ backgroundColor: Colors.lightBackground, paddingHorizontal: 10 }} txtColor={Colors.primary} />

      <Channel />
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

export default SeeAllChannels