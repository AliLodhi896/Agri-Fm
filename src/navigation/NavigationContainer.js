import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { DoctorBottomTabNavigator } from './DoctorBottomTabNavigator';
import { PatientBottomTabNavigator } from './PatientBottomTabNavigator';
import { ReceptionistBottomTabNavigator } from './ReceptionistBottomTabNavigator';
import { NurseBottomTabNavigator } from './NurseBottomTabNavigator';
import { AuthContext } from '../context/Context';

const AppNavigationContainer = () => {
const { isSignin , setIsSignin,role} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isSignin && <AuthNavigator />}
      {isSignin  && role == 'Doctor' && <DoctorBottomTabNavigator />}
      {isSignin  && role == 'Patient' && <PatientBottomTabNavigator />}
      {isSignin && role == 'Receptionist' && <ReceptionistBottomTabNavigator />}
      {isSignin && role == 4 && <NurseBottomTabNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigationContainer;