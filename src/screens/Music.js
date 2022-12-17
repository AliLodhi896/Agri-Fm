import React,{useState} from 'react'
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
import ListModals from '../components/Cards/Modals/ListModals';

const Music = () => {
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
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ScrollView style={styles.mainBox}>
             <ListModals
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPress={() => setModalVisible(false)}
            />
            <Header icon={true} rightIcon={true} />
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 170, width: 170, borderRadius: 10 }} source={require('../assets/Images/interest.jpg')} />
                <View style={{ padding: 10 }}>
                    <Text>50 min</Text>
                    <Text style={{ width: '45%', color: 'white', fontWeight: 'bold' }}>Hictor Mota: En avicultura es clave reiventense y adapters </Text>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginTop: '5%', justifyContent: 'center', width: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 22, width: 30 }} source={require('../assets/Images/whiteshare.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>Share</Text>
                        </View>
                        <View style={{ marginTop: '5%', justifyContent: 'center', marginLeft: '15%', width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 27, width: 30 }} source={require('../assets/Images/downloadwhite.png')} />
                            <Text style={{ fontSize: 12, color: 'white' }}>Download</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: Colors.button, padding: 10, marginHorizontal: '20%', flexDirection: 'row', borderRadius: 10, alignItems: 'center', marginTop: '10%',justifyContent:'center' }}>
                <AntDesign name="hearto" size={25} color={'white'} />
                <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, fontWeight: '900' }}>Add to my library</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', alignSelf: 'center', marginTop: '10%' }}>
                {/* <FontAwesome name="repeat" size={30} color={'white'} /> */}
                <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay.png')} />
                <AntDesign name="play" size={80} color={'white'} />
                <Image style={{ height: 32, width: 30 }} source={require('../assets/Images/replay1.png')} />
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Text style={{}} numberOfLines={5}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                <View style={styles.cardBox}>
                    <View style={styles.headingBox}>
                        <Text style={styles.mainHeading}>Featured Podcasts</Text>
                    </View>
                    {podcasts.map(() => {
                        return (
                            <FeaturedCard onPressIcon={()=>setModalVisible(true)} />
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


export default Music;