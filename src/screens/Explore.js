import React, {useState,useContext,useEffect} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import Colors from '../constant/Colors'
import SearchInput from '../components/Inputs/SearchInput';
import InterestCard from '../components/Cards/InterestCard';
import Header from '../components/Header/Header';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/Context';

const Explore = () => {
const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
    const Interest = [
        {
            id:1,
        },
        {
            id:2,
        },
        {
            id:3,
        },
    ];
  const [interest,setInterest] = useState([])
    console.log('interest',interest)

    useEffect(()=>{
        fetch('https://socialagri.com/agriFM/wp-json/wp/v2/intereses/')
        .then(res=>res.json())
        .then((data) =>{ 
          setInterest(data.length == 0 ? undefined || null : (data));
        })
      },[])

  return (
    <ScrollView style={styles.mainBox}  >
        <Header icon={true}  />
        <View style={styles.searchBar}>
            <SearchInput placeholder={language?.ExploreOurPodcast} />
        </View>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>{language?.Interests}</Text>
            </View>
            <Animatable.View style={styles.interestlList}animation="fadeInUpBig" >
                {interest.map((item)=>{
                    return(
                        <InterestCard description ={item.name} img_intereses = {item.acf.img_intereses} id={item.id} />
                    );
                })}
            </Animatable.View>
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