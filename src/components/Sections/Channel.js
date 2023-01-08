import React,{useContext,useState,useEffect} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView} from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';


const Channel = (props) => {
    const [user, setUser] = useState([]);
  const fetchData = () => {
    return fetch("https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/animals-otros-app.php")
          .then((response) => response.json())
          .then((data) =>{ 
            console.log(data,'CheckPoultry'),
            
            setUser(data);
          
          })
          .catch((err) => {
            console.log(err,'API Failed');
          });
          
  }
  useEffect(() => {
    fetchData();
    
    
  },[])
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
  return (
            <View style={styles.interestlList}>
                {props?.user?.map((item)=>{
                    return(
                        <ChannelCard descriptionStyle={{marginHorizontal:0}} mainStyle={{width:180}} style={{marginHorizontal:0}} title={item.nombrees} description={item.description} titleStyle={{color:Colors.primary,marginLeft:0}} />
                    );
                })}
            </View>
  )
}
const styles = StyleSheet.create({

      interestlList:{
        marginTop:10,
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'wrap',
        marginHorizontal:10
    },
});
export default Channel