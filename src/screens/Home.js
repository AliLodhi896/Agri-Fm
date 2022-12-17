import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';


const Home = () => {
    const categories = [
        {
            id:1,
            name:'Poultry',
            image:require('../assets/Images/poultry.png')
        },
        {
            id:2,
            name:'Rumninant',
            image:require('../assets/Images/ruminant.png')
        },
        {
            id:3,
            name:'Swine',
            image:require('../assets/Images/swine.png')
        },
        {
            id:4,
            name:'Nutrition',
            image:require('../assets/Images/aqua.png')
        },
        {
            id:5,
            name:'Aqua',
            image:require('../assets/Images/nutrition.png')
        },
    ];
  return (
    <ScrollView style={styles.mainBox}>
       <View style={styles.headerBox}>
            <View >
            </View>
            <View style={styles.logoBox}>
                <Image
                    source={require('../assets/Images/logo.png')}
                    style={{width: '100%', height: '100%'}}
                />
            </View>
            <TouchableOpacity style={styles.iconBox}>
                <Image
                    source={require('../assets/Images/uk-flag.png')}
                    style={{width: '100%', height: '100%',borderRadius:100}}
                />
            </TouchableOpacity>
       </View>
       <ScrollView style={styles.categoryBox} horizontal>
        {categories.map((item)=>{
            return(
                <TouchableOpacity style={styles.categories}>
                    <Image
                        source={item.image}
                        style={{width: '75%', height: '75%',borderRadius:100}}
                    />
                    <Text style={styles.categoriesName}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            );
        })
        }
       </ScrollView>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>Last Channels</Text>
                <Text style={styles.subHeading}>See All</Text>
            </View>
            <ScrollView style={styles.categoryBox} horizontal>
                <ChannelCard title="Less is more"  description="Ceva"/>
            </ScrollView>
        </View> 
        <View style={{height:1,backgroundColor:Colors.secondary,opacity:0.5}}></View>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>Featured Podcasts</Text>
                <Text style={styles.subHeading}>See All</Text>
            </View>
            <View style={styles.featuredCards}>
                <View style={styles.imageBox}>
                    <Image
                        source={require('../assets/Images/hen1.png')}
                        style={{width: '100%', height: '100%',borderRadius:10}}
                    />
                </View>
                <View styles={styles.detailBox}>
                    <View style={styles.channelnameBox}>
                        <Text style={styles.channelname}>Channel Name</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.description}>Testing: Dessxription of featured podcast</Text>
                    </View>
                    <View style={styles.cardiconBox}>
                        <View style={{flexDirection:'row',alignContent:'center',alignItems:'center'}}> 
                            <TouchableOpacity style={styles.playButton}>
                                <Text >Play</Text>
                            </TouchableOpacity>
                            <Text style={styles.timeText}>45:00</Text>
                        </View>
                        <View>
                        <Ionicons
                            name="ios-cloud-download-outline"
                            color="white"
                            size={25}
                        />
                        </View>
                    </View>
                </View>
            </View>
        </View> 
        <View style={{height:1,backgroundColor:Colors.secondary,opacity:0.5}}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainBox:{
        flex:1,
        backgroundColor:Colors.primary,
        paddingHorizontal:20,
    },
    headerBox:{
        padding:20,
        flexDirection:'row',
        justifyContent:'flex-end',
        justifyContent:'space-between'
    },
    logoBox:{
        width:80,
        height:80,
    },
    iconBox:{
        width:20,
        height:20,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center'
    },
    categoryBox:{
        flexDirection:'row'
    },
    categories:{
        height:70,
        width:70,
        alignContent:'center',
        alignItems:'center'
    },
    categoriesName:{
        color:Colors.secondary,
    },
    cardBox:{
        marginTop:40,
        marginBottom:20
    },
    headingBox:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    mainHeading:{
        fontSize:18,
        fontWeight:'700',
        color:Colors.secondary
    },
   

})

export default Home