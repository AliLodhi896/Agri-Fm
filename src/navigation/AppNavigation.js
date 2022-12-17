import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
///***********Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/Home';
import Explore from '../screens/Explore';
import MyLibrary from '../screens/MyLibrary';

//Import Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import colors from '../constants/colors';
import colors from '../constant/Colors';
import Colors from '../constant/Colors';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

  
  export const App = ({navigation}) => {
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
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        
      </MainStack.Navigator>
    );
  };


  export const AppNavigation = navigation => {
    const defaultTabNavOptions = {
      tabBarStyle: {
        backgroundColor: Colors.primary,
        height: 80,
      },
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#fff",
      tabBarActiveBackgroundColor: "#93bf1e",
      tabBarInactiveBackgroundColor: "#594079",
    };
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{...defaultTabNavOptions}}>
          <Tab.Screen
          name="Home"
          component={App}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
            tabBarIcon: ({focused, color, size}) => (
              <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
                <FontAwesome5
                  name="clinic-medical"
                  color='white'
                  size={30}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
            
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
          name="My Library"
          component={MyLibrary}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
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

  });