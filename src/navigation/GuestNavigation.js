import React,{useContext} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
///***********Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';


import Home from '../screens/Guest/Home';
import Explore from '../screens/Guest/Explore';
import MyLibrary from '../screens/Guest/MyLibrary';

//Import Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import colors from '../constants/colors';
import colors from '../constant/Colors';
import Profile from '../screens/Guest/Profile';
import Music from '../screens/Guest/Music';
import CategoriesDetail from '../screens/Guest/CategoriesDetail';
import EditProfile from '../screens/Guest/EditProfile';
import ChangeProduction from '../screens/Guest/ChangeProduction';
import ChannelDetails from '../screens/Guest/ChannelDetails';
import LoginEmail from '../screens/Auth/LoginEmail';
import LoginPassword from '../screens/Auth/LoginPassword';
import AccountDetails from '../screens/Auth/AccountDetails';
import UserData from '../screens/Auth/UserData';
import ProfessionalDatas from '../screens/Auth/ProfessionalDatas';
import SelectInterest from '../screens/Auth/SelectInterest';
import { AuthContext } from '../context/Context';
import VerifyPassword from '../screens/Auth/VerifyPassword';
import SeeAll from '../screens/SeeAll';
import SeeAllChannels from '../screens/SeeAllChannels';


const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

  export const GuestStack = ({navigation}) => {
    
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
        <MainStack.Screen
          name="ChannelDetails"
          component={ChannelDetails}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="Music"
          component={Music}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="CategoriesDetail"
          component={CategoriesDetail}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="ChangeProduction"
          component={ChangeProduction}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="LoginEmail"
          component={LoginEmail}
          options={{headerShown: false}}
        />
         <MainStack.Screen
          name="LoginPassword"
          component={LoginPassword}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="AccountDetails"
          component={AccountDetails}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="VerifyPassword"
          component={VerifyPassword}
          options={{headerShown: false}}
        />
<MainStack.Screen
          name="UserData"
          component={UserData}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="ProfessionalDatas"
          component={ProfessionalDatas}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SelectInterest"
          component={SelectInterest}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SeeAllChannels"
          component={SeeAllChannels}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SeeAll"
          component={SeeAll}
          options={{headerShown: false}}
        />
        
      </MainStack.Navigator>
    );
  };


  export const GuestNavigation = navigation => {
const {language, selectedlang, setSelectedlang} = useContext(AuthContext);

    const defaultTabNavOptions = {
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#fff",
      tabBarActiveBackgroundColor: "#93bf1e",
      tabBarInactiveBackgroundColor: "#594079",
      tabBarLabelStyle: {
        fontSize: 12,
        paddingBottom: 15,
        fontWeight: "bold",
      },
      tabBarStyle: { height: 75, borderTopWidth: 0 },
      tabBarItemStyle: { height: 75, borderTopWidth: 0 },
    };
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{...defaultTabNavOptions}}>
          <Tab.Screen
          name={language?.Home}
          component={GuestStack}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
            tabBarIcon: ({focused, color, size}) => (
              <View style={{marginBottom:-10}}>
                <Image  style={{width: 25, height:25}} source={require('../assets/Images/home.png')} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={language?.Explore}
          component={Explore}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
            
            tabBarIcon: ({focused, color, size}) => (
              <View style={{marginBottom:-10}}>
                <Image  style={{width: 25, height:25}} source={require('../assets/Images/explore.png')} />
              </View>
            ),
          }}
        />
      <Tab.Screen
          name={language?.Library}
          component={MyLibrary}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
            tabBarIcon: ({focused, color, size}) => (
              <View style={{marginBottom:-10}}>
                <Image  style={{width: 30, height:25}} source={require('../assets/Images/heart.png')} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={language?.MyAgriFm}
          component={Profile}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarVisible: true,
            tabBarIcon: ({focused, color, size}) => (
              <View style={{marginBottom:-10}}>
                <Image  style={{width: 25, height:25}} source={require('../assets/Images/profile.png')} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
};


const styles = StyleSheet.create({

  });