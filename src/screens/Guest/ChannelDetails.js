import React, {useState,useContext,useEffect} from 'react';
import { StyleSheet, View, Image, Text,ScrollView } from "react-native"
import SocialModal from "../../components/Cards/Modals/SocialModal";
import Header from "../../components/Header/Header";
import Colors from "../../constant/Colors";

// ====================== icons ==================== 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import WhiteButton from "../../components/Buttons/WhiteButton";
import FeaturedCard from "../../components/Cards/FeaturedCard";
import ChannelCard from "../../components/Cards/ChannelCard";
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../context/Context';

const ChannelDetails = () => {
  const navigation = useNavigation();
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  const [podCastData, setPodcastData] = useState([]);

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
    const channels = [
        {
            id:1,
            name:'Less is more',
            description:'CEVA'
        },
    ];
    const fetchData = () => {
        return fetch("https://socialagri.com/agriFM/wp-json/wp/v2/podcast")
              .then((response) => response.json())
              .then((data) =>{ 
                
                setPodcastData(data);
              })
              .catch((err) => {
                console.log(err,'API Failed');
              });
      }
    useEffect(() => {
        fetchData();
      },[])
    return (
        <ScrollView style={styles.mainBox}>
            <Header icon={true} />
            <View style={{ flexDirection: 'row', justifyContent:'flex-end',marginTop:-20 }}>
                {channels.map((item)=>{
                        return(
                            <ChannelCard style={{height:280}} titleStyle={{textAlign:'center',marginRight:15}}   title={item.name}  />
                        );
                })
                }
                <View style={{ flexDirection: 'column',marginTop:30}}>
                        <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 22, width: 31 }} source={require('../../assets/Images/whiteshare.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>{language?.Share}</Text>
                        </View>
                        <View style={{ marginTop: '20%',  width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 26, width: 28 }} source={require('../../assets/Images/with.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>123</Text>
                        </View>
                </View>
            </View>

            <View style={{ marginTop:-60,backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900',textAlign:'center' }}>{language?.Follow}</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Text style={{}} numberOfLines={5}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                <View style={styles.cardBox}>
                    {podCastData.map((item) => {
                        return (
                            <FeaturedCard 
                            onPress={()=>navigation.navigate('Music',{podcastDetails:item})}
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