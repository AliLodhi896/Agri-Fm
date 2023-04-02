import React, {useState,useContext,useEffect} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView,ActivityIndicator} from 'react-native'
import Colors from '../constant/Colors'
import SearchInput from '../components/Inputs/SearchInput';
import InterestCard from '../components/Cards/InterestCard';
import Header from '../components/Header/Header';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/Context';
import {useNavigation} from '@react-navigation/native';
import FeaturedCard from '../components/Cards/FeaturedCard';
const Explore = () => {
const {language, selectedlang, setSelectedlang} = useContext(AuthContext);

  const [interest,setInterest] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchProduct, setSearchProduct] = useState([]);
  const navigation = useNavigation();
  const [podCastData, setPodcastData] = useState([]);
  const [serachText, setserachText] = useState()

  useEffect(()=>{
    setLoading(true)
    fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/')
    .then(res=>res.json())
    .then((data) =>{ 
      setInterest(data.length == 0 ? undefined || null : (data));
      setSearchProduct(data.length == 0 ? undefined || null : (data))
        setLoading(false)
    })
  },[])
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
useEffect(() => {
  fetchData()
  fetchNewPodcast()
}, [])


  const setProducts = text => {
    setserachText(text)
    setSearchProduct(interest);
    if (text) {
        setSearchProduct(
          podCastData.filter(item =>
          item?.title?.rendered.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    } else {
        setSearchProduct(interest);
    }
  };
const [activeTab, setactiveTab] = useState(true)

  return (
    <ScrollView style={styles.mainBox}  >
        <Header icon={true}  />
        <View style={styles.searchBar}>
            <SearchInput onPressCrosss={()=>{setserachText(undefined),setProducts()}} placeholder={language?.ExploreOurPodcast} value={serachText} onChangeText={setProducts} />
        </View>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
              {serachText == undefined || serachText == '' ?
                <Text style={styles.mainHeading}>{language?.Interests}</Text>
: null
              }
            </View>
{loading == true ? 
  <View style={{marginTop:'50%'}}> 
    <ActivityIndicator size="large" color="white" /> 
  </View>
  : serachText == undefined || serachText == '' ?
    <Animatable.View style={styles.interestlList}animation="fadeInUpBig" >
        {searchProduct.map((item)=>{
            return(
                <InterestCard onPress={()=>navigation.navigate('InterestPodcast',{interest_detail:item})} description ={item.name} img_intereses = {item.acf.img_intereses} id={item.id} />
            );
        })}
    </Animatable.View>
    :
    <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:20}}>
      <TouchableOpacity onPress={()=>setactiveTab(true)} style={{ borderBottomWidth:activeTab == true ?2:null,borderBottomColor:Colors.secondary }}>
        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.secondary}}>Podcasts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setactiveTab(false)} style={{borderBottomWidth:activeTab == false ?2:null,borderBottomColor:Colors.secondary}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.secondary}}>Channels</Text>
      </TouchableOpacity>
    </View>
      }{activeTab == true ? searchProduct.slice(0, 10).map((item) => {
        const match = newpodcast.find(item2 => item2?.id == item?.id);
         return (
          <>
            <FeaturedCard
            //  onPressDownload={()=>downloadPodcast(item)}
            //  onPressIcon={()=>download(item)}
            //  onPress={() => trackResetAndNavgate(item)}
             channelName={match?.channel_name}
             podcastname = {item.title?.rendered}
             image = {item?.acf?.imagen_podcast1}
             id = {item?.id}
            />
          </>
         );
       }): null
    }
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        backgroundColor:Colors.primary,
        paddingHorizontal:10,
    },
    cardBox:{
        marginTop:20,
        marginBottom:20,
        marginHorizontal:25
    },
    headingBox:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    mainHeading:{
        fontSize:18,
        fontWeight:'600',
        color:Colors.secondary
    },
    interestlList:{
        marginTop:10,
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    

})

export default Explore