import React, { useContext } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
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
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import colors from '../constants/colors';
import colors from '../constant/Colors';
import Colors from '../constant/Colors';
import UserProfile from '../screens/UserProfile';
import Music from '../screens/Music';
import CategoriesDetail from '../screens/CategoriesDetail';
import EditProfile from '../screens/EditProfile';
import ChangeProduction from '../screens/ChangeProduction';
import LanguageSelection from '../screens/Auth/LanguageSelection';
import ChannelDetails from '../screens/ChannelDetails';
import LoginEmail from '../screens/Auth/LoginEmail';
import LoginPassword from '../screens/Auth/LoginPassword';
import AccountDetails from '../screens/Auth/AccountDetails';
import UserData from '../screens/Auth/UserData';
import ProfessionalDatas from '../screens/Auth/ProfessionalDatas';
import SelectInterest from '../screens/Auth/SelectInterest';
import { AuthContext } from '../context/Context';
import VerifyPassword from '../screens/Auth/VerifyPassword';
import InterestPodcast from '../screens/InterestPodcast';
import SeeAll from '../screens/SeeAll';
import SeeAllChannels from '../screens/SeeAllChannels';



const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const UserStack = ({ navigation }) => {

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
          style={{ paddingLeft: 10 }}
          name="arrow-back"
          color="white"
          size={25}
        />
      </TouchableOpacity>
    ),
  };
  const { language } = useContext(AuthContext);

  return (
    <MainStack.Navigator screenOptions={defaultStackNavOptions}>

      {/* <MainStack.Screen
        name='tabs'
        component={AppNavigation}
        options={{ headerShown: false }}
      /> */}

      <MainStack.Screen
        name={language?.Home}
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ChannelDetails"
        component={ChannelDetails}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Music"
        component={Music}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CategoriesDetail"
        component={CategoriesDetail}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ChangeProduction"
        component={ChangeProduction}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="LoginPassword"
        component={LoginPassword}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="VerifyPassword"
        component={VerifyPassword}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="UserData"
        component={UserData}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ProfessionalDatas"
        component={ProfessionalDatas}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SelectInterest"
        component={SelectInterest}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MyLibrary"
        component={MyLibrary}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="InterestPodcast"
        component={InterestPodcast}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SeeAll"
        component={SeeAll}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SeeAllChannels"
        component={SeeAllChannels}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};


export const AppNavigation = navigation => {
  const { language, selectedlang, setSelectedlang } = useContext(AuthContext);

  const defaultTabNavOptions = {
    tabBarHideOnKeyboard: true,
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
      initialRouteName={language?.Home}
      screenOptions={{ ...defaultTabNavOptions }}>
      <Tab.Screen
        name={language?.Home}
        component={UserStack}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarVisible: true,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ marginBottom: -10 }}>
              <Image style={{ width: 25, height: 25 }} source={require('../assets/Images/home.png')} />
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

          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ marginBottom: -10 }}>
              <Image style={{ width: 25, height: 25 }} source={require('../assets/Images/explore.png')} />
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
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ marginBottom: -10 }}>
              <Image style={{ width: 30, height: 25 }} source={require('../assets/Images/heart.png')} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={language?.Account}
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarVisible: true,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ marginBottom: -10 }}>
              <Image style={{ width: 25, height: 25 }} source={require('../assets/Images/profile.png')} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};