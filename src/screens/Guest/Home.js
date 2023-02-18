import React, {useState,useEffect,useContext,useCallback,PermissionsAndroid} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
    Linking,
    Share
} from 'react-native';
import ChannelCard from '../../components/Cards/ChannelCard';
import Colors from '../../constant/Colors';
import FeaturedCard from '../../components/Cards/FeaturedCard';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import ListModals from '../../components/Cards/Modals/ListModals';
import InterestCard from '../../components/Cards/InterestCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../../context/Context';
import LangModal from '../../components/Cards/Modals/LangModal';
import Toast from 'react-native-simple-toast';
import MiniPlayerCard from '../../components/Cards/MiniPlayerCard';
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

const Home = () => {
const {language, selectedlang,isSignin,sate,setSate,tracks} = useContext(AuthContext);

  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const [interest,setInterest] = useState([])
  const [loading, setLoading] = useState(false)
  const [channelsdata, setchannelsdata] = useState([])
  console.log('tracks===============>',tracks)
  const fetchData = () => {
    setLoading(true)
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/podcast")
          .then((response) => response.json())
          .then((data) =>{ 
            setPodcastData(data);
            setLoading(false)
          })
          .catch((err) => {
            console.log(err,'API Failed');
          });      
  }

  const getChannels = () => {
    setLoading(true)
    return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/canales")
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
    fetchData();
    fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/')
    .then(res=>res.json())
    .then((data) =>{ 
      setInterest(data.length == 0 ? undefined || null : (data));
    })
},[])

useFocusEffect(
  useCallback(() => {
    getChannels();
    requestToPermissions();
  }, []),
);


  const categories = [
    {
      id: 1,
      name: language?.Poultry,
      image: require('../../assets/Images/poultry.png'),
    },
    {
      id: 2,
      name: language?.Ruminant,
      image: require('../../assets/Images/ruminant.png'),
    },
    {
      id: 3,
      name: language?.Swine,
      image: require('../../assets/Images/swine.png'),
    },
    {
      id: 4,
      name: language?.Nutrition,
      image: require('../../assets/Images/nutrition.png'),
    },
    {
      id: 5,
      name: language?.Aqua,
      image: require('../../assets/Images/aqua.png'),
    },
    {
      id: 6,
      name: selectedlang == 'en' ?  'Others' :  'Otras' ,
      image: require('../../assets/Images/aqua.png'),
    },
  ];


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [muusicUrl, setmuusicUrl] = useState(null)

  const addtoliabrary = () =>{
    setModalVisible(false);
    Toast.show('Please first login to add to library', Toast.LONG);
  
}

const download = (item) => {
  setModalVisible(true);
  setmuusicUrl(item?.acf?.link_podcast1)
}
const downloadPodcast = (item) => {
  Toast.show('Please first login to download', Toast.LONG);
}

const requestToPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }

};


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
const trackResetAndNavgate = (item) => {
  TrackPlayer.reset();
  setSate(0)
  navigation.navigate('Music',{podcastDetails:item});
}
  return (
    <View style={{height:'100%',backgroundColor:Colors.primary}}>
      <ScrollView style={styles.mainBox}>
      <ListModals
        isVisible={modalVisible}
        onPressClose={() => setModalVisible(false)}
        onPressaddTo={()=> addtoliabrary()}
        onClose={() => setModalVisible(false)}
        onPressDownload={()=>downloadPodcast()}
        onPressShare={()=>onShare()}
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
            source={require('../../assets/Images/logo.png')}
            style={{width: '60%', height: '65%'}}
          />
        </View>
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => setModalVisible2(true)}>
            {selectedlang == 'es' ?
              <Image
              source={require('../../assets/Images/spain-flag.png')}
              style={{width: '100%', height: '100%', borderRadius: 100}}
            /> 
            : selectedlang == 'pt' ?
            <Image
              source={require('../../assets/Images/brazil-flag.jpg')}
              style={{width: '100%', height: '100%', borderRadius: 100}}
            />
            :
            <Image
              source={require('../../assets/Images/uk-flag.png')}
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
              onPress={() => {navigation.navigate('CategoriesDetail',{test: item.id})}}>
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
          <Text style={styles.mainHeading}>{language?.FeaturedPodcasts}</Text>
          <Text style={styles.subHeading}>See All</Text>
        </View>
        {loading == true ?
        <View style={{padding:100}}>
          <ActivityIndicator size="large" color="white" /> 
        </View>
       : 
        podCastData.slice(0, 5).map((item) => {
          return (
            <FeaturedCard
              onPressIcon={()=>download(item)}
              onPressDownload={()=>downloadPodcast()}
              onPress={() => trackResetAndNavgate(item)}
              channelName='Channel Name'
              podcastname = {item.title?.rendered}
              image = {item?.acf?.imagen_podcast1}
              time = {Object.values(item?.yoast_head_json?.twitter_misc)[0]}

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
          <Text style={styles.mainHeading}>{language?.FeaturedChannels}</Text>
          <Text style={styles.subHeading}>See All</Text>
        </View>
        <ScrollView style={styles.categoryBox} horizontal>
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
          marginTop:20
        }}></View>
        <View style={{justifyContent:'space-between',flexDirection:'row',marginHorizontal:30,marginVertical:30}}>
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../../assets/Images/pp.png')} />
                <TouchableOpacity onPress={() => {
              Linking.openURL('https://socialagri.com/agriFM/login/?pa=2');
            }} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="plus" color={'white'} size={18} />
                </TouchableOpacity>
                <Text style={{color:Colors.secondary,fontSize:12,marginTop:10,textAlign:'center'}}>{language?.CreateChannel}</Text>

            </View>
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../../assets/Images/mic.png')} />
                <TouchableOpacity onPress={()=>navigation.navigate('LoginEmail')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="plus" color={'white'} size={18} />
                </TouchableOpacity>
                <Text style={{color:Colors.secondary,fontSize:12,marginTop:10,textAlign:'center'}}>{language?.CreateProfile}</Text>
            </View>
      </View>
      <View style={styles.headingBox}>
        <Text style={styles.mainHeading}>{language?.TrendingInterest}</Text>
      </View>
      <View style={styles.interestlList}>
        {interest.slice(0, 4).map((item) => {
          return <InterestCard mainStyle={{width: 170}} description ={item.name} img_intereses = {item.acf.img_intereses} id={item.id}/>;
        })}
      </View>
    </ScrollView>
    <View style={{marginVertical:20,marginHorizontal:10}}>
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
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
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
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
  },
  interestlList: {
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  edit: { backgroundColor: Colors.button, borderRadius: 100, padding: 5 },
  imageBox:{
    height:60,
    width:'20%',
    backgroundColor:'white',
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity:  0.19,
    shadowRadius: 5.62,
    elevation: 6,
    borderRadius:10
   },
});

export default Home;
