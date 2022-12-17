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
import Colors from '../constant/Colors';
import Profile from '../screens/Profile';

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
        marginBottom:-30
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
                <AntDesign
                  name="home"
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
                <FontAwesome
            color={Colors.secondary}
            name="search"
            size={22}
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
                <MaterialIcons
                  name="favorite-outline"
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
            tabBarShowLabel: true,
            tabBarVisible: true,
            tabBarIcon: ({focused, color, size}) => (
              <View >
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