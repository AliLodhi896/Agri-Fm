import React, {useState,useContext,useEffect} from 'react';
import { StyleSheet, View, Image, Text,ScrollView, TouchableOpacity ,Share,ActivityIndicator} from "react-native"
import SocialModal from "../components/Cards/Modals/SocialModal";
import Header from "../components/Header/Header";
import Colors from "../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WhiteButton from "../components/Buttons/WhiteButton";
import FeaturedCard from "../components/Cards/FeaturedCard";
import ChannelCard from "../components/Cards/ChannelCard";
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../context/Context';
import Toast from 'react-native-simple-toast';

const ChannelDetails = ({route}) => {
  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang,UserData} = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);
  const {details} = route.params
  const [loading, setLoading] = useState(false)
  const [followedchannels, setfollowedchannels] = useState()
  const [followedID, setfollowedID] = useState([])


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
              setfollowedID(courseName)
            } else {
              alert('failed to add to fav');
            }
          } catch (error) {
            console.log('error => ', error);
          }
          setLoading(false)
        }

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
        fetchFollowedChannels();
      },[])

      const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            details?.link + 'This Channel has been share form AgriFM app',
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

      const followChannel =async () =>{
        setLoading(true)
        try {
          let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/add-favc-app.php?id_user=${UserData?.user}&id_canal=${details?.id}`;
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          });
          const responseData = await response.json();
          if (responseData[0].favoritos_canales ) {
            Toast.show('Channel Followed', Toast.LONG);
            navigation.navigate('Home')
            fetchFollowedChannels()
          } else {
            alert(responseData[0].validation);
          }
        } catch (error) {
          console.log('error => ', error);
        }
        setLoading(false)
      }

      const UnfollowChannel =async () =>{
        setLoading(true)
        try {
          let baseUrl = `https://socialagri.com/agriFM/wp-content/themes/agriFM/laptop/ajax/remove-libraryp.php?id_user=${UserData?.user}&id_podcast=${details?.id}`;
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
          });
          const responseData = await response.json();
          if (responseData[0].favoritos_canales ) {
            Toast.show('Channel Unfollowed', Toast.LONG);
            navigation.navigate('Home')
            fetchFollowedChannels()
          } else {
            alert(responseData[0].validation);
          }
        } catch (error) {
          console.log('error => ', error);
        }
        setLoading(false)
      }

      const trackResetAndNavgate = (item) => {
        TrackPlayer.reset();
        setSate(0)
        navigation.navigate('Music',{podcastDetails:item,Fromlibrary:false})
      }

    return loading ? (
      <View style={{backgroundColor: Colors.primary,flex:1,justifyContent:'center'}}>
        <ActivityIndicator size="large" color="white" /> 
      </View>
    ) : (
        <ScrollView style={styles.mainBox}>
            <Header icon={true} />
            <View style={{ flexDirection: 'row', justifyContent:'flex-end',marginTop:-20 }}>
                <ChannelCard 
                style={{height:280}} 
                titleStyle={{textAlign:'center',marginRight:15}}   
                title={details.name} 
                image = {details?.acf?.imagen_perfil}
                />
                <View style={{ flexDirection: 'column',marginTop:30}}>
                        <TouchableOpacity onPress={()=>onShare()}>
                            <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: 22, width: 31 }} source={require('../assets/Images/whiteshare.png')} />
                                <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>onShare()}>
                            <View style={{ marginTop: '20%',  width: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: 26, width: 28 }} source={require('../assets/Images/with.png')} />
                                <Text style={{ fontSize: 12, color: 'white' }}>123</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
            {followedID?.includes(JSON.stringify(details?.id)) ?
            <TouchableOpacity onPress={()=>UnfollowChannel()} style={{ marginTop:-50,backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center',justifyContent:'center' }}>
              <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900',textAlign:'center' }}>{language?.UnFollow}</Text>
            </TouchableOpacity> 
            :
            <TouchableOpacity onPress={()=>followChannel()} style={{ marginTop:-50,backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900',textAlign:'center' }}>{language?.Follow}</Text>
            </TouchableOpacity>

            }
            
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Text style={{}} numberOfLines={5}>{details?.yoast_head_json?.description}</Text>

                <View style={styles.cardBox}>
                    {loading == true ?
                        <View style={{padding:100}}>
                            <ActivityIndicator size="large" color="white" /> 
                        </View>
                    :
                    podCastData.map((item) => {
                        return (
                            <FeaturedCard 
                            onPress={()=>trackResetAndNavgate()}
                            channelName='Channel Name'
              podcastname = {item.title?.rendered}
              image = {item?.acf?.imagen_podcast1}
                            />
                        );
                    })}
                </View>

            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
    },
    cardBox: {
        marginTop: 40,
        marginBottom: 20
    },
    headingBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainHeading: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.secondary
    },
})


export default ChannelDetails;