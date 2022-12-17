import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigation } from './AppNavigation';
import { AuthContext } from '../context/Context';

const AppNavigationContainer = () => {
const { isSignin , setIsSignin,role} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {/* {!isSignin && <AuthNavigator />} */}
      <AppNavigation />

    </NavigationContainer>
  );
};
export default AppNavigationContainer;