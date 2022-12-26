import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
///***********Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';


import Home from '../screens/Home';
import Explore from '../screens/Explore';
import MyLibrary from '../screens/MyLibrary';

//Import Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import colors from '../constants/colors';
import colors from '../constant/Colors';
import LanguageSelection from '../screens/Auth/LanguageSelection';



const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

  
  export const Auth = ({navigation}) => {
    const defaultStackNavOptions = {
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
  
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTintColor: 'white',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{paddingLeft: 10}}
            name="arrow-back"
            color="white"
            size={25}
          />
        </TouchableOpacity>
      ),
    };
  
    return (
      <MainStack.Navigator screenOptions={defaultStackNavOptions}>
        <MainStack.Screen
          name="LanguageSelection"
          component={LanguageSelection}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    );
  };


const styles = StyleSheet.create({

  });