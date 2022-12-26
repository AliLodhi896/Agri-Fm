import React,{useContext,useState,useEffect} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';
import {useNavigation} from '@react-navigation/native';


const Podcast = (props) => {
  console.log(props.user,'check1234')
  // const [user, setUser] = useState([]);
  // const fetchData = () => {
  //   return fetch("https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/animals-otros-app.php")
  //         .then((response) => response.json())
  //         .then((data) =>{ 
  //           console.log(data,'CheckPoultry'),
            
  //           setUser(data);
          
  //         })
  //         .catch((err) => {
  //           console.log(err,'API Failed');
  //         });
          
  // }
  // useEffect(() => {
  //   fetchData();
    
    
  // },[])
    const navigation = useNavigation();
    const channelsList = [
        {
            id:1,
            name:'Less is more',
            description:'CEVA'
        },
        {
            id:2,
            name:'Less is more',
            description:'CEVA'
        },
        {
            id:3,
            name:'Less is more',
            description:'CEVA'
        },
      ] ;
      const podcasts = [
        {
            id:1,
        },
        {
            id:2,
        },
        {
            id:3,
        },
        {
          id:4,
        },
        {
            id:5,
        },
      ];
  return (
    <View>
          <View style={styles.cardBox}>
                  <ScrollView style={styles.categoryBox} horizontal>
                      {props.user.map((item)=>{
                          return(
                            <ChannelCard descriptionStyle={{marginHorizontal:0}} mainStyle={{width:180}} style={{marginHorizontal:10}} title={item.nombrees} description={item.description} titleStyle={{color:Colors.primary,marginLeft:0}} />
                          );
                      })
                      }
                  </ScrollView>
          </View> 
          <View style={styles.featuredBox}>
                {podcasts.map(()=>{
                    return(
                        <FeaturedCard 
                          textstyle={{color:Colors.primary}} 
                          headingText={{color:'grey'}} 
                          timeText={{color:'grey'}} 
                          onPress={()=>navigation.navigate('Music')}
                          purpleIcon={true}
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