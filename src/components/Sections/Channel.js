import React,{useContext,useState,useEffect} from 'react'
import {View,Text,ScrollView,StyleSheet,Image, TouchableOpacity,SafeAreaView,ActivityIndicator} from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';
import { AuthContext } from '../../context/Context';
import {useNavigation,useFocusEffect} from '@react-navigation/native';


const Channel = (props) => {
    const [user, setUser] = useState([]);
    const {language, selectedlang, setSelectedlang,UserData} = useContext(AuthContext);
    const [followedchannels, setfollowedchannels] = useState()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const fetchFollowedChannels =async () =>{
      setLoading(true)
      try {
        let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/miscanales-app.php?id_user=${UserData?.user}`;
        const response = await fetch(baseUrl, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
          },
        });
        const responseData = await response.json();
        if (responseData) {
          setfollowedchannels(responseData)
          let courseName = responseData?.map(itemxx => {
            return  itemxx.ID
          })
        } else {
          alert('failed to add to fav');
        }
      } catch (error) {
        console.log('error => ', error);
      }
      setLoading(false)
    }

    useEffect(() => {
      fetchFollowedChannels();
    },[])

  return  (
            <View style={styles.interestlList}>
                {followedchannels?.map((item)=>{
                    return(
                        <ChannelCard 
                        staticimg={true}
                        descriptionStyle={{marginHorizontal:0}} 
                        mainStyle={{width:180}} 
                        style={{marginHorizontal:0}} 
                        title={item.TITLE} 
                        onPress={() => navigation.navigate('ChannelDetails',{details:item})}
                        titleStyle={{color:Colors.primary,marginLeft:0}} />
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