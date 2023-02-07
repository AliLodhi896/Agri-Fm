import React, {createContext, useCallback, useEffect, useState} from 'react';
import Colors from '../constant/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = props => {
  const [isSignin, setIsSignin] = useState(false);
  const [language, setLanguage] = useState(null);
  const [selectedlang, setSelectedlang] = useState('');
  const [UserData, setUserData] = useState({});
  const [tracks, setTracks] = useState({})
  const [sate, setSate] = useState(0)
  const [podcast_id, setpodcast_id] = useState(null)
  const [favoritePodcat_id, setfavoritePodcat_id] = useState([])
  const [downloadedPodcast, setdownloadedPodcast] = useState()
  const [downloadedPodcastID, setdownloadedPodcastID] = useState([])

  const getDownloadMusic = async () => {
    const value = await AsyncStorage.getItem('musics')
    const parseMusics = JSON.parse(value)
    let courseName = parseMusics?.map(itemxx => {
      return  itemxx.ID
    })
    setdownloadedPodcastID(courseName)
    setdownloadedPodcast(parseMusics)
  }

//   const getData = async () => {
//     const value = await AsyncStorage.getItem('userDetails')
//     // const parseUserDetails = JSON.parse(value)
//     if(value !== {})
//     {
//       setUserData(value)
//       setIsSignin(true)
//     }else{
//       setIsSignin(false)

//     }
// }
  useEffect(() => {
      getDownloadMusic();
    // getData();
  }, [downloadedPodcast])



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
        downloadedPodcastID
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
