import React,{useContext,useState,useEffect} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView,Share,PermissionsAndroid} from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/Context';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
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
import ListModals from '../Cards/Modals/ListModals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const Podcast = (props) => {
  const {UserData,setSate,setpodcast_id,podcast_id,downloadedPodcast,favoritePodcat_id,setfavoritePodcat_id} = useContext(AuthContext);
  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [muusicUrl, setmuusicUrl] = useState(null)
  const [musicdatafordownload, setmusicdatafordownload] = useState()
console.log('downloadedPodcast',downloadedPodcast)
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
              setPodcastData(responseData)
              // let courseName = responseData?.map(itemxx => {
              //   return  itemxx.ID
              // })
              // setfavoritePodcat_id(courseName)
            } else {
              // alert('failed to get fav fav');
            }
          } catch (error) {
            console.log('error => ', error);
          }
      }
      useEffect(() => {
        const interval = setInterval(() => fetchFavoritePodcast(),1000);
        return () => {
          clearInterval(interval);
        };
            
      },[podcast_id])

      const trackResetAndNavgate = (item) => {
        TrackPlayer.reset();
        setSate(0)
        navigation.navigate('Music',{podcastDetails:item,Fromlibrary:true});
      }

      const download = (item) => {
        setModalVisible(true);
        setmuusicUrl(item?.acf?.link_podcast1)
        setpodcast_id(item?.ID)
        setmusicdatafordownload(item)
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
            this.startDownload();
          }
        } catch (err) {
          console.log(err);
        }
      };
      
      const downloadPodcast = async (item) => {
        await requestpermissionforDownlaod();
        let url = item?.acf?.link_podcast1;
        let name = item?.title?.rendered;
        const path = RNFetchBlob.fs.dirs.DownloadDir+`/${name}.mp3`;
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
      
      const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            muusicUrl + 'This Podcast has been share form AgriFM app',
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
          console.log('responseData[0].favoritos_podcast',responseData);
          if (responseData) {
            Toast.show('Podcast removed from liabrary', Toast.LONG);
            let courseName = responseData[0].favoritos_podcast?.map(itemxx => {
              return  itemxx
            })
            setfavoritePodcat_id(courseName)
            
          } else {
            alert('Failed to remove from liabrary !');
          }
        } catch (error) {
          console.log('error => ', error);
        }
        setLoading(false)
      }   

  return (
    <View>
      <ListModals
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={()=> AddPodcastToLiabrary()}
        onClose={() => setModalVisible(false)}
        onPressDownload={()=>downloadPodcast()}
        onPressShare={()=>onShare()}
        onPressRemoveDownload={()=>RemoveDownload()}
        onPressRemove={()=>RemovePodcastFromLiabrary()}
      />
          <View style={styles.cardBox}>
            <Text style={{fontSize:20,color:Colors.primary,fontWeight:'bold'}}>Your Downloads</Text>
          {downloadedPodcast == null ?
                <Text style={{fontSize:16,color:Colors.primary,fontWeight:'bold',marginVertical:'20%',textAlign:'center'}}>No Podcasts In your Downloads !</Text>
                :
          downloadedPodcast?.map((item)=>{
                    return(
                        <FeaturedCard 
                          // onPressDownload={()=>downloadPodcast(item)}
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
          </View> 
          <View style={styles.featuredBox}>
          <Text style={{fontSize:20,color:Colors.primary,fontWeight:'bold',marginTop:20}}>Your Liabrary</Text>

                {podCastData.length == 0 ?
                <Text style={{fontSize:16,color:Colors.primary,fontWeight:'bold',marginTop:'20%',textAlign:'center'}}>No Podcasts In your Liabrary !</Text>
                :
                podCastData.map((item)=>{
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
          </View> 
        </View>
  )
}
const styles = StyleSheet.create({
    cardBox:{
        marginTop:20,
        marginBottom:20,
        marginHorizontal:10
      },
      featuredBox:{
        marginBottom:20,
        marginHorizontal:10,
        marginTop:-30
      }
    
});
export default Podcast