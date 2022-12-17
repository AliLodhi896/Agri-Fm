import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import Colors from '../constant/Colors'
import SearchInput from '../components/Inputs/SearchInput';
import InterestCard from '../components/Cards/InterestCard';


const Explore = () => {
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
    <ScrollView style={styles.mainBox}>
        <View style={styles.searchBar}>
            <SearchInput placeholder="Explore our podcast" />
        </View>
        <View style={styles.cardBox}>
            <View style={styles.headingBox}>
                <Text style={styles.mainHeading}>Interests</Text>
            </View>
            <View style={styles.interestlList}>
                {Interest.map(()=>{
                    return(
                        <InterestCard />
                    );
                })}
            </View>
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
    searchBar:{
        marginTop:50
    },
    cardBox:{
        marginTop:40,
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
        marginTop:20,
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    

})

export default Explore