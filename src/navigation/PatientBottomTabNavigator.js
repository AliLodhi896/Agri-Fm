import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, StyleSheet, View, Text} from 'react-native';
///***********Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



//Import Navigation
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
// import colors from '../constants/colors';
import colors from '../constant/Colors';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

  
  export const Patient = ({navigation}) => {
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
          name="DrawerPatientNavigation"
          component={DrawerPatientNavigation}
          options={{headerShown: false}}
        />
        
      </MainStack.Navigator>
    );
  };


  export const PatientBottomTabNavigator = navigation => {
    const defaultTabNavOptions = {
      tabBarStyle: {
        backgroundColor: Colors.secondary,
        height: 62,
        paddingBottom: 12,
      },
      tabBarActiveTintColor: Colors.secondary,
    };
    return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{...defaultTabNavOptions}}>
          <Tab.Screen
          name="Medical"
          component={Medical}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarVisible: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <FontAwesome5
                  name="clinic-medical"
                  color='white'
                  size={22}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={Patient}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarVisible: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <MaterialCommunityIcons
                  name="home-outline"
                  color='white'
                  size={30}
                />
              </View>
            ),
          }}
        />
      <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarVisible: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <FontAwesome
                  name="user"
                  color='white'
                  size={30}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
};


const styles = StyleSheet.create({
    focusedIcon: {
      marginBottom: 30,
      borderWidth: 8,
      height: 60,
      alignItems: 'center',
      aspectRatio: 1 / 1,
      borderRadius: 100,
  
      justifyContent: 'center',
      backgroundColor: Colors.secondary,
      borderColor: 'white'
    },
  });