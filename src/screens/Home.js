import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import ChannelCard from '../components/Cards/ChannelCard';
import Colors from '../constant/Colors'
import FeaturedCard from '../components/Cards/FeaturedCard';


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
    const channels = [
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
    ];
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
    ];
    const featuredchannels = [
        {
            id:1,
            name:'Hablando de nutrición animal - Es uncanal ',
        },
        {
            id:2,
            name:'Hablando de nutrición animal - Es uncanal ',
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
                {channels.map((item)=>{
                    return(
                        <ChannelCard title={item.name}  description={item.description} />
                    );
                })
                }
            </ScrollView>
        </View> 
        <View style={{height:1,backgroundColor:Colors.secondary,opacity:0.5}}></View>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>Featured Podcasts</Text>
                <Text style={styles.subHeading}>See All</Text>
            </View>
            {podcasts.map(()=>{
                return(
                    <FeaturedCard />
                );
            })}
        </View> 
        <View style={{height:1,backgroundColor:Colors.secondary,opacity:0.5}}></View>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>Featured Channels</Text>
                <Text style={styles.subHeading}>See All</Text>
            </View>
            <ScrollView style={styles.categoryBox} horizontal>
                {featuredchannels.map((item)=>{
                    return(
                        <ChannelCard title={item.name} mainStyle={{width:220,}} titleStyle={{color:Colors.primary,marginBottom:10}}  style={{backgroundColor:'white',borderRadius:10}} />
                    );
                })
                }
            </ScrollView>
        </View> 
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
        flexDirection:'row',
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