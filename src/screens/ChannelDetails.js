import { StyleSheet, View, Image, Text,ScrollView } from "react-native"
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

const ChannelDetails = () => {
  const navigation = useNavigation();

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
    return (
        <ScrollView style={styles.mainBox}>
            <Header icon={true} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                {channels.map((item)=>{
                        return(
                            <ChannelCard   title={item.name}  description={item.description} />
                        );
                })
                }
                <View style={{ flexDirection: 'column',marginLeft:30,marginTop:30 }}>
                        <View style={{ marginTop: '5%', justifyContent: 'center', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="sharealt" size={25} color={'white'} />
                            <Text style={{ fontSize: 12, color: 'white' }}>Share</Text>
                        </View>
                        <View style={{ marginTop: '20%',  width: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="cloud-download-outline" size={25} color={'white'} />
                            <Text style={{ fontSize: 12, color: 'white' }}>Download</Text>
                        </View>
                    </View>
            </View>

            <View style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '30%', flexDirection: 'row', borderRadius: 10, alignItems: 'center',justifyContent:'center' }}>
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900',textAlign:'center' }}>Follow</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Text style={{}} numberOfLines={5}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                <View style={styles.cardBox}>

                    {podcasts.map(() => {
                        return (
                            <FeaturedCard onPress={()=>navigation.navigate('Music')}/>
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