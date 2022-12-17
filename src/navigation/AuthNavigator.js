import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
///***********Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Import Navigation
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../constant/Colors';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import Home from '../screens/Home';
import Verification from '../screens/Auth/Verification';
import VerifyEmail from '../screens/Auth/VerifyEmail';
import ResetPassword from '../screens/Auth/ResetPassword';


const AuthStack = createStackNavigator();


export const AuthNavigator = () => {
    return (
      <AuthStack.Navigator
        screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
          },
  
          headerTitleStyle: {
            fontSize: 16,
          },
          headerBackTitleStyle: {
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome
                name="angle-left"
                style={{paddingLeft: 15}}
                color="white"
                size={38}
              />
            </TouchableOpacity>
          ),
        })}>
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
      </AuthStack.Navigator>
    );
  };