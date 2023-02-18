import React, {createContext, useCallback, useEffect, useState} from 'react';
import Colors from '../constant/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {english, spain, brazil} from '../constant/language';

export const AuthContext = createContext({});

export const AuthProvider = props => {
  const [isSignin, setIsSignin] = useState(false);
  const [language, setLanguage] = useState(english);
  const [selectedlang, setSelectedlang] = useState('');
  const [UserData, setUserData] = useState([]);
  const [tracks, setTracks] = useState({})
  const [sate, setSate] = useState(0)
  const [podcast_id, setpodcast_id] = useState(null)
  const [favoritePodcat_id, setfavoritePodcat_id] = useState([])
  const [downloadedPodcast, setdownloadedPodcast] = useState()
  const [downloadedPodcastID, setdownloadedPodcastID] = useState([])
  const [phoneNumber, setPhoneNmber] = useState('')
  const [trackForMiniPlayer, settrackForMiniPlayer] = useState({})



  const getDownloadMusic = async () => {
    const value = await AsyncStorage.getItem('musics')
    const parseMusics = JSON.parse(value)
    let courseName = parseMusics?.map(itemxx => {
      return  itemxx.ID
    })
    setdownloadedPodcastID(courseName)
    setdownloadedPodcast(parseMusics)
  }
const getData = async () => {
  const value = await AsyncStorage.getItem('userDetails')
  const parseUserDetails = JSON.parse(value)
  if(parseUserDetails.length !== 0)
  {
    setUserData(parseUserDetails)
    setIsSignin(true)
  }
}
  useEffect(() => {
      getDownloadMusic();
    getData();
  }, [downloadedPodcast,isSignin])

  return (
    <AuthContext.Provider
      value={{
        isSignin,
        setIsSignin,
        setLanguage,
        language,
        selectedlang,
        setSelectedlang,
        UserData,
        setUserData,
        setTracks,
        tracks,
        sate,
        setSate,
        setpodcast_id,
        podcast_id,
        setfavoritePodcat_id,
        favoritePodcat_id,
        downloadedPodcast,
        setdownloadedPodcast,
        setdownloadedPodcastID,
        downloadedPodcastID,
        phoneNumber,
        setPhoneNmber,
        trackForMiniPlayer,
  settrackForMiniPlayer
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
