import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors';
import FeaturedCard from '../components/Cards/FeaturedCard';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import ListModals from '../components/Cards/Modals/ListModals';
import InterestCard from '../components/Cards/InterestCard';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const[id, setId] = useState();

  const fetchData = () => {
    return fetch("https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/cargo-app.php")
          .then((response) => response.json())
          .then((data) =>{ 
            console.log(data),
            console.log('yee');
            setUser(data);
          
          })
          .catch((err) => {
            console.log(err,'API Failed');
          });
          
  }

  useEffect(() => {
    fetchData();
    
    
  },[])
  const categories = [
    {
      id: 1,
      name: 'Poultry',
      image: require('../assets/Images/poultry.png'),
    },
    {
      id: 2,
      name: 'Rumninant',
      image: require('../assets/Images/ruminant.png'),
    },
    {
      id: 3,
      name: 'Swine',
      image: require('../assets/Images/swine.png'),
    },
    {
      id: 4,
      name: 'Nutrition',
      image: require('../assets/Images/aqua.png'),
    },
    {
      id: 5,
      name: 'Aqua',
      image: require('../assets/Images/nutrition.png'),
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
  const podcasts = [
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
  const featuredchannels = [
    {
      id: 1,
      name: 'Hablando de nutrición animal - Es uncanal ',
    },
    {
      id: 2,
      name: 'Hablando de nutrición animal - Es uncanal ',
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
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
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/Images/uk-flag.png')}
            style={{width: '100%', height: '100%', borderRadius: 100}}
          />
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
          <Text style={styles.mainHeading}>Last Channels</Text>
          <Text style={styles.subHeading}>See All</Text>
        </View>
        <ScrollView style={styles.categoryBox} horizontal  >
          {channels.map(item => {
            return (
              <ChannelCard
                onPress={() => navigation.navigate('ChannelDetails')}
                title={item.name}
                description={item.description}
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
      <Animatable.View style={styles.cardBox} animation="fadeInUpBig">
        <View style={styles.headingBox}>
          <Text style={styles.mainHeading}>Featured Podcasts</Text>
          <Text style={styles.subHeading}>See All</Text>
        </View>
        {podcasts.map(() => {
          return (
            <FeaturedCard
              onPressIcon={() => setModalVisible(true)}
              onPress={() => navigation.navigate('Music')}
            />
          );
        })}
      </Animatable.View>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.secondary,
          opacity: 0.5,
        }}></View>
        <Animatable.View style={styles.cardBox} animation="fadeInUpBig">
        <View style={styles.headingBox}>
          <Text style={styles.mainHeading}>Featured Channels</Text>
          <Text style={styles.subHeading}>See All</Text>
        </View>
        <ScrollView style={styles.categoryBox} horizontal>
          {user.map(item => {
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
      </Animatable.View>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.secondary,
          opacity: 0.5,
          marginTop:20
        }}></View>
        <View style={{justifyContent:'space-between',flexDirection:'row',marginHorizontal:30,marginVertical:30}}>
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../assets/Images/pp.png')} />
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="plus" color={'white'} size={18} />
                </TouchableOpacity>
                <Text style={{color:Colors.secondary,fontSize:12,marginTop:10,textAlign:'center'}}>Create Channel</Text>

            </View>
            <View style={{ alignSelf: 'center' }}>
                <Image style={styles.image} source={require('../assets/Images/mic.png')} />
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={{ borderRadius: 100, alignItems: 'flex-end', marginTop: -20 }}>
                    <AntDesign style={styles.edit} name="plus" color={'white'} size={18} />
                </TouchableOpacity>
                <Text style={{color:Colors.secondary,fontSize:12,marginTop:10,textAlign:'center'}}>Create Profile</Text>
            </View>
      </View>
      <View style={styles.headingBox}>
        <Text style={styles.mainHeading}>Trending Interest</Text>
      </View>
      <View style={styles.interestlList}>
        {Interest.map(() => {
          return <InterestCard mainStyle={{width: 170}} />;
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
