import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigation } from './AppNavigation';
import { Auth } from './AuthNavigator';
import { GuestNavigation } from './GuestNavigation';

import { AuthContext } from '../context/Context';

const AppNavigationContainer = () => {
const {language,setIsSignin,isSignin,selectedlang} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {selectedlang == '' && isSignin == false ? <Auth /> :  isSignin == true ? <AppNavigation /> : <GuestNavigation /> }
    </NavigationContainer>
  );
};
export default AppNavigationContainer;