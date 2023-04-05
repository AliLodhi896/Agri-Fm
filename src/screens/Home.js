import React, {useState,useEffect,useContext,useCallback} from 'react';
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
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import ListModals from '../components/Cards/Modals/ListModals';
import InterestCard from '../components/Cards/InterestCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../context/Context';
import LangModal from '../components/Cards/Modals/LangModal';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
import MiniPlayerCard from '../components/Cards/MiniPlayerCard';
import TrackPlayer,{
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

const Home = () => {
  const {downloadedPodcast,downloadedPodcastID,language,selectedlang,sate,setSate,UserData,setpodcast_id,podcast_id,setfavoritePodcat_id,setdownloadedPodcastID,setdownloadedPodcast} = useContext(AuthContext);
  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const [interest,setInterest] = useState([])
  const [loading, setLoading] = useState(false)
  const [channelsdata, setchannelsdata] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [favoritePodcast, setfavoritePodcast] = useState()
  const [musicdatafordownload, setmusicdatafordownload] = useState()
  const [loaderwhileLoader, setloaderwhileLoader] = useState(false)
  
  const categories = [
    {
      id: 2,
      name: language?.Poultry,
      image: require('../assets/Images/poultry.png'),
    },
    {
      id: 6,
      name: language?.Ruminant,
      image: require('../assets/Images/ruminant.png'),
    },
    {
      id: 8,
      name: language?.Swine,
      image: require('../assets/Images/swine.png'),
    },
    {
      id: 4,
      name: language?.Nutrition,
      image: require('../assets/Images/nutrition.png'),
    },
    {
      id: 8,
      name: language?.Aqua,
      image: require('../assets/Images/aqua.png'),
    },
    {
      id: 8,
      name: selectedlang == 'en' ?  'Others' :  'Otras' ,
      image: require('../assets/Images/aqua.png'),
    },
  ];

  const fetchData =async () =>{
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
  const [newpodcast, setnewpodcast] = useState([])
  const fetchNewPodcast =async () =>{
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
  const getChannels = () => {
    setLoading(true)
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/canales?lang=en")
          .then((response) => response.json())
          .then((data) =>{ 
            setchannelsdata(data);
            setLoading(false)
          })
          .catch((err) => {
            console.log(err,'API Failed');
          });   
  }

  useEffect(()=>{
      fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/?lang=en')
      .then(res=>res.json())
      .then((data) =>{ 
        setInterest(data.length == 0 ? undefined || null : (data));
      })
  },[])

  useFocusEffect(
    useCallback(() => {
      fetchData();
      getChannels();
      fetchNewPodcast()
    }, []),
  );

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
    navigation.navigate('Music',{podcastDetails:item,Fromlibrary:false});
  }
  
  const AddPodcastToLiabrary =async () =>{
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
      if (responseData[0].favoritos_podcast ) {
        Toast.show('Podcast Added to liabrary', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return  itemxx
        })
        setfavoritePodcat_id(courseName)
        // navigation.navigate('MyLibrary')
      } else {
        alert('Failed to add to liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }
  
  const RemovePodcastFromLiabrary =async () =>{
    setModalVisible(false);
    setLoading(true)
    try {
      let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData[0]?.user}&id_podcast=${podcast_id}`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData[0].favoritos_podcast ) {
        Toast.show('Podcast removed from liabrary', Toast.LONG);
        let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
          return  itemxx
        })
        setfavoritePodcat_id(courseName)
        // navigation.navigate('MyLibrary')
      } else {
        alert('Failed to remove from liabrary !');
      }
    } catch (error) {
      console.log('error => ', error);
    }
    setLoading(false)
  }
  
  const fetchFavoritePodcast =async () =>{
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
          return  itemxx.ID
        })
        setfavoritePodcat_id(courseName)
      } else {
        // alert('failed to get fav fav');
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }

  useEffect(() => {
    fetchFavoritePodcast();
  },[podcast_id])

const download = (item) => {
  console.log('item------------------>',item?.acf?.link_podcast1)
  setModalVisible(true);
  setmuusicUrl(item?.acf?.link_podcast1)
  setpodcast_id(JSON.stringify(item?.id))
  setmusicdatafordownload(item)
  downloadPodcast(item)
}


const getDownloadMusic = async () => {
  const value = await AsyncStorage.getItem('musics')
  const parseMusics = JSON.parse(value)
  let courseName = parseMusics?.map(itemxx => {
    return  itemxx.ID
  })
  setdownloadedPodcastID(courseName)
  setdownloadedPodcast(parseMusics)
}
const downloadPodcast = async (item) => {
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
  const path = RNFetchBlob.fs.dirs.DownloadDir+`/${name}.mp3`;
  
  const newObject = {
    ID: item?.id,
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
    getDownloadMusic();
    Toast.show('Successfully Downloaded at ' + res.path(), Toast.LONG);
    setloaderwhileLoader(false)
    navigation.navigate('MyLibrary')
    });
  }else{
    alert('Permission Not Granted !')
  }
}
useFocusEffect(
  useCallback(() => {
    getDownloadMusic();
  }, []),
);
const RemoveDownload = async() => {
  let newItems = downloadedPodcast.filter(e => e?.ID !== podcast_id);

  setdownloadedPodcast(newItems)
  const dataString = JSON.stringify(downloadedPodcast);
  await AsyncStorage.setItem('musics', dataString);
  let newItemsID = downloadedPodcastID.filter(e => e !== podcast_id);
  setdownloadedPodcastID(newItemsID)
  // downloadedPodcastID
  // setdownloadedPodcastID()
}

  return (
    <View style={{backgroundColor:Colors.primary,flex:1}}>
    
    <View style={{height: sate !== 0 ?'85%': '100%',backgroundColor:'white'}}>
      <ScrollView style={styles.mainBox}>
         <View style={{backgroundColor:Colors.primary,paddingHorizontal:20}}>
         <ListModals
       isVisible={modalVisible}
       onPressClose={() => setModalVisible(false)}
       onPressaddTo={()=> AddPodcastToLiabrary()}
       onClose={() => setModalVisible(false)}
       onPressDownload={()=>download()}
       onPressShare={()=>onShare()}
       onPressRemoveDownload={()=>RemoveDownload()}
       onPressRemove={()=>RemovePodcastFromLiabrary()}
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
           source={require('../assets/Images/logo.png')}
           style={{width: '60%', height: '65%'}}
         />
       </View>
       <TouchableOpacity
         style={styles.iconBox}
         onPress={() => setModalVisible2(true)}>
           {selectedlang == 'es' ?
             <Image
             source={require('../assets/Images/spain-flag.png')}
             style={{width: '100%', height: '100%', borderRadius: 100}}
           /> 
           : selectedlang == 'pt' ?
           <Image
             source={require('../assets/Images/brazil-flag.jpg')}
             style={{width: '100%', height: '100%', borderRadius: 100}}
           />
           :
           <Image
             source={require('../assets/Images/uk-flag.png')}
             style={{width: '100%', height: '100%', borderRadius: 100}}
           />
           }
       </TouchableOpacity>
     </View>
     <ScrollView style={styles.categoryBox} horizontal>
       {categories.map(item => {
         return (
           <TouchableOpacity
             style={styles.categories}
             onPress={() => {
               navigation.navigate('CategoriesDetail',{details: item.id})
               
               }}>
             <Image
               source={item.image}
               style={{width: '80%', height: '75%', borderRadius: 100}}
             />
             <Text style={styles.categoriesName}>{item.name}</Text>
           </TouchableOpacity>
         );
       })}
     </ScrollView>
     <View style={styles.cardBox}>
       <View style={styles.headingBox}>
         <Text style={styles.mainHeading}>{language?.LastChannels}</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('SeeAllChannels')}>
          <Text style={styles.subHeading}>See All</Text>
         </TouchableOpacity>
       </View>
       <ScrollView style={styles.categoryBox} horizontal  >
         {loading == true ?
           <View style={{padding:100,marginLeft:70}}>
             <ActivityIndicator size="large" color="white" /> 
           </View>
         :
         channelsdata.map(item => {
           return (
             <ChannelCard
               onPress={() => navigation.navigate('ChannelDetails',{details:item})}
               title={item.name}
               image = {item?.acf?.imagen_perfil}
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
         <TouchableOpacity onPress={()=>navigation.navigate('SeeAll')}>
          <Text style={styles.subHeading}>See All</Text>
         </TouchableOpacity>
       </View>
       {loading == true ?
       <View style={{padding:100}}>
         <ActivityIndicator size="large" color="white" /> 
       </View>
      : 
      
       podCastData.slice(0, 5).map((item) => {
        const match = newpodcast.find(item2 => item2?.id == item?.id);
         return (
           <FeaturedCard
             onPressDownload={()=>downloadPodcast(item)}
             onPressIcon={()=>download(item)}
             onPress={() => trackResetAndNavgate(item)}
             channelName={match?.channel_name}
             downloadLoading={loaderwhileLoader}
             podcastname = {item.title?.rendered}
             image = {item?.acf?.imagen_podcast1}
             id = {item?.id}
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
         <Text style={styles.subHeading}>See All</Text>
       </View>
       <ScrollView style={styles.categoryBox} horizontal  >
         {loading == true ?
           <View style={{padding:100,marginLeft:70}}>
             <ActivityIndicator size="large" color="white" /> 
           </View>
         :
         channelsdata.map(item => {
           return (
             <ChannelCard
               onPress={() => navigation.navigate('ChannelDetails',{details:item})}
               title={item.name}
               image = {item?.acf?.imagen_perfil}
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
         <View style={{backgroundColor:"white",paddingHorizontal:20}}>
         <View style={styles.headingBox}>
             <Text style={{fontSize:18,fontWeight:'700',color:Colors.primary}}>{language?.YourLiabrary}</Text>
           </View>
           {loading == true ?
           <View style={{padding:100,marginLeft:20}}>
             <ActivityIndicator size="large" color={Colors.primary} /> 
           </View>
         :
           favoritePodcast?.length == 0 ?
               <Text style={{fontSize:16,color:Colors.primary,fontWeight:'bold',marginTop:'20%',textAlign:'center'}}>No Podcasts In your Liabrary !</Text>
               :
               favoritePodcast?.map((item)=>{
                   return(
                       <FeaturedCard 
                         onPressDownload={()=>downloadPodcast(item)}
                         textstyle={{color:Colors.primary}} 
                         headingText={{color:'grey'}} 
                         timeText={{color:'grey'}} 
                         onPressIcon={()=>download(item)}
                         onPress={()=>trackResetAndNavgate(item)}
                         purpleIcon={true}
                         channelName='Channel Name'
                         podcastname = {item.TITLE}
                         image={item?.image}
                       />
                   );
               })}


           <View style={styles.headingBox}>
             <Text style={{fontSize:18,fontWeight:'700',color:Colors.primary}}>{language?.YourInterest}</Text>
           </View>
           <ScrollView horizontal style={styles.interestlList}>
             {interest.map((item) => {
               return <InterestCard onPress={()=>navigation.navigate('InterestPodcast',{interest_detail:item})} mainStyle={{width: 100,marginHorizontal:10}} textStyle={{color:Colors.primary}} description ={item.name} img_intereses = {item.acf.img_intereses} id={item.id}/>;
             })}
           </ScrollView>
         </View>
      </ScrollView>
    </View>
    <View style={{marginTop:'9%' ,backgroundColor:Colors.primary}}>
     {sate !== 0  ?
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
    marginBottom:20
  },
  categoryBox: {
    flexDirection: 'row',
  },
  categories: {
    height: 70,
    width: 70,
    alignContent: 'center',
    alignItems: 'center',
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
    marginTop:30
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
