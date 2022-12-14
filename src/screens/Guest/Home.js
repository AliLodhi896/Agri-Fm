import React, {useState,useEffect,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import ChannelCard from '../../components/Cards/ChannelCard';
import Colors from '../../constant/Colors';
import FeaturedCard from '../../components/Cards/FeaturedCard';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import ListModals from '../../components/Cards/Modals/ListModals';
import InterestCard from '../../components/Cards/InterestCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../../context/Context';
import ErrorModal from '../../components/Cards/Modals/ErrorModal';
import LangModal from '../../components/Cards/Modals/LangModal';

const Home = () => {
const {language, selectedlang, setSelectedlang} = useContext(AuthContext);

  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const[id, setId] = useState();
  const [interest,setInterest] = useState([])
  const [loading, setLoading] = useState(false)

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
  useEffect(() => {
    fetchData();
  },[])

  useEffect(()=>{
    fetch('https://socialagri.com/agriFM/wp-json/wp/v2/canales')
    .then(res=>res.json())
    .then((data) =>{ 
      setId(data.length == 0 ? undefined || null : (data));
    })
},[])
useEffect(()=>{
  fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/')
  .then(res=>res.json())
  .then((data) =>{ 
    setInterest(data.length == 0 ? undefined || null : (data));
  })
},[])
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
      image: require('../../assets/Images/aqua.png'),
    },
    {
      id: 5,
      name: language?.Aqua,
      image: require('../../assets/Images/nutrition.png'),
    },
  ];
  const channels = [
    {
      id: 1,
      name: 'Less is more',
      description: 'CEVA',
    },
    {
      id: 2,
      name: 'Less is more',
      description: 'CEVA',
    },
    {
      id: 3,
      name: 'Less is more',
      description: 'CEVA',
    },
  ];
  const featuredchannels = [
    {
      id: 1,
      name: 'Hablando de nutrici??n animal - Es uncanal ',
    },
    {
      id: 2,
      name: 'Hablando de nutrici??n animal - Es uncanal ',
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const Interest = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  return (
    <ScrollView style={styles.mainBox}>
      <ListModals
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
      />
      <LangModal
        isVisible={modalVisible2}
        onClose={() => setModalVisible2(false)}
        onPress={() => setModalVisible2(false)}
      />
      
      {/* <ErrorModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
        message='Invalid Password !'
      /> */}
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
              onPress={() => {
                navigation.navigate('CategoriesDetail',{test: item.id})
                
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
          <Text style={styles.subHeading}>See All</Text>
        </View>
        <ScrollView style={styles.categoryBox} horizontal  >
          {(id !== undefined ? id : channels).map(item => {
            return (
              <ChannelCard
                onPress={() => navigation.navigate('ChannelDetails')}
                title={item.name}
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
              onPressIcon={() => setModalVisible(true)}
              onPress={() => navigation.navigate('Music',{podcastDetails:item})}
              channelName='Channel Name'
              podcastname = {item.title?.rendered}
              image = {item?.acf?.imagen_podcast1}


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
          {featuredchannels.map(item => {
            return (
              <ChannelCard
                title={item.nombrees}
                mainStyle={{width: 220}}
                titleStyle={{color: Colors.primary, marginBottom: 10}}
                style={{backgroundColor: 'white', borderRadius: 10}}
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
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="plus" color={'white'} size={18} />
                </TouchableOpacity>
                <Text style={{color:Colors.secondary,fontSize:12,marginTop:10,textAlign:'center'}}>{language?.CreateChannel}</Text>

            </View>
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../../assets/Images/mic.png')} />
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
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
});

export default Home;
