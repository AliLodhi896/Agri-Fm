import React, { useContext, useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedCard from '../Cards/FeaturedCard';
import ChannelCard from '../Cards/ChannelCard';
import { AuthContext } from '../../context/Context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';
import database from '../../../firebaseConfig';


const Channel = (props) => {
  const [user, setUser] = useState([]);
  const { language, selectedlang, setSelectedlang, UserData } = useContext(AuthContext);
  const [followedchannels, setfollowedchannels] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  const fetchFollowedChannels = async () => {
    if (!props.library) {
      try {
        // let baseUrl = `https://socialagri.com/agriFM/wp-json/wp/v2/canales?lang=${selectedlang}`;
        let baseUrl = `https://socialagri.com/agriFM/wp-json/wp/v2/canales/?lang=${selectedlang}&per_page=100`;
        const response = await fetch(baseUrl, {
          method: 'Get',
          headers: {
            Accept: 'application/json',
          },
        });
        const responseData = await response.json();
        if (responseData) {
          setfollowedchannels(responseData)
        } else {
          // alert('failed to get fav fav');
        }
      } catch (error) {
        console.log('error => ', error);
      }

      return;
    };


    const dbRef = ref(database, `Library/Channels/${UserData[0]?.user}`);
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      setfollowedchannels(data || data?.length ? Object.values(data) : [])
    })
  }


  useEffect(() => {
    fetchFollowedChannels();
  }, [])

  return (
    <View style={styles.interestlList}>
      {
        followedchannels?.map((item) => {
          return (
            <ChannelCard
              image={item?.acf?.imagen_perfil}
              descriptionStyle={{ marginHorizontal: 0 }}
              mainStyle={{ width: 180, height: 190 }}
              style={{ marginHorizontal: 0 }}
              title={item.name}
              onPress={() => navigation.navigate('ChannelDetails', { details: item })}
              titleStyle={{ color: Colors.primary, marginLeft: 0 }} />
          );
        })}
    </View>
  )
}
const styles = StyleSheet.create({

  interestlList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10, marginTop: 20,
    alignContent: 'center',
    alignItems: 'center'
  },
});
export default Channel