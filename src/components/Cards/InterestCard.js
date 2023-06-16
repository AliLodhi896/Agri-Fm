import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';

const placeholderimage = "https://sternbergclinic.com.au/wp-content/uploads/2020/03/placeholder.png";

const InterestCard = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.mainBox1, props.mainStyle]}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          opacity: props.opacity ? 1 : 0.5,
        }}
        source={{ uri: props.img_intereses ? props.img_intereses : placeholderimage }}
      />
      <View
        style={{
          position: 'absolute',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[styles.textStyle, props.textStyle]}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  mainBox1: {
    aspectRatio: 1 / 1,
    width: '45%',
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
});
export default InterestCard;
