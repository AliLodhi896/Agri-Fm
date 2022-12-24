import React, {useState,useContext} from 'react'
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
                {Interest.map(()=>{
                    return(
                        <InterestCard />
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